"use client";

import storageService from "@/appwrite/storageService";
import { TFiles } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FileFolderMoreOption from "./FileFolderMoreOption";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setFileInfo } from "@/redux/fileSlice";

const Files = ({ filesData }: { filesData: TFiles }) => {
  const dispatch = useAppDispatch();

  const { fileInfo } = useAppSelector((state) => state.file);

  useEffect(() => {
    if (filesData) {
      const filePromise = filesData.documents.map((file) =>
        storageService.getFileInfo({ fileId: file.$id })
      );

      Promise.all(filePromise)
        .then((data) => dispatch(setFileInfo(data)))
        .catch((error) => console.log(error));
    }
  }, [filesData, dispatch]);

  return (
    <div className="mt-4">
      <h3 className="pb-2 font-medium">Files</h3>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-3">
        {filesData.documents.map((file) => {
          const info =
            fileInfo && fileInfo.find((info) => info.$id === file.$id);
          return (
            <div key={file.$id} className="bg-secondary rounded-md">
              <div className="flex justify-between items-center px-4 h-11">
                {info && (
                  <span>
                    {info.name.length > 10
                      ? info.name.slice(0, 10) + "..."
                      : info.name}
                  </span>
                )}
                <FileFolderMoreOption fileOrFolderData={file} />
              </div>
              <figure className="w-full aspect-square p-2">
                <Image
                  src={storageService.getFilePreview({ fileId: file.$id }).href}
                  width={100}
                  height={100}
                  alt="image"
                  className="w-full h-full object-none bg-white rounded-sm"
                />
              </figure>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Files;
