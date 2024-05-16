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

interface TeacherType {
    Tno: string,
    Tname: string,
    Tlevel: string,
    Tgender: string,
    Cname: string
}

const columns = [
    { name: "工号", iid: "Tno" },
    { name: "教师姓名", iid: "Tname" },
    { name: "职称", iid: "Tlevel" },
    { name: "性别", iid: "Tgender" },
    { name: "学院名称", iid: "Cname" },
];

export default function App() {
    const userInfo = useUserInfo();
    const [courses, setCourses] = useState<Array<TeacherType>>([]);

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
                Tno: "100001",
                Tname: "peter",
                Tlevel: "2018",
                Tgender: "男",
                Cname: "计算机学院",
            },
            {
                Tno: "100002",
                Tname: "lucy",
                Tlevel: "2018",
                Tgender: "女",
                Cname: "计算机学院",
            },
            {
                Tno: "100003",
                Tname: "tom",
                Tlevel: "2018",
                Tgender: "男",
                Cname: "计算机学院",
            },
            {
                Tno: "100004",
                Tname: "danny",
                Tlevel: "2018",
                Tgender: "男",
                Cname: "计算机学院",
            },
            {
                Tno: "100005",
                Tname: "lily",
                Tlevel: "2018",
                Tgender: "女",
                Cname: "计算机学院",
            },
            {
                Tno: "100006",
                Tname: "danny",
                Tlevel: "2018",
                Tgender: "男",
                Cname: "计算机学院",
            },
            {
                Tno: "100007",
                Tname: "lucy",
                Tlevel: "2018",
                Tgender: "女",
                Cname: "计算机学院",
            },
            {
                Tno: "100008",
                Tname: "tom",
                Tlevel: "2018",
                Tgender: "男",
                Cname: "计算机学院",
            },
            ]);
        } else {
            try {
                API.AdminServiceApi.getTeacher({
                    Keywords: {
                        Tno: cno,
                        Tname: cname,
                        Tlevel: credit,
                        Tgender: ctno,
                        Cono: tname,
                        Cname: ctime,
                    }
                })
                    .then((res) => {
                        console.log(res)
                        if (res.status === 200) {
                            if (res.data.Teacher) setCourses(res.data.Teacher);
                        }
                        else {
                            error("获取教师信息失败！");
                        }
                    })
                    .catch((err: any) => {
                        console.log("Get Teacher Error: ", err);
                        error("Get Teacher Error: " + err);
                    });
            } catch (err: any) {
                console.log("Get Teacher Error: ", err);
                error("Get Teacher Error: " + err);
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
            <div className="w-full text-start text-3xl font-bold">教师信息查询</div>
            <div className="flex flex-wrap gap-4 w-full">
                <div className="flex gap-2 items-center">
                    <div>工号</div>
                    <Input className="w-[70%]" type="text" onValueChange={setCno} value={cno} />
                </div>
                <div className="flex gap-2 items-center">
                    <div>教师姓名</div>
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
                        <TableRow key={item.Tno}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}