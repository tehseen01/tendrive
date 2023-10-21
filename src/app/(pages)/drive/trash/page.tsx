"use client";

import folderService from "@/appwrite/folderService";
import Folders from "@/components/Folders";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setBinFolders } from "@/redux/folderSlice";
import React, { useEffect } from "react";

const TrashPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const { binFolders } = useAppSelector((state) => state.folder);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      folderService
        .getAllBinFolders({ userId: user.$id })
        .then((folders) => dispatch(setBinFolders(folders)));
    }
  }, [user, dispatch]);

  return (
    <div className="p-4">
      {binFolders && binFolders.total !== 0 && <Folders data={binFolders} />}
    </div>
  );
};

export default TrashPage;
