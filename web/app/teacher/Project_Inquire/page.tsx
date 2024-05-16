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
                    API.TeacherServiceApi.getProject(userInfo.userId)
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


    return (
        <div className="w-full h-screen flex flex-col gap-20 justify-center items-center px-28 relative">

            <div className="w-full text-start text-3xl font-bold">项目查询</div>
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

        </div>
    );
}