"use client";

import { TFolders } from "@/lib/types";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Icon from "./Icon";

const Folders = ({ data }: { data: TFolders }) => {
  const router = useRouter();

  const handleFolderClick = (folderId: string) => {
    router.push(`/drive/folder/${folderId}`);
  };

  return (
    <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-3">
      {data.documents.map((folder) => (
        <Button
          variant={"secondary"}
          key={folder.$id}
          size={"lg"}
          className="max-sm:w-full max-sm:h-32 max-sm:p-4 flex-wrap sm:px-4"
          onDoubleClick={() => handleFolderClick(folder.$id)}
          onTouchEnd={() => handleFolderClick(folder.$id)}
        >
          <span className="sm:mr-2 max-sm:w-full max-sm:h-16 block">
            <Icon
              name="folder"
              strokeWidth={1.5}
              className="w-full h-full max-sm:stroke-1"
            />
          </span>
          <span className="flex-1 text-left">{folder.name}</span>
          <div className="w-6 h-6 p-0 hover:bg-white rounded-md flex items-center justify-center">
            <Icon name="more-vertical" size={18} />
          </div>
        </Button>
      ))}
    </div>
  );
};

export default Folders;
