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

interface CourseType {
    Cno: string;
    Cname: string;
    Credit: string;
    Ctno: string;
    Ctime: string;
    Tname: string;
}

const columns = [
    { name: "课程号", iid: "Cno" },
    { name: "课程名称", iid: "Cname" },
    { name: "学分", iid: "Credit" },
    { name: "课程教师编号", iid: "Ctno" },
    { name: "课程时间", iid: "Ctime" },
    { name: "教师姓名", iid: "Tname" },
];

export default function App() {
    const userInfo = useUserInfo();
    const [courses, setCourses] = useState<Array<CourseType>>([]);

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
            setCourses([
                {
                    Cno: "16835001",
                    Cname: "计算机组成原理",
                    Credit: "4",
                    Ctno: "10001",
                    Ctime: "10001",
                    Tname: "张三",
                },
                {
                    Cno: "16835002",
                    Cname: "操作系统",
                    Credit: "4",
                    Ctno: "10002",
                    Ctime: "10002",
                    Tname: "李四",
                },
                {
                    Cno: "16835003",
                    Cname: "数据结构",
                    Credit: "4",
                    Ctno: "10003",
                    Ctime: "10003",
                    Tname: "王五",
                },
                {
                    Cno: "16835004",
                    Cname: "计算机网络",
                    Credit: "4",
                    Ctno: "10004",
                    Ctime: "10004",
                    Tname: "赵六",
                },
                {
                    Cno: "16835005",
                    Cname: "数据库系统",
                    Credit: "4",
                    Ctno: "10005",
                    Ctime: "10005",
                    Tname: "孙七",
                },
            ]);
        } else {
            try {
                API.StudentServiceApi.getCourse({
                    Keywords: {
                        Cno: cno,
                        Cname: cname,
                        Credit: credit,
                        Ctno: ctno,
                        Tname: tname,
                        Ctime: ctime,
                    }
                })
                    .then((res) => {
                        console.log(res)
                        if (res.status === 200) {
                            if (res.data.Course) setCourses(res.data.Course);
                        }
                        else {
                            error("获取课程信息失败！");
                        }
                    })
                    .catch((err: any) => {
                        console.log("Get Course Error: ", err);
                        error("Get Course Error: " + err);
                    });
            } catch (err: any) {
                console.log("Get Course Error: ", err);
                error("Get Course Error: " + err);
            }
        }
    }

    useEffect(()=>{
        handleSearch();
    },[]);

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
            <div className="w-full text-start text-3xl font-bold">课程信息查询</div>
            <div className="flex flex-wrap gap-4 w-full">
                <div className="flex gap-2 items-center">
                    <div>课程编号</div>
                    <Input className="w-[70%]" type="text" onValueChange={setCno} value={cno} />
                </div>
                <div className="flex gap-2 items-center">
                    <div>课程名称</div>
                    <Input className="w-[70%]" type="text" onValueChange={setCname} value={cname} />
                </div>
                <div className="flex gap-2 items-center">
                    <div>学分</div>
                    <Input className="w-[70%]" type="text" onValueChange={setCredit} value={credit} />
                </div>
                <div className="flex gap-2 items-center">
                    <div>教师编号</div>
                    <Input className="w-[70%]" type="text" onValueChange={setCtno} value={ctno} />
                </div>
                <div className="flex gap-2 items-center">
                    <div>教师姓名</div>
                    <Input className="w-[70%]" type="text" onValueChange={setTname} value={tname} />
                </div>
                <div className="flex gap-2 items-center">
                    <div>上课时间</div>
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
                        <TableRow key={item.Cno}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}