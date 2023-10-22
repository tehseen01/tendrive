"use client";

import { TFolders } from "@/lib/types";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Icon from "./Icon";
import FileFolderMoreOption from "./FileFolderMoreOption";
import { isMobile } from "react-device-detect";

const Folders = ({ data }: { data: TFolders }) => {
  const router = useRouter();

  const handleFolderClick = (folderId: string) => {
    router.push(`/drive/folder/${folderId}`);
  };

  return (
    <div>
      <h3 className="font-medium pb-2">Folders</h3>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-3">
        {data.documents.map((folder) => (
          <Button
            variant={"secondary"}
            key={folder.$id}
            size={"lg"}
            className="max-sm:w-full max-sm:h-32 max-sm:p-4 flex-wrap sm:px-4"
            onDoubleClick={() => {
              if (!isMobile) handleFolderClick(folder.$id);
            }}
            onClick={() => {
              if (isMobile) handleFolderClick(folder.$id);
            }}
          >
            <span className="sm:mr-2 max-sm:w-full max-sm:h-16 block">
              <Icon
                name="folder"
                strokeWidth={1.5}
                className="w-full h-full max-sm:stroke-1"
              />
            </span>
            <span className="flex-1 text-left">{folder.name}</span>
            <FileFolderMoreOption fileOrFolderData={folder} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Folders;
