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
} from "@nextui-org/react";
import useUserInfo from "../../hooks/useUserInfo";
import API from "@/app/utils/api";
import { error } from "@/app/utils/message";

interface ScreditType {
  Sno: string;
  Cno: string;
  Pass: '0' | '1';
}

const columns = [
  { name: "课程号", iid: "Cno" },
  { name: "学号", iid: "Sno" },
  { name: "是否通过", iid: "Pass" },
];

export default function App() {
  const userInfo = useUserInfo();
  const [credits, setCredits] = useState<Array<ScreditType>>([]);

  const refreshUsers = () => {
    if (process.env.NEXT_PUBLIC_TEST === "test") {
      setCredits([
        {
          Sno: '21122833',
          Cno: "16835001",
          Pass: '1',
        },
        {
          Sno: '21122833',
          Cno: "16835002",
          Pass: '0',
        },
        {
          Sno: '21122833',
          Cno: "16835003",
          Pass: '1',
        },
        {
          Sno: '21122833',
          Cno: "16835004",
          Pass: '1',
        },
        {
          Sno: '21122833',
          Cno: "16835005",
          Pass: '0',
        },
        {
          Sno: '21122833',
          Cno: "16835006",
          Pass: '1',
        },
        {
          Sno: '21122833',
          Cno: "16835007",
          Pass: '1',
        },
        {
          Sno: '21122833',
          Cno: "16835008",
          Pass: '1',
        },
        {
          Sno: '21122833',
          Cno: "16835009",
          Pass: '1',
        },
        {
          Sno: '21122833',
          Cno: "16835010",
          Pass: '1',
        },
        {
          Sno: '21122833',
          Cno: "16835011",
          Pass: '1',
        },
      ]);
    } else {
      try {
        if (userInfo)
          API.StudentServiceApi.getScredit(userInfo.userId)
            .then((res) => {
              console.log(res)
              if (res.status === 200) {
                if (res.data.Scredit) setCredits(res.data.Scredit);
              }
              else {
                error("获取学分情况失败！");
              }
            })
            .catch((err: any) => {
              console.log("Get Scredit Error: ", err);
              error("Get Scredit Error: " + err);
            });
      } catch (err: any) {
        console.log("Get Scredit Error: ", err);
        error("Get Scredit Error: " + err);
      }
    }
  }

  useEffect(() => {
    refreshUsers();
  }, []);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(credits.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return credits.slice(start, end);
  }, [page, credits]);

  return (
    <div className="w-full h-screen flex flex-col gap-20 justify-center items-center px-28">
      <div className="w-full text-start text-3xl font-bold">学分完成情况</div>
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