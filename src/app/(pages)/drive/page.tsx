"use client";

import folderService from "@/appwrite/folderService";
import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setHomeFolders } from "@/redux/folderSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import InitialPage from "./InitialPage";

const Drive = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { authStatus, user } = useAppSelector((state) => state.user);
  const { homeFolders } = useAppSelector((state) => state.folder);

  useEffect(() => {
    if (!authStatus) router.push("/");
  }, [authStatus, router]);

  useEffect(() => {
    if (user) {
      folderService
        .getHomeFolders({ userId: user?.$id })
        .then((folders) => dispatch(setHomeFolders(folders)));
    }
  }, [dispatch, user]);

  return (
    <div className="p-4">
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-3">
        {homeFolders &&
          homeFolders.documents.map((folder) => (
            <Button
              variant={"secondary"}
              key={folder.$id}
              size={"lg"}
              className="max-sm:w-full max-sm:h-32 max-sm:p-4 flex-wrap"
            >
              <span className="sm:mr-2 max-sm:w-full max-sm:h-16 block">
                <Icon
                  name="folder"
                  strokeWidth={1.5}
                  className="w-full h-full max-sm:stroke-1"
                />
              </span>
              <span className="flex-1 text-left">{folder.name}</span>
              <Button variant={"ghost"} className="w-4 h-4 p-0 hover:bg-white">
                <Icon name="more-vertical" />
              </Button>
            </Button>
          ))}
      </div>
      {!homeFolders && <InitialPage />}
    </div>
  );
};

export default Drive;
