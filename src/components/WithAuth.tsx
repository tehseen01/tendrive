"use client";

import authService from "@/appwrite/auth";
import { useAppDispatch } from "@/hooks/hooks";
import { setAuthStatus, setUser } from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const WithAuth = (Component: any) => {
  return function AuthenticatedComponent(props: any) {
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
        router.push("/");
        console.log(error);
      }
    }, [dispatch, router]);

    useEffect(() => {
      getUser();
    }, [getUser]);

    return <Component {...props} />;
  };
};

export default WithAuth;
