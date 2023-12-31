"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Icon from "./Icon";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Logout from "./dialog/Logout";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { setMobileSearchBar, setOpenMobileNav } from "@/redux/commonSlice";
import Search from "./Search";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { authStatus, user, userProfile } = useAppSelector(
    (state) => state.user
  );
  const { openMobileNav, mobileSearchBar } = useAppSelector(
    (state) => state.common
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        dispatch(setOpenMobileNav(false));
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <header className="md:px-6 px-4 border-b">
      <nav className="flex justify-between items-center py-4">
        <div className="flex gap-3 items-center">
          {authStatus && (
            <Button
              variant={"ghost"}
              size={"icon"}
              className="md:hidden"
              onClick={() => dispatch(setOpenMobileNav(!openMobileNav))}
            >
              <Icon name="menu" />
            </Button>
          )}
          <Link href={"/"} className={cn(mobileSearchBar ? "hidden" : "")}>
            <span className="text-2xl font-bold">Ten</span>
            <span className="text-2xl">Drive</span>
          </Link>
        </div>
        {authStatus && <Search />}

        {authStatus ? (
          <div className="flex gap-4">
            <div className="md:hidden">
              <Button
                size={"icon"}
                variant={"ghost"}
                onClick={() => dispatch(setMobileSearchBar())}
              >
                {mobileSearchBar ? (
                  <Icon name="x" strokeWidth={1.5} />
                ) : (
                  <Icon name="search" strokeWidth={1.5} />
                )}
              </Button>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarFallback>
                    <span className="font-bold text-xl">
                      {user?.name.charAt(0).toUpperCase()}
                    </span>
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col items-center justify-center gap-4 mr-4">
                <div className="relative">
                  <Avatar className="w-20 h-20 ">
                    {userProfile && (
                      <AvatarImage src={userProfile} alt={user?.name} />
                    )}
                    <AvatarFallback>
                      <span className="font-bold text-4xl">
                        {user?.name.charAt(0).toUpperCase()}
                      </span>
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="absolute -bottom-1 -right-1  rounded-full p-0 w-8 h-8"
                  >
                    <Icon name="pencil" size={18} />
                  </Button>
                </div>
                <div className="text-center">
                  <h5 className="font-medium text-2xl">{user?.name}</h5>
                  <h6 className="">{user?.email}</h6>
                </div>
                <Logout>
                  <Button>Log out</Button>
                </Logout>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button asChild variant={"outline"}>
              <Link href={"/signup"}>Sign up</Link>
            </Button>
            <Button asChild>
              <Link href={"/login"}>Get start</Link>
            </Button>
          </div>
        )}
      </nav>

      <div
        className={cn(
          openMobileNav ? "translate-x-0" : "-translate-x-[100%]",
          "fixed inset-0 bg-background transition-transform"
        )}
      >
        <div className="border-b p-4 flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold">Ten</span>
            <span className="text-2xl">Drive</span>
          </div>
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => dispatch(setOpenMobileNav(!openMobileNav))}
          >
            <Icon name="x" strokeWidth={1.5} />
          </Button>
        </div>
        <Sidebar />
      </div>
    </header>
  );
};

export default Navbar;
