"use client";

import { useEffect, useState } from "react";

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState({
    userId: '222222',
    status: process.env.NEXT_PUBLIC_STATUS,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_TEST === 'test') {
      setUserInfo({
        userId: '222222',
        status: process.env.NEXT_PUBLIC_STATUS,
      });
    } else {
      const cachedData = localStorage.getItem("dbuserInfo");
      if (cachedData) {
        setIsLoading(false);
        const cachedUserInfo = JSON.parse(cachedData);

        setUserInfo({
          userId: cachedUserInfo.Uno,
          status: cachedUserInfo.status,
        });
      }
    }
    
  }, []);

  if (isLoading) {
    return null;
  }

  return userInfo;
}

export default useUserInfo;
