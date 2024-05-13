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
    Button,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    ModalFooter,
} from "@nextui-org/react";
import useUserInfo from "../../hooks/useUserInfo";
import API from "@/app/utils/api";
import { error, success } from "@/app/utils/message";

interface ProjectType {
    Pno: string;
    Pname: string;
    Sno: string;
    Sname: string;
    Tno: string;
    Tname: string;
    ProjMen: Array<string>;
}

const columns = [
    { name: "项目编号", iid: "Pno" },
    { name: "项目名称", iid: "Pname" },
    { name: "学号", iid: "Sno" },
    { name: "学生姓名", iid: "Sname" },
    { name: "教师工号", iid: "Tno" },
    { name: "教师姓名", iid: "Tname" },
    { name: "队员", iid: "ProjMen" },
];

export default function App() {
    const userInfo = useUserInfo();
    const [projects, setProjects] = useState<Array<ProjectType>>([]);

    const refreshProjects = () => {
        if (process.env.NEXT_PUBLIC_TEST === "test") {
            setProjects([
                {
                    Pno: "000001",
                    Pname: "a",
                    Sno: "100001",
                    Sname: "peter",
                    Tno: "200001",
                    Tname: "lily",
                    ProjMen: ["danny", "lucy", "tom"],
                },
                {
                    Pno: "000002",
                    Pname: "b",
                    Sno: "100002",
                    Sname: "john",
                    Tno: "200002",
                    Tname: "lucy",
                    ProjMen: ["danny", "lucy", "tom"],
                },
                {
                    Pno: "000003",
                    Pname: "c",
                    Sno: "100003",
                    Sname: "lucy",
                    Tno: "200003",
                    Tname: "tom",
                    ProjMen: ["danny", "lucy", "tom"],
                },
                {
                    Pno: "000004",
                    Pname: "d",
                    Sno: "100004",
                    Sname: "tom",
                    Tno: "200004",
                    Tname: "danny",
                    ProjMen: ["danny", "lucy", "tom"],
                },
                {
                    Pno: "000005",
                    Pname: "e",
                    Sno: "100005",
                    Sname: "danny",
                    Tno: "200005",
                    Tname: "peter",
                    ProjMen: ["danny", "lucy", "tom"],
                },
                {
                    Pno: "000006",
                    Pname: "f",
                    Sno: "100006",
                    Sname: "lily",
                    Tno: "200006",
                    Tname: "john",
                    ProjMen: ["danny", "lucy", "tom"],
                },
                {
                    Pno: "000007",
                    Pname: "g",
                    Sno: "100007",
                    Sname: "lucy",
                    Tno: "200007",
                    Tname: "lucy",
                    ProjMen: ["danny", "lucy", "tom"],
                },
                {
                    Pno: "000008",
                    Pname: "h",
                    Sno: "100008",
                    Sname: "tom",
                    Tno: "200008",
                    Tname: "tom",
                    ProjMen: ["danny", "lucy", "tom"],
                },
            ]);
        } else {
            try {
                if (userInfo)
                    API.StudentServiceApi.getProject(userInfo.userId)
                        .then((res) => {
                            console.log(res)
                            if (res.status === 200) {
                                if (res.data.ProjMen && res.data.Project) {
                                    let projs = [];
                                    for (let i = 0; i < res.data.Project.length; i++) {
                                        let members = [];
                                        for (let j = 0; j < res.data.ProjMen[i].length; j++) {
                                            members.push(res.data.ProjMen[i][j].Sname);
                                        }
                                        projs[i] = { ...res.data.Project[i], 'ProjMen': members };
                                    }
                                    setProjects(projs);
                                }
                            }
                            else {
                                error("获取项目情况失败！");
                            }
                        })
                        .catch((err: any) => {
                            console.log("Get Projects Error: ", err);
                            error("Get Projects Error: " + err);
                        });
            } catch (err: any) {
                console.log("Get Projects Error: ", err);
                error("Get Projects Error: " + err);
            }
        }
    }

    useEffect(() => {
        refreshProjects();
    }, []);

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 8;

    const pages = Math.ceil(projects.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return projects.slice(start, end);
    }, [page, projects]);

    const [snolist, setSnolist] = useState<Array<string>>([""]);
    useEffect(() => {
        if (userInfo) {
            setSnolist([userInfo.userId]);
        }
        // console.log(userInfo);
    }, [userInfo]);
    const [showAdd, setShowAdd] = React.useState(false);
    const [pname, setPname] = React.useState("");
    const [tno, setTno] = React.useState("");

    const {
        isOpen: isAddOpen,
        onOpen: onAddOpen,
        onOpenChange: onAddOpenChange,
    } = useDisclosure();
    const handleAddNew = () => {
        setShowAdd(true);
        onAddOpen();
    };

    const handleAdd = () => {
        if (process.env.NEXT_PUBLIC_TEST === "test") {
            success("添加项目成功！");
        } else {
            try {
                API.StudentServiceApi.postProject({
                    Info: {
                        Pname: pname,
                        PTno: tno,
                        PSno: snolist,
                    }
                })
                    .then((res) => {
                        console.log(res)
                        if (res.status === 200) {
                            if (res.data.flag === 'True') {
                                success("添加项目成功！");
                                refreshProjects();
                            }
                            else {
                                error("添加项目失败！");
                            }
                        }
                        else {
                            error("添加项目失败！");
                        }
                    })
                    .catch((err: any) => {
                        console.log("Add Project Error: ", err);
                        error("Add Project Error: " + err);
                    });
            } catch (err: any) {
                console.log("Add Projects Error: ", err);
                error("Add Projects Error: " + err);
            }
        }
    }

    const handleAddPuno = () => {
        setSnolist((snolist) => {
            return [...snolist, ""];
        });
    }


    return (
        <div className="w-full h-screen flex flex-col gap-20 justify-center items-center px-28 relative">

            <Button
                className="bg-foreground text-background absolute top-10 right-10"
                endContent={<div>+</div>}
                size="sm"
                onClick={handleAddNew}
            >
                Add New
            </Button>
            <div className="w-full text-start text-3xl font-bold">项目申报与查询</div>
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
                        <TableRow key={item.Pno}>
                            {(columnKey) => <TableCell>{
                                columnKey === 'ProjMen' ? item.ProjMen.join(', ') : getKeyValue(item, columnKey)
                            }</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {showAdd && (
                <Modal isOpen={isAddOpen} onOpenChange={onAddOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    项目申报
                                </ModalHeader>
                                <ModalBody>
                                    <div className="flex flex-col gap-4">
                                        <Input
                                            isRequired
                                            label="Project name"
                                            placeholder="Enter Project name"
                                            type="text"
                                            onValueChange={setPname}
                                        />
                                        <Input
                                            isRequired
                                            label="Teacher no"
                                            placeholder="Enter Teacher no"
                                            type="text"
                                            onValueChange={setTno}
                                        />
                                        <div className=" text-xl text-primary-500 w-full text-center">成员列表</div>
                                        {snolist.map((snolist, index) => {
                                            return (
                                                <div key={index} className="flex gap-2">
                                                    <div className="flex justify-center items-center text-sm"><div>成员</div><div>{index + 1}</div></div>
                                                    {index === 0 ?
                                                        <Input type="text" placeholder="默认申报者为组长，组长学号无需填写" isReadOnly /> :
                                                        <Input type="text" placeholder="sno" onValueChange={(value) => {
                                                            setSnolist((snolist) => {
                                                                const newPunolist = [...snolist];
                                                                newPunolist[index] = value;
                                                                return newPunolist;
                                                            });
                                                        }} />
                                                    }
                                                </div>
                                            );
                                        })}
                                    </div>
                                </ModalBody>
                                <ModalFooter className="relative">
                                    <Button color='primary' onClick={handleAddPuno} className="absolute left-10">
                                        增加成员
                                    </Button>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        取消
                                    </Button>
                                    <Button
                                        color="primary"
                                        variant="ghost"
                                        onPress={() => {
                                            handleAdd();
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