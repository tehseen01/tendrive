"use client";

import storageService from "@/appwrite/storageService";
import { TFileInfoType, TFiles } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FileFolderMoreOption from "./FileFolderMoreOption";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setFileInfo, setOpenFile, setViewFileData } from "@/redux/fileSlice";
import Icon from "./Icon";
import { usePathname } from "next/navigation";

const Files = ({ filesData }: { filesData: TFiles }) => {
  const pathname = usePathname();
  const trashPath = pathname === "/drive/trash";
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

  const handleFileView = (info: TFileInfoType) => {
    if (!trashPath) {
      dispatch(setOpenFile(true));
      dispatch(setViewFileData(info));
    }
  };

  return (
    <div className="mt-4">
      <h3 className="pb-2 font-medium">Files</h3>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-3">
        {filesData.documents.map((file) => {
          const info =
            fileInfo && fileInfo.find((info) => info.$id === file.$id);
          return (
            <div
              key={file.$id}
              className="bg-secondary rounded-md hover:bg-gray-200 cursor-pointer"
              onDoubleClick={() => handleFileView(info!)}
            >
              <div className="flex justify-between items-center px-4 h-11">
                {info && (
                  <div className="flex items-center">
                    {info.mimeType.startsWith("image") && (
                      <span className="mr-2">
                        <Icon name="image" strokeWidth={1.5} />
                      </span>
                    )}
                    <span>
                      {info.name.length > 10
                        ? info.name.slice(0, 10) + "..."
                        : info.name}
                    </span>
                  </div>
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
