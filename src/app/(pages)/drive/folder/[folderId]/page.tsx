"use client";

import folderService from "@/appwrite/folderService";
import Folders from "@/components/Folders";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setFoldersData } from "@/redux/folderSlice";
import React, { useEffect } from "react";

const FolderPage = ({ params }: { params: { folderId: string } }) => {
  const dispatch = useAppDispatch();

  const { foldersData } = useAppSelector((state) => state.folder);

  useEffect(() => {
    folderService
      .getChildFolder({ parentId: params.folderId })
      .then((folder) => dispatch(setFoldersData(folder)));
  }, [params.folderId, dispatch]);

  return (
    <div className="p-4 h-full">
      <div>
        {foldersData && foldersData.total !== 0 && (
          <Folders data={foldersData} />
        )}
      </div>
      {!foldersData?.total && (
        <div className="flex items-center justify-center flex-col h-[calc(100%_-_100px)]">
          <h2 className="text-2xl font-semibold">Drop files here</h2>
          <p>or use the `New` button</p>
        </div>
      )}
    </div>
  );
};

export default FolderPage;
