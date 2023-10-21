"use client";

import React, { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Icon from "./Icon";
import RenameDialog from "./dialog/RenameDialog";
import { BinType, TFolder } from "@/lib/types";
import { useToast } from "./ui/use-toast";
import conf from "@/lib/conf";
import folderService from "@/appwrite/folderService";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/hooks/hooks";
import { addFolderToBin, removeFolderFromBin } from "@/redux/folderSlice";
import DeleteForeverDialog from "./dialog/DeleteForeverDialog";

const FileFolderMoreOption = ({
  fileOrFolderData,
}: {
  fileOrFolderData: TFolder;
}) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"DELETE" | "RENAME">();

  const { toast } = useToast();

  const handleMoveToBin = async (data: TFolder) => {
    try {
      if (data.$collectionId === conf.appwriteFolderCollectionId) {
        const deletedFolder = await folderService.moveToBinFolder({
          folderId: data.$id,
        });
        dispatch(addFolderToBin(deletedFolder));
        toast({
          description: "folder deleted successfully",
          variant: "default",
        });
      }
    } catch (error: any) {
      toast({ description: error.message, variant: "destructive" });
      console.log(error);
    }
  };

  const handleRestoreFromBin = async () => {
    try {
      if (fileOrFolderData.$collectionId === conf.appwriteFolderCollectionId) {
        const restoredFolder = await folderService.restoreFolder({
          folderId: fileOrFolderData.$id,
        });
        dispatch(removeFolderFromBin(restoredFolder));
        toast({
          description: "folder restored successfully",
          variant: "default",
        });
      }
    } catch (error: any) {
      toast({ description: error.message, variant: "destructive" });
      console.log(error);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-6 h-6 p-0 hover:bg-white rounded-md flex items-center justify-center">
            <Icon name="more-vertical" size={18} />
          </div>
        </DropdownMenuTrigger>
        {pathname === "/drive/trash" ? (
          <DropdownMenuContent className="w-60">
            <DropdownMenuItem onClick={handleRestoreFromBin}>
              <span className="mr-2">
                <Icon name="history" size={18} />
              </span>
              <span>Restore</span>
            </DropdownMenuItem>
            <DialogTrigger asChild onClick={() => setDialogType("DELETE")}>
              <DropdownMenuItem>
                <span className="mr-2">
                  <Icon name="trash" size={18} />
                </span>
                <span>Delete forever</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent className="w-60">
            <DialogTrigger asChild onClick={() => setDialogType("RENAME")}>
              <DropdownMenuItem>
                <span className="mr-2">
                  <Icon name="pen-line" size={18} />
                </span>
                <span>Rename</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem>
              <span className="mr-2">
                <Icon name="share" size={18} />
              </span>
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleMoveToBin(fileOrFolderData)}
              className="cursor-pointer"
            >
              <span className="mr-2">
                <Icon name="trash" size={18} />
              </span>
              <span>Move to bin</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
      {dialogType === "DELETE" ? (
        <DeleteForeverDialog deleteData={fileOrFolderData} setOpen={setOpen} />
      ) : (
        <RenameDialog renameData={fileOrFolderData} setOpen={setOpen} />
      )}
    </Dialog>
  );
};

export default FileFolderMoreOption;
