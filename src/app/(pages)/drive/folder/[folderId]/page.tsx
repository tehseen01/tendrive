"use client";

import service from "@/appwrite/services";
import Files from "@/components/Files";
import Folders from "@/components/Folders";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import conf from "@/lib/conf";
import { setFilesData } from "@/redux/fileSlice";
import { setFoldersData } from "@/redux/folderSlice";
import React, { useEffect } from "react";

const FolderPage = ({ params }: { params: { folderId: string } }) => {
  const dispatch = useAppDispatch();

  const { foldersData } = useAppSelector((state) => state.folder);
  const { filesData } = useAppSelector((state) => state.file);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      service
        .getChildDocs({
          parentId: params.folderId,
          collectionId: conf.appwriteFolderCollectionId,
          userId: user.$id,
        })
        .then((folder) => dispatch(setFoldersData(folder)))
        .catch((error) => console.error(error));

      service
        .getChildDocs({
          parentId: params.folderId,
          userId: user.$id,
          collectionId: conf.appwriteFileCollectionId,
        })
        .then((file) => dispatch(setFilesData(file)))
        .catch((error) => console.error(error));
    }
  }, [params.folderId, dispatch, user]);

  return (
    <div className="p-4 pb-24 overflow-y-auto h-full">
      {foldersData && foldersData.total !== 0 && <Folders data={foldersData} />}

      {filesData && filesData.total !== 0 && <Files filesData={filesData} />}

      {!foldersData?.total && !filesData?.total && (
        <div className="flex items-center justify-center flex-col h-[calc(100%_-_100px)]">
          <h2 className="text-2xl font-semibold">Drop files here</h2>
          <p>or use the `New` button</p>
        </div>
      )}
    </div>
  );
};

export default FolderPage;
