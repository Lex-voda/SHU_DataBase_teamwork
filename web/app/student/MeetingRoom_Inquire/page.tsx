"use client";
import React, { Key, useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue,
    Input,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import useUserInfo from "../../hooks/useUserInfo";
import API from "@/app/utils/api";
import { error, success } from "@/app/utils/message";

interface MeetingRoomType {
    MRno: string;
    MRtime: string;
}

const columns = [
    { name: "MRno", iid: "MRno" },
    { name: "MRtime", iid: "MRtime" },
];

export default function App() {
    const userInfo = useUserInfo();
    const [meetingrooms, setMeetingRooms] = useState<Array<MeetingRoomType>>([]);

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 8;

    const pages = Math.ceil(meetingrooms.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return meetingrooms.slice(start, end);
    }, [page, meetingrooms]);

    const [mrno, setMrno] = useState<string>("");
    const [mrtime, setMrtime] = useState<string>("");

    const handleSearch = () => {
        if (process.env.NEXT_PUBLIC_TEST === "test") {
            setMeetingRooms([
                {
                    MRno: "1",
                    MRtime: "2021-11-11 08:00-10:00",
                },
                {
                    MRno: "2",
                    MRtime: "2021-11-11 10:00-12:00",
                },
                {
                    MRno: "3",
                    MRtime: "2021-11-11 14:00-16:00",
                },
                {
                    MRno: "4",
                    MRtime: "2021-11-11 16:00-18:00",
                },
                {
                    MRno: "5",
                    MRtime: "2021-11-11 18:00-20:00",
                },
                {
                    MRno: "6",
                    MRtime: "2021-11-11 20:00-22:00",
                },
            ]);
        } else {
            try {
                API.StudentServiceApi.getMeetingRoom({
                    KeyWords: {
                        MRno: mrno,
                        MRtime: mrtime,
                    }
                })
                    .then((res) => {
                        console.log(res)
                        if (res.status === 200) {
                            if (res.data.MeetingRoom) setMeetingRooms(res.data.MeetingRoom);
                        }
                        else {
                            error("获取会议室信息失败！");
                        }
                    })
                    .catch((err: any) => {
                        console.log("Get MeetingRoom Error: ", err);
                        error("Get MeetingRoom Error: " + err);
                    });
            } catch (err: any) {
                console.log("Get MeetingRoom Error: ", err);
                error("Get MeetingRoom Error: " + err);
            }
        }
    }

    useEffect(() => {
        handleSearch();
    }, []);

    const handleReset = () => {
        setMrno("");
        setMrtime("");
    }

    const [showAdd, setShowAdd] = React.useState(false);
    const [newMRno, setNewMRno] = React.useState("");
    const [newMtime, setNewMtime] = React.useState("");

    const {
        isOpen: isAddOpen,
        onOpen: onAddOpen,
        onOpenChange: onAddOpenChange,
    } = useDisclosure();
    const handleDateNew = () => {
        setShowAdd(true);
        onAddOpen();
    };

    const handleDate = () => {
        if (process.env.NEXT_PUBLIC_TEST === "test") {
            success("预约成功！");
        } else {
            try {
                if (userInfo)
                    API.StudentServiceApi.postMeetingRoom({
                        Info: {
                            MRno: newMRno,
                            MRtime: newMtime,
                            Sno: userInfo.userId,
                        }
                    })
                        .then((res) => {
                            console.log(res)
                            if (res.status === 200) {
                                if (res.data.flag === '1') {
                                    success("预约成功！");
                                    handleSearch();
                                }
                                else {
                                    error("预约失败！");
                                }
                            }
                            else {
                                error("预约失败！");
                            }
                        })
                        .catch((err: any) => {
                            console.log("Date Error: ", err);
                            error("Date Error: " + err);
                        });
            } catch (err: any) {
                console.log("Dates Error: ", err);
                error("Dates Error: " + err);
            }
        }
    }

    return (
        <div className="w-full h-screen flex flex-col gap-10 justify-center items-center px-28 relative">
            <div className="w-full text-start text-3xl font-bold">会议室信息查询</div>
            <div className="flex flex-wrap gap-4 w-full">
                <div className="flex gap-2">
                    <div>会议室编号</div>
                    <Input type="text" onValueChange={setMrno} value={mrno} />
                </div>
                <div className="flex gap-2">
                    <div>会议室时间</div>
                    <Input type="text" onValueChange={setMrtime} value={mrtime} />
                </div>
                <div className="flex gap-6">
                    <button className="bg-blue-500 text-white rounded-md px-4 py-2" onClick={handleSearch}>查询</button>
                    <button className="bg-blue-100 rounded-md px-4 py-2" onClick={handleReset}>重置</button>
                </div>
            </div>
            <Table
                aria-label="Example table with client side pagination"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                classNames={{
                    wrapper: "min-h-[422px]",
                }}
                isStriped
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.iid}>{column.name}</TableColumn>}
                </TableHeader>
                <TableBody items={items} emptyContent={"暂无数据..."}>
                    {(item) => (
                        <TableRow key={item.MRno}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Button
                className="bg-foreground text-background absolute top-10 right-10"
                endContent={<div>+</div>}
                size="sm"
                onClick={handleDateNew}
            >
                会议室预约
            </Button>

            {showAdd && (
                <Modal isOpen={isAddOpen} onOpenChange={onAddOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    会议室预约
                                </ModalHeader>
                                <ModalBody>
                                    <div className="flex flex-col gap-4">
                                        <Input
                                            isRequired
                                            label="MeetingRoom No"
                                            placeholder="Enter MeetingRoom No"
                                            type="text"
                                            onValueChange={setNewMRno}
                                        />
                                        <Input
                                            isRequired
                                            label="Time"
                                            placeholder="Enter Time"
                                            type="text"
                                            onValueChange={setNewMtime}
                                        />
                                    </div>
                                </ModalBody>
                                <ModalFooter >
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        取消
                                    </Button>
                                    <Button
                                        color="primary"
                                        variant="ghost"
                                        onPress={() => {
                                            handleDate();
                                            onClose();
                                        }}
                                    >
                                        确认
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}

        </div>
    );
}