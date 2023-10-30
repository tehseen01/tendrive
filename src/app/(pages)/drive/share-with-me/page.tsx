"use client";

import service from "@/appwrite/services";
import Files from "@/components/Files";
import Folders from "@/components/Folders";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setShareDocs } from "@/redux/commonSlice";
import React, { useEffect, useState } from "react";

const SharePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { shareFiles, shareFolders } = useAppSelector((state) => state.common);

  useEffect(() => {
    async function getShareData() {
      try {
        if (user) {
          const data = await service.getShareDocs(user?.$id);
          dispatch(setShareDocs(data));
        }
      } catch (error) {
        console.log(error);
      }
    }

    getShareData();
  }, [user, dispatch]);

  return (
    <div className="h-full overflow-y-auto p-4">
      {shareFolders && shareFolders.total > 0 && (
        <Folders data={shareFolders} />
      )}
      {shareFiles && shareFiles.total > 0 && <Files filesData={shareFiles} />}
      {shareFiles &&
        shareFiles.total === 0 &&
        shareFolders &&
        shareFolders.total === 0 && (
          <div className="flex items-center justify-center">
            There is no shared files!
          </div>
        )}
    </div>
  );
};

export default SharePage;
