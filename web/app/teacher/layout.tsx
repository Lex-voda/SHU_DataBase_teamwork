
"use client";

import {
    Button,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";

import { logoutClicked } from "../utils/login";
import useUserInfo from "../hooks/useUserInfo";
import { useRouter } from "next/navigation";

const mainLayout = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();

    const userInfo = useUserInfo();

    const navItems: Array<{ name: string; href: string; }> = [
        { name: "教分完成情况", href: '/teacher/Tcredit_Inquire' },
        { name: "课程信息查询", href: '/teacher/Course_Inquire' },
        { name: "项目查询", href: '/teacher/Project_Inquire' },
        { name: "教室使用查询", href: '/teacher/ClassRoom_Inquire' },
        { name: "会议室预约", href: '/teacher/MeetingRoom_Inquire' },
    ];

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    let isLogin = true;
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_TEST === "test") { return; }
        if (userInfo) {
            console.log(userInfo);
            if (userInfo.status !== "T") {
                isLogin = false;
                onOpen();
            }
        }
    }, [userInfo]);

    return (
        <div className="flex min-h-[100vh] flex-col w-screen">
            <div className={`flex flex-col items-center justify-between fixed w-[240px] h-screen top-0 left-0 z-50 bg-black text-white`}>

                <div className="text-2xl w-full ml-8 my-3 text-transparent bg-clip-text bg-gradient-to-tr from-[#91bef0] to-[violet] ">
                    教务管理系统
                </div>

                <div className=" flex w-full h-full flex-col items-start justify-start  bg-white/15 px-4 text-white ">
                    {navItems.map((item) => {
                        return (
                            <Link
                                as="a"
                                key={item.name}
                                href={item.href}
                                size="lg"
                                className="text-md text-start mt-4 w-full text-white/55"
                            >
                                <div className="z-50 font-medium">· {item.name}</div>
                            </Link>
                        );
                    })}
                </div>

                <div className="flex w-full items-center justify-center text-md mr-2 text-[red] cursor-pointer hover:opacity-60 text-xl py-3"
                    onClick={logoutClicked}
                >
                    退出
                </div>
            </div>
            <div className="fixed w-[calc(100vw-240px)] h-screen top-0 left-[240px] ">{children}</div>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                hideCloseButton={true}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                请登录！
                            </ModalHeader>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    onPress={() => {
                                        onClose();
                                        router.push("/login");
                                    }}
                                >
                                    Ok
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default mainLayout;
