"use client";

import authService from "@/appwrite/auth";
import { useAppDispatch } from "@/hooks/hooks";
import { setAuthStatus, setUser } from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const WithAuth = (Component: any) => {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
      authService
        .currentUser()
        .then((user) => {
          dispatch(setAuthStatus(true));
          dispatch(setUser(user));
          router.push("/drive");
        })
        .catch((error) => {
          router.push("/");
          console.log(error);
        });
    }, [dispatch, router]);

    return <Component {...props} />;
  };
};

export default WithAuth;
