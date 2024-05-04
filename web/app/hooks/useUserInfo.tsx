"use client";

import { useEffect, useState } from "react";

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState({
    userName: "None",
    userId: 123456,
    permission: "review",
  });

  const [isLoading, setIsLoading]=useState(true);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_TEST==='test') {
      setUserInfo({
        userName: "test",
        userId: 222222,
        permission: "admin",
      });
    } else {
      const cachedData = localStorage.getItem("xcuserInfo");
      if (cachedData) {
        const cachedUserInfo = JSON.parse(cachedData);
        setUserInfo(cachedUserInfo.data);
      }
    }
    setIsLoading(false);
  }, []);

  if(isLoading){
    return null;
  }

  return userInfo;
}

export default useUserInfo;
