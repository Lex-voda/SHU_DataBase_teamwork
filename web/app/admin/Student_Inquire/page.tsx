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
} from "@nextui-org/react";
import useUserInfo from "../../hooks/useUserInfo";
import API from "@/app/utils/api";
import { error } from "@/app/utils/message";

interface StudentType {
    Sno: string,
    Sname: string,
    Grade: string,
    Sgender: string,
    Cname: string
}

const columns = [
    { name: "学号", iid: "Sno" },
    { name: "学生姓名", iid: "Sname" },
    { name: "年级", iid: "Grade" },
    { name: "性别", iid: "Sgender" },
    { name: "学院名称", iid: "Cname" },
];

export default function App() {
    const userInfo = useUserInfo();
    const [courses, setCourses] = useState<Array<StudentType>>([]);

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 8;

    const pages = Math.ceil(courses.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return courses.slice(start, end);
    }, [page, courses]);

    const [cno, setCno] = useState<string>("");
    const [cname, setCname] = useState<string>("");
    const [credit, setCredit] = useState<string>("");
    const [ctno, setCtno] = useState<string>("");
    const [tname, setTname] = useState<string>("");
    const [ctime, setCtime] = useState<string>("");

    const handleSearch = () => {
        if (process.env.NEXT_PUBLIC_TEST === "test") {
            setCourses([{
                Sno: "100001",
                Sname: "peter",
                Grade: "2018",
                Sgender: "男",
                Cname: "计算机学院",
            },
            {
                Sno: "100002",
                Sname: "lucy",
                Grade: "2018",
                Sgender: "女",
                Cname: "计算机学院",
            },
            {
                Sno: "100003",
                Sname: "tom",
                Grade: "2018",
                Sgender: "男",
                Cname: "计算机学院",
            },
            {
                Sno: "100004",
                Sname: "danny",
                Grade: "2018",
                Sgender: "男",
                Cname: "计算机学院",
            },
            {
                Sno: "100005",
                Sname: "lily",
                Grade: "2018",
                Sgender: "女",
                Cname: "计算机学院",
            },
            {
                Sno: "100006",
                Sname: "danny",
                Grade: "2018",
                Sgender: "男",
                Cname: "计算机学院",
            },
            {
                Sno: "100007",
                Sname: "lucy",
                Grade: "2018",
                Sgender: "女",
                Cname: "计算机学院",
            },
            {
                Sno: "100008",
                Sname: "tom",
                Grade: "2018",
                Sgender: "男",
                Cname: "计算机学院",
            },
            ]);
        } else {
            try {
                API.AdminServiceApi.getStudent({
                    Keywords: {
                        Sno: cno,
                        Sname: cname,
                        Grade: credit,
                        Sgender: ctno,
                        Cono: tname,
                        Cname: ctime,
                    }
                })
                    .then((res) => {
                        console.log(res)
                        if (res.status === 200) {
                            if (res.data.Student) setCourses(res.data.Student);
                        }
                        else {
                            error("获取学生信息失败！");
                        }
                    })
                    .catch((err: any) => {
                        console.log("Get Student Error: ", err);
                        error("Get Student Error: " + err);
                    });
            } catch (err: any) {
                console.log("Get Student Error: ", err);
                error("Get Student Error: " + err);
            }
        }
    }

    useEffect(() => {
        handleSearch();
    }, []);

    const handleReset = () => {
        setCno("");
        setCname("");
        setCredit("");
        setCtno("");
        setTname("");
        setCtime("");
    }

    return (
        <div className="w-full h-screen flex flex-col gap-6 justify-center items-center px-28">
            <div className="w-full text-start text-3xl font-bold">学生信息查询</div>
            <div className="flex flex-wrap gap-4 w-full">
                <div className="flex gap-2 items-center">
                    <div>学号</div>
                    <Input className="w-[70%]" type="text" onValueChange={setCno} value={cno} />
                </div>
                <div className="flex gap-2 items-center">
                    <div>学生姓名</div>
                    <Input className="w-[70%]" type="text" onValueChange={setCname} value={cname} />
                </div>
                <div className="flex gap-2 items-center">
                    <div>年级</div>
                    <Input className="w-[70%]" type="text" onValueChange={setCredit} value={credit} />
                </div>
                <div className="flex gap-2 items-center">
                    <div>性别</div>
                    <Input className="w-[70%]" type="text" onValueChange={setCtno} value={ctno} />
                </div>
                <div className="flex gap-2 items-center">
                    <div>学院号</div>
                    <Input className="w-[70%]" type="text" onValueChange={setTname} value={tname} />
                </div>
                <div className="flex gap-2 items-center">
                    <div>学院名称</div>
                    <Input className="w-[70%]" type="text" onValueChange={setCtime} value={ctime} />
                </div>
            </div>
            <div className="flex gap-6">
                <button className="bg-blue-500 text-white rounded-md px-4 py-2" onClick={handleSearch}>查询</button>
                <button className="bg-blue-100 rounded-md px-4 py-2" onClick={handleReset}>重置</button>
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
                        <TableRow key={item.Sno}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}