"use client";

import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Slider,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

import { success } from "@/app/utils/message";
import Image from "next/image";
import { logoutClicked } from "../../utils/login";
import useUserInfo from "../../hooks/useUserInfo";
import { useRouter } from "next/navigation";
import ProfileSVG from "@/app/svg/avatar.svg";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const userInfo = useUserInfo();

  const isAdmin = userInfo?.permission === "admin";

  const navItems: Array<{ name: string; href: string; disabled: boolean }> = [
    { name: "审核", href: "/main/check", disabled: false },
    { name: "管理", href: "/main/authy", disabled: !isAdmin },
  ];

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  let isLogin = true;
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      if (userInfo.userName === "None") {
        isLogin = false;
        onOpen();
      }
    }
  }, [userInfo]);

  const SignInUpOut = ({
    isLogin,
    handleLogout,
  }: {
    isLogin: boolean;
    handleLogout: () => void;
  }) => {
    if (isLogin) {
      return (
        <div className="flex items-center justify-center">
          <Button
            color="primary"
            radius="sm"
            onClick={handleLogout}
            size="md"
            className="text-md mr-2 text-white"
          >
            退出
          </Button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          <Link href="/auth#signup">
            <Button
              color="primary"
              size="sm"
              radius="sm"
              className="text-md mr-2 text-white"
            >
              Sign up
            </Button>
          </Link>

          <Link href="/auth">
            <Button
              color="primary"
              radius="sm"
              size="sm"
              className="text-md h-[32px] bg-[#BA00BA]"
            >
              Sign in
            </Button>
          </Link>
        </div>
      );
    }
  };

  const NavLinks = ({
    isLogin,
    handleLogout,
  }: {
    isLogin: boolean;
    handleLogout: () => void;
  }) => {
    const NavItemsList = () =>
      navItems.map((item) => {
        if (item.disabled) {
          return null;
        }
        return (
          <div
            key={item.href}
            className="mt-1 flex items-center justify-center"
          >
            <Link href={item.href} size="lg" color="foreground">
              <a className="p-2 text-2xl">{item.name}</a>
            </Link>
          </div>
        );
      });

    return (
      <>
        <NavItemsList />
        <SignInUpOut isLogin={isLogin} handleLogout={handleLogout} />
      </>
    );
  };

  return (
    <div className={`flex flex-row items-center fixed w-[240px] h-screen top-0 left-0 z-50 bg-black text-white`}>
      <div className="flex flex-col ">
        {/* desktop show */}
        <div>
          <Link href="/main" className="text-transparent bg-clip-text bg-gradient-to-tr from-[#91bef0] to-[violet] " size="lg">
            教务管理系统
          </Link>
        </div>

        {/* desktop nav item */}
        <div className="hidden sm:flex justify-center">
          <div
            className="
                flex h-[40px] flex-row items-center justify-center gap-8 rounded-full bg-white/15
                px-6 py-1 text-white
              "
          >
            {navItems.map((item) => {
              if (item.disabled) {
                return null;
              }
              return (
                <Link
                  as="a"
                  key={item.name}
                  href={item.href}
                  size="lg"
                  className="text-md flex w-full items-center justify-center text-white/55"
                >
                  <div className="z-50 font-medium">{item.name}</div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end">
          <div className="flex items-center justify-center">
            <Link href="/main/profile">
              <Image src={ProfileSVG} alt="Profile" width={32} height={32} />
            </Link>
          </div>
          <div className="hidden sm:flex justify-end">
            <SignInUpOut isLogin={isLogin} handleLogout={logoutClicked} />
          </div>
        </div>

        {/* toggle button */}
        <div aria-label={"mobile"} className="sm:hidden" />

        {/* mobile show */}
        <div>
          <NavLinks isLogin={isLogin} handleLogout={logoutClicked} />
        </div>
      </div>

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

export default NavBar;
