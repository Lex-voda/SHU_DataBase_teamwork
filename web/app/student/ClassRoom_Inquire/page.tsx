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

interface ClassroomType {
    CRno: string;
    Cname: string;
    Cno: string;
    Ctno: string;
    CRtime: string;
    Tname: string;
}

const columns = [
    { name: "教室号", iid: "CRno" },
    { name: "课程名称", iid: "Cname" },
    { name: "课程号", iid: "Cno" },
    { name: "课程教室编号", iid: "Ctno" },
    { name: "课程时间", iid: "CRtime" },
    { name: "教师姓名", iid: "Tname" },
];

export default function App() {
    const userInfo = useUserInfo();
    const [courses, setCourses] = useState<Array<ClassroomType>>([]);

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 8;

    const pages = Math.ceil(courses.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return courses.slice(start, end);
    }, [page, courses]);

    const [cno, setCno] = useState<string>("");
    const [ctno, setCtno] = useState<string>("");
    const [crno, setCrno] = useState<string>("");
    const [crtime, setCrtime] = useState<string>("");

    const handleSearch = () => {
        if (process.env.NEXT_PUBLIC_TEST === "test") {
            setCourses([
                {
                    CRno: "501",
                    Cname: "计算机组成原理",
                    Cno: "16835004",
                    Ctno: "10001",
                    CRtime: "3-1",
                    Tname: "张三",
                },
                {
                    CRno: "502",
                    Cname: "操作系统",
                    Cno: "16835004",
                    Ctno: "10002",
                    CRtime: "3-2",
                    Tname: "李四",
                },
                {
                    CRno: "503",
                    Cname: "数据结构",
                    Cno: "16835004",
                    Ctno: "10003",
                    CRtime: "3-3",
                    Tname: "王五",
                },
                {
                    CRno: "504",
                    Cname: "计算机网络",
                    Cno: "16835004",
                    Ctno: "10004",
                    CRtime: "3-4",
                    Tname: "赵六",
                },
                {
                    CRno: "505",
                    Cname: "数据库系统",
                    Cno: "16835004",
                    Ctno: "10005",
                    CRtime: "3-5",
                    Tname: "孙七",
                },
            ]);
        } else {
            try {
                API.StudentServiceApi.getClassRoom({
                    Keywords: {
                        CRno: crno,
                        Cno: cno,
                        Ctno: ctno,
                        CRtime: crtime,
                    }
                })
                    .then((res) => {
                        console.log(res)
                        if (res.status === 200) {
                            if (res.data.ClassRoom) setCourses(res.data.ClassRoom);
                        }
                        else {
                            error("获取教室信息失败！");
                        }
                    })
                    .catch((err: any) => {
                        console.log("Get ClassRoom Error: ", err);
                        error("Get ClassRoom Error: " + err);
                    });
            } catch (err: any) {
                console.log("Get ClassRoom Error: ", err);
                error("Get ClassRoom Error: " + err);
            }
        }
    }

    useEffect(() => {
        handleSearch();
    }, []);


    const handleReset = () => {
        setCno("");
        setCtno("");
        setCrno("");
        setCrtime("");
    }

    return (
        <div className="w-full h-screen flex flex-col gap-10 justify-center items-center px-28">
            <div className="w-full text-start text-3xl font-bold">教室信息查询</div>
            <div className="flex gap-4">
                <div className="flex flex-wrap gap-4 w-[75%]">
                    <div className="flex gap-2 items-center">
                        <div>课程编号</div>
                        <Input className="w-[70%]" type="text" onValueChange={setCno} value={cno} />
                    </div>
                    <div className="flex gap-2 items-center">
                        <div>教室编号</div>
                        <Input className="w-[70%]" type="text" onValueChange={setCrno} value={crno} />
                    </div>
                    <div className="flex gap-2 items-center">
                        <div>教室时间</div>
                        <Input className="w-[70%]" type="text" onValueChange={setCrtime} value={crtime} />
                    </div>
                    <div className="flex gap-2 items-center">
                        <div>教师编号</div>
                        <Input className="w-[70%]" type="text" onValueChange={setCtno} value={ctno} />
                    </div>
                </div>
                <div className="flex flex-col gap-6 w-[20%]">
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
                        <TableRow key={item.CRno + item.CRtime}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}