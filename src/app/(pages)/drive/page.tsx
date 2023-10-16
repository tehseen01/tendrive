"use client";

import folderService from "@/appwrite/folderService";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setFoldersData } from "@/redux/folderSlice";
import React, { useEffect } from "react";
import InitialPage from "./InitialPage";
import Folders from "@/components/Folders";

const Drive = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { foldersData } = useAppSelector((state) => state.folder);

  useEffect(() => {
    if (user) {
      folderService
        .getHomeFolders({ userId: user?.$id })
        .then((folders) => dispatch(setFoldersData(folders)));
    }
  }, [dispatch, user]);

  return (
    <div className="p-4">
      {foldersData && <Folders data={foldersData} />}

      {!foldersData && <InitialPage />}
    </div>
  );
};

export default Drive;
