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
import { currentBlock } from "@/app/utils/getCurrentBlock";
import MyTableRow from "./components/myTableRow";
import MyTableRow2 from "./components/myTableRow2";

export interface MeetingRoomType {
    MRno: string;
    Uno: Array<string>; //长度为12的字符串数组，代表一天中的12个时间段，值为学号或empty，empty代表空闲
}

export default function App() {
    const userInfo = useUserInfo();
    const [meetingrooms, setMeetingRooms] = useState<Array<MeetingRoomType>>([]);
    const [meetingrooms2, setMeetingRooms2] = useState<Array<MeetingRoomType>>([]);

    const [page, setPage] = React.useState(1);
    const [page2, setPage2] = React.useState(1);
    const rowsPerPage = 6;
    const rowsPerPage2 = 5;

    const pages = Math.ceil(meetingrooms.length / rowsPerPage);
    const pages2 = Math.ceil(meetingrooms2.length / rowsPerPage2);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return meetingrooms.slice(start, end);
    }, [page, meetingrooms]);

    const items2 = React.useMemo(() => {
        const start = (page2 - 1) * rowsPerPage2;
        const end = start + rowsPerPage2;

        return meetingrooms2.slice(start, end);
    }, [page2, meetingrooms2]);

    const [mrno, setMrno] = useState<string>("");

    const handleSearch = () => {
        if (process.env.NEXT_PUBLIC_TEST === "test") {
            setMeetingRooms([
                {
                    MRno: "1",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
                {
                    MRno: "2",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
                {
                    MRno: "3",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
                {
                    MRno: "4",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
                {
                    MRno: "5",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
                {
                    MRno: "6",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
                {
                    MRno: "7",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
                {
                    MRno: "8",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
                {
                    MRno: "9",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
            ]);
        } else {
            try {
                API.AdminServiceApi.getMeetingRoom({
                    Keywords: {
                        MRno: mrno,
                    }
                })
                    .then((res) => {
                        console.log(res)
                        if (res.status === 200) {
                            if (res.data.MeetingRoom) {
                                let meetingrooms: Array<MeetingRoomType> = [];
                                for (let i = 0; i < res.data.MeetingRoom.length; i++) {
                                    let meetingroom: MeetingRoomType = {
                                        MRno: res.data.MeetingRoom[i].MRno,
                                        Uno: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
                                    }
                                    for (let j = 0; j < res.data.MeetingRoom[i].MRtime.length; j++) {
                                        let startTime = parseInt(res.data.MeetingRoom[i].MRtime[j].split("-")[0]);
                                        let endTime = parseInt(res.data.MeetingRoom[i].MRtime[j].split("-")[1]);
                                        for (let k = startTime - 1; k < endTime; k++) {
                                            meetingroom.Uno[k] = res.data.MeetingRoom[i].Uno[j];
                                        }
                                    }
                                    meetingrooms.push(meetingroom);
                                }
                                meetingrooms.sort((a, b) => {
                                    if(a.MRno < b.MRno) { return -1; }
                                    if(a.MRno > b.MRno) { return 1; }
                                    return 0;
                                });
                                setMeetingRooms(meetingrooms);
                            }
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

    const handleSearch2 = () => {
        if (process.env.NEXT_PUBLIC_TEST === "test") {
            setMeetingRooms2([
                {
                    MRno: "1",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
                {
                    MRno: "2",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
                {
                    MRno: "3",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
                {
                    MRno: "4",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
                {
                    MRno: "5",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
                {
                    MRno: "6",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
                {
                    MRno: "7",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
                {
                    MRno: "8",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
                {
                    MRno: "9",
                    Uno: ['21122811', '21122811', 'empty', 'empty', '21122812', '21122812', 'empty', 'empty', '21122813', '21122813', 'empty', 'empty'],
                },
            ]);
        } else {
            try {
                if (userInfo)
                    API.AdminServiceApi.getMyMeetingRoom({
                        Keywords: {
                            Uno: userInfo.userId,
                        }
                    })
                        .then((res) => {
                            console.log(res)
                            if (res.status === 200) {
                                if (res.data.MeetingRoom) {
                                    let meetingrooms: Array<MeetingRoomType> = [];
                                    for (let i = 0; i < res.data.MeetingRoom.length; i++) {
                                        let meetingroom: MeetingRoomType = {
                                            MRno: res.data.MeetingRoom[i].MRno,
                                            Uno: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
                                        }
                                        for (let j = 0; j < res.data.MeetingRoom[i].MRtime.length; j++) {
                                            let startTime = parseInt(res.data.MeetingRoom[i].MRtime[j].split("-")[0]);
                                            let endTime = parseInt(res.data.MeetingRoom[i].MRtime[j].split("-")[1]);
                                            for (let k = startTime - 1; k < endTime; k++) {
                                                meetingroom.Uno[k] = res.data.MeetingRoom[i].Uno[j];
                                            }
                                        }
                                        meetingrooms.push(meetingroom);
                                    }
                                    meetingrooms.sort((a, b) => {
                                        if(a.MRno < b.MRno) { return -1; }
                                        if(a.MRno > b.MRno) { return 1; }
                                        return 0;
                                    });
                                    setMeetingRooms2(meetingrooms);
                                }
                            }
                            else {
                                error("获取我的会议失败！");
                            }
                        })
                        .catch((err: any) => {
                            console.log("Get My MeetingRoom Error: ", err);
                            error("Get My MeetingRoom Error: " + err);
                        });
            } catch (err: any) {
                console.log("Get My MeetingRoom Error: ", err);
                error("Get My MeetingRoom Error: " + err);
            }
        }
    }

    useEffect(() => {
        handleSearch();
    }, []);

    const handleReset = () => {
        setMrno("");
    }

    const [showMy, setShowMy] = React.useState(false);

    const {
        isOpen: isMyOpen,
        onOpen: onMyOpen,
        onOpenChange: onMyOpenChange,
    } = useDisclosure();
    const handleMyDate = () => {
        setShowMy(true);
        handleSearch2();
        onMyOpen();
    };

    const handleDate = (MRno: string, MRTimeArray: string[]) => {
        if (process.env.NEXT_PUBLIC_TEST === "test") {
            success("预约成功！");
        } else {
            try {
                if (userInfo) {
                    let UnoArray: Array<string> = [];
                    for (let i = 0; i < MRTimeArray.length; i++) {
                        UnoArray.push(userInfo.userId);
                    }
                    API.AdminServiceApi.postMeetingRoom({
                        Info: {
                            MRno: MRno,
                            MRtime: MRTimeArray,
                            Uno: UnoArray,
                        }
                    })
                        .then((res) => {
                            console.log(res)
                            if (res.status === 200) {
                                if (res.data.flag === 'True') {
                                    success("预约成功！");
                                    handleSearch();
                                    handleSearch2();
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
                }
            } catch (err: any) {
                console.log("Date Error: ", err);
                error("Date Error: " + err);
            }
        }
    }

    const handleCancel = (MRno: string) => {

        if (process.env.NEXT_PUBLIC_TEST === "test") {
            success("取消成功！");
        } else {
            try {
                if (userInfo) {
                    API.AdminServiceApi.cancelMeetingRoom({
                        Key: {
                            MRno: MRno,
                            Uno: userInfo.userId,
                        }
                    })
                        .then((res) => {
                            console.log(res)
                            if (res.status === 200) {
                                if (res.data.flag === 'True') {
                                    success("取消成功！");
                                    handleSearch();
                                    handleSearch2();
                                }
                                else {
                                    error("取消失败！");
                                }
                            }
                            else {
                                error("取消失败！");
                            }
                        })
                        .catch((err: any) => {
                            console.log("Cancel Error: ", err);
                            error("Cancel Error: " + err);
                        });
                }
            } catch (err: any) {
                console.log("Cancel Error: ", err);
                error("Cancel Error: " + err);
            }
        }
    }

    return (
        <div className="w-full h-screen flex flex-col gap-10 justify-center items-center px-28 relative">
            <div className="w-full text-start text-3xl font-bold">会议室信息查询</div>
            <div className="flex flex-wrap gap-4 w-full">
                <div className="flex gap-2 items-center">
                    <div>会议室编号</div>
                    <Input className="w-[65%]" type="text" onValueChange={setMrno} value={mrno} />
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
                    wrapper: "min-h-[422px]  bg-[#f0f0f0]",
                }}
                hideHeader
            >
                <TableHeader columns={[{ a: 'rmt' }]}>
                    {(column) => <TableColumn key={column.a}>{column.a}</TableColumn>}
                </TableHeader>
                <TableBody items={items} emptyContent={"暂无数据..."} >
                    {(item) => (
                        <TableRow key={item.MRno}>
                            <TableCell className="w-full h-full">
                                <MyTableRow item={item} handleDate={handleDate} />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Button
                className="bg-foreground text-background absolute top-10 right-10"
                endContent={<div>+</div>}
                size="sm"
                onClick={handleMyDate}
            >
                我的预约
            </Button>

            {showMy && (
                <Modal isOpen={isMyOpen} onOpenChange={onMyOpenChange} size="5xl">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    我的预约
                                </ModalHeader>
                                <ModalBody>
                                    <Table
                                        aria-label="Example table with client side pagination"
                                        bottomContent={
                                            <div className="flex w-full justify-center">
                                                <Pagination
                                                    isCompact
                                                    showControls
                                                    showShadow
                                                    color="primary"
                                                    page={page2}
                                                    total={pages2}
                                                    onChange={(page) => setPage2(page)}
                                                />
                                            </div>
                                        }
                                        classNames={{
                                            wrapper: "min-h-[422px]  bg-[#f0f0f0]",
                                        }}
                                        hideHeader
                                    >
                                        <TableHeader columns={[{ a: 'rmt' }]}>
                                            {(column) => <TableColumn key={column.a}>{column.a}</TableColumn>}
                                        </TableHeader>
                                        <TableBody items={items2} emptyContent={"暂无数据..."} >
                                            {(item) => (
                                                <TableRow key={item.MRno}>
                                                    <TableCell className="w-full h-full">
                                                        <MyTableRow2 item={item} handleDate={handleDate} handleCancel={handleCancel} />
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </ModalBody>
                                <ModalFooter >
                                    <Button
                                        color="primary"
                                        variant="ghost"
                                        onPress={() => {
                                            onClose();
                                        }}
                                    >
                                        关闭
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