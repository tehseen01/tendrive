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

const NewDropdown = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<"folder" | "file">("folder");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-60">
          <DropdownMenuGroup>
            <DialogTrigger asChild onClick={() => setType("folder")}>
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
            <DialogTrigger asChild onClick={() => setType("file")}>
              <DropdownMenuItem>
                <div className="flex">
                  <Icon name="folder-plus" className="mr-3 h-4 w-4" />
                  <span>New file</span>
                </div>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem>
              <Icon name="file-up" className="mr-3 h-4 w-4" />
              <span>Upload File</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="folder-up" className="mr-3 h-4 w-4" />
              <span>Upload Folder</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <NewFolderDialog type={type} setOpen={setOpen} />
    </Dialog>
  );
};

export default NewDropdown;
