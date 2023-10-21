"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Icon from "./Icon";
import NewFolderDialog from "./dialog/NewFolderDialog";
import { Dialog, DialogTrigger } from "./ui/dialog";
import UploadFileFolderDialog from "./dialog/UploadFileFolderDialog";

const NewDropdown = ({ children }: { children: React.ReactNode }) => {
  const [dialogType, setDialogType] = useState<"folder" | "file" | "upload">(
    "folder"
  );
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-60">
          <DropdownMenuGroup>
            <DialogTrigger asChild onClick={() => setDialogType("folder")}>
              <DropdownMenuItem>
                <div className="flex">
                  <Icon name="folder-plus" className="mr-3 h-4 w-4" />
                  <span>New folder</span>
                </div>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DialogTrigger asChild onClick={() => setDialogType("file")}>
              <DropdownMenuItem>
                <div className="flex">
                  <Icon name="folder-plus" className="mr-3 h-4 w-4" />
                  <span>New file</span>
                </div>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger asChild onClick={() => setDialogType("upload")}>
              <DropdownMenuItem>
                <Icon name="file-up" className="mr-3 h-4 w-4" />
                <span>Upload File</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem>
              <Icon name="folder-up" className="mr-3 h-4 w-4" />
              <span>Upload Folder</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {dialogType === "folder" ? (
        <NewFolderDialog setOpen={setOpen} />
      ) : dialogType === "upload" ? (
        <UploadFileFolderDialog setOpen={setOpen} />
      ) : null}
    </Dialog>
  );
};

export default NewDropdown;
