"use client";

import authService from "@/appwrite/auth";
import { useAppDispatch } from "@/hooks/hooks";
import { setAuthStatus, setUser } from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const CurrentUser = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const getUser = useCallback(async () => {
    try {
      const user = await authService.currentUser();
      if (user) {
        dispatch(setAuthStatus(true));
        dispatch(setUser(user));
        router.push("/drive");
      }
    } catch (error: any) {
      console.log(error);
    }
  }, [dispatch, router]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return null;
};

export default CurrentUser;
