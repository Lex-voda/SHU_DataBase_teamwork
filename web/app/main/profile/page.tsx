"use client";
import useUserInfo from "../../hooks/useUserInfo";
import { Button } from "@nextui-org/react";
import { logoutClicked } from "../../utils/login";

const Profile = () => {
  const userInfo = useUserInfo();
  const isAdmin = userInfo?.permission === "admin";
  return (
    <div className="flex w-full flex-row flex-wrap px-[5vw] pt-[3vw] font-medium">
      {/* my account */}
      <div className="mb-[5vw] mr-[5vw]  w-[320px] lg:w-[50vw]">
        <div className="text-start text-3xl text-black lg:text-4xl">
          My Account
        </div>
        <div className="mt-[2.2vh] flex w-full flex-row rounded-2xl border-2 border-[#c3c3c3] px-[1.4vw] py-[30px] text-sm lg:mt-[5vh]">
          <div className="flex w-[30%] flex-col pr-[20px] text-[14px] text-black lg:pr-[40px] lg:text-[20px]">
            <div className="w-full text-right">Name: </div>
            <div className="mt-[3.4vh] w-full text-right md:mt-[3.1vh]">
              Permission:
            </div>
            <div className="mt-[3.6vh] w-full text-right md:mt-[3.3vh]">
              Actions:
            </div>
          </div>
          <div className="flex w-[70%] flex-col text-[14px] font-normal lg:w-[80%] lg:text-[18px]">
            <div className="">
              <span className="rounded-md p-1 text-black transition-colors">
                {userInfo?.userName}
              </span>
            </div>
            <div className="mt-[3.4vh] md:mt-[3.1vh]">
              {isAdmin ? (
                <span className="z-[-1] animate-streamer rounded-lg bg-streamer-color bg-[length:400%] px-[16px] py-[4px] text-white">
                  {userInfo?.permission}
                </span>
              ) : (
                <span className="rounded-lg  px-[16px] py-[4px] text-black">
                  {userInfo?.permission}
                </span>
              )}
            </div>
            <div className="mt-[3.1vh]  md:mt-[2.5vh]">
              <Button
                className="bg-[#f9d8f9c7] hover:bg-[#ffb7fec7]"
                onClick={logoutClicked}
              >
                <span className="cursor-pointer rounded-md  px-1 text-black transition-colors ">
                  Sign Out
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
