"use client";

import service from "@/appwrite/services";
import Files from "@/components/Files";
import Folders from "@/components/Folders";
import EmptyBin from "@/components/dialog/EmptyBin";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import conf from "@/lib/conf";
import { setBinFiles } from "@/redux/fileSlice";
import { setBinFolders } from "@/redux/folderSlice";
import React, { useEffect } from "react";

const TrashPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const { binFolders } = useAppSelector((state) => state.folder);
  const { binFiles } = useAppSelector((state) => state.file);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      service
        .getAllBinDocs({
          userId: user.$id,
          collectionId: conf.appwriteFolderCollectionId,
        })
        .then((folders) => dispatch(setBinFolders(folders)))
        .catch((error) => console.error(error));

      service
        .getAllBinDocs({
          userId: user.$id,
          collectionId: conf.appwriteFileCollectionId,
        })
        .then((files) => dispatch(setBinFiles(files)))
        .catch((error) => console.error(error));
    }
  }, [user, dispatch]);

  return (
    <div className="p-4 pb-24 overflow-y-auto h-full">
      {(binFolders && binFolders.total !== 0) ||
      (binFiles && binFiles.total !== 0) ? (
        <>
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
            <p>Items in the bin will be deleted forever</p>
            <EmptyBin>
              <Button variant={"ghost"}>Empty bin</Button>
            </EmptyBin>
          </div>
          {binFolders && binFolders.total !== 0 && (
            <Folders data={binFolders} />
          )}
          {binFiles && binFiles.total !== 0 && <Files filesData={binFiles} />}
        </>
      ) : (
        <p className="text-center">Your bin is empty!</p>
      )}
    </div>
  );
};

export default TrashPage;
