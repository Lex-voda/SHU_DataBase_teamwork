"use client";

import { Button, TableCell, TableRow } from "@nextui-org/react";
import { MeetingRoomType } from "../page";
import { currentBlock } from "@/app/utils/getCurrentBlock";
import { useState } from "react";
import { error } from "@/app/utils/message";
import { randomColor } from "@/app/utils/randomColor";

export default function MyTableRow({ item, handleDate }: { item: MeetingRoomType; handleDate: (MRno: string, MRTimeArray: string[]) => void }) {
    const [MRTimeArray, setMRTimeArray] = useState<number[]>([]);
    return (
        <div className="flex flex-col gap-[6px]">
            <div className="w-full flex justify-between">
                <div>会议室编号：{item.MRno}</div>
                <Button color="primary" size="sm" onClick={(e) => {
                    let MRTime: string[] = [];
                    if (MRTimeArray.length === 0) {
                        error("请选择预约时间！");
                        return;
                    }
                    for (let i = 0; i < MRTimeArray.length; i++) {
                        MRTime.push(String(MRTimeArray[i]) + '-' + String(MRTimeArray[i]));
                    }
                    // console.log(MRTime);
                    handleDate(item.MRno, MRTime);
                    setMRTimeArray([]);
                }}>预约</Button>
            </div>
            <div className="w-full flex justify-between items-center">
                {item.Uno.map((value, index) => {
                    return (
                        <div
                            className="w-[8%] h-[20px] mx-1 rounded-md text-center "
                            key={index}
                            style={{
                                backgroundColor: index <= currentBlock - 0.5 ? 'grey' : ((MRTimeArray.indexOf(index + 1) != -1)) ? randomColor[0] : value === 'empty' ? 'white' : randomColor[(1 + (Number(value)) % 999)],
                                cursor: (index >= currentBlock - 0.5) ? "pointer" : "not-allowed",
                                opacity: index <= currentBlock - 0.5 ? '0.5' : '1',
                            }}
                            onClick={(e) => {
                                if (index >= currentBlock - 0.5) {
                                    for (let i = 0; i < MRTimeArray.length; i++) {
                                        if (MRTimeArray[i] === index + 1) {
                                            let temp = [...MRTimeArray];
                                            temp.splice(i, 1);
                                            console.log(temp)
                                            setMRTimeArray(temp);
                                            return;
                                        }
                                    }
                                    let temp = [...MRTimeArray];
                                    temp[MRTimeArray.length] = index + 1;
                                    setMRTimeArray(temp);
                                    console.log(temp)
                                }
                            }}
                        >
                            {((MRTimeArray.indexOf(index + 1) != -1) || value === 'empty') ? '' : value}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}