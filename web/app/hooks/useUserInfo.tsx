"use client";

import { useEffect, useState } from "react";

export function useUserInfo() {
  const isBrowser = typeof window !== 'undefined';
  const cachedData = isBrowser ? localStorage.getItem("dbuserInfo") : null;
  const initialUserInfo = cachedData
    ? {
        userId: JSON.parse(cachedData).Uno,
        status: JSON.parse(cachedData).status,
      }
    : {
        userId: '222222',
        status: process.env.NEXT_PUBLIC_STATUS,
      };

  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [isLoading, setIsLoading] = useState(!cachedData);

  useEffect(() => {
    if (!cachedData && process.env.NEXT_PUBLIC_TEST !== 'test') {
      // Fetch user info and call setUserInfo
    }
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return null;
  }

  return userInfo;
}

export default useUserInfo;