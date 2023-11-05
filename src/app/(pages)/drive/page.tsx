"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setFoldersData } from "@/redux/folderSlice";
import React, { useEffect } from "react";
import InitialPage from "./InitialPage";
import Folders from "@/components/Folders";
import { setFilesData } from "@/redux/fileSlice";
import Files from "@/components/Files";
import service from "@/appwrite/services";
import conf from "@/lib/conf";

const Drive = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { foldersData } = useAppSelector((state) => state.folder);
  const { filesData } = useAppSelector((state) => state.file);

  useEffect(() => {
    if (user) {
      service
        .getDocs({
          userId: user?.$id,
          collectionId: conf.appwriteFolderCollectionId,
        })
        .then((folders) => dispatch(setFoldersData(folders)))
        .catch((error) => console.error(error));
      service
        .getDocs({
          userId: user.$id,
          collectionId: conf.appwriteFileCollectionId,
        })
        .then((files) => dispatch(setFilesData(files)))
        .catch((error) => console.error(error));
    }
  }, [dispatch, user]);

  return (
    <div className="p-4 pb-24 overflow-y-auto h-full">
      {(foldersData && foldersData.total !== 0) ||
      (filesData && filesData.total !== 0) ? (
        <>
          {foldersData && foldersData.total !== 0 && (
            <Folders data={foldersData} />
          )}
          {filesData && filesData.total !== 0 && (
            <Files filesData={filesData} />
          )}
        </>
      ) : (
        <InitialPage />
      )}
    </div>
  );
};

export default Drive;
