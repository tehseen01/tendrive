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
import { TFile, TFolder } from "@/lib/types";
import { useToast } from "./ui/use-toast";
import conf from "@/lib/conf";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { addFolderToBin, removeFolderFromBin } from "@/redux/folderSlice";
import DeleteForeverDialog from "./dialog/DeleteForeverDialog";
import service from "@/appwrite/services";
import { addFileToBin, removeFileFromBin } from "@/redux/fileSlice";
import ShareDialog from "./dialog/ShareDialog";
import { removeShareDoc } from "@/redux/commonSlice";

const FileFolderMoreOption = ({
  fileOrFolderData,
}: {
  fileOrFolderData: TFolder | TFile;
}) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"DELETE" | "RENAME" | "SHARE">();

  const { toast } = useToast();

  const { user } = useAppSelector((state) => state.user);

  const handleMoveToBin = async () => {
    try {
      if (fileOrFolderData.$collectionId === conf.appwriteFolderCollectionId) {
        const deletedFolder = await service.moveToBinDoc({
          docId: fileOrFolderData.$id,
          collectionId: conf.appwriteFolderCollectionId,
        });
        dispatch(addFolderToBin(deletedFolder));
        toast({
          description: "folder deleted successfully",
          variant: "default",
        });
      } else if (
        fileOrFolderData.$collectionId === conf.appwriteFileCollectionId
      ) {
        const deletedFile = await service.moveToBinDoc({
          docId: fileOrFolderData.$id,
          collectionId: conf.appwriteFileCollectionId,
        });
        dispatch(addFileToBin(deletedFile));
        toast({
          description: "File deleted successfully",
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
        const restoredFolder = await service.restoreDoc({
          docId: fileOrFolderData.$id,
          collectionId: conf.appwriteFolderCollectionId,
        });
        dispatch(removeFolderFromBin(restoredFolder));
      } else if (
        fileOrFolderData.$collectionId === conf.appwriteFileCollectionId
      ) {
        const restoredFile = await service.restoreDoc({
          docId: fileOrFolderData.$id,
          collectionId: conf.appwriteFileCollectionId,
        });
        dispatch(removeFileFromBin(restoredFile));
      }

      toast({
        description: "Document restored successfully",
        variant: "default",
      });
    } catch (error: any) {
      toast({ description: error.message, variant: "destructive" });
      console.log(error);
    }
  };

  const handleRemoveShareDoc = async () => {
    try {
      if (user) {
        await service.deleteShareDoc({
          userId: user.$id,
          docId: fileOrFolderData.$id,
        });
        dispatch(removeShareDoc(fileOrFolderData.$id));
        toast({
          description: "Document removed successfully",
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
              <DropdownMenuItem disabled={pathname === "/drive/share-with-me"}>
                <span className="mr-2">
                  <Icon name="pen-line" size={18} />
                </span>
                <span>Rename</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger asChild onClick={() => setDialogType("SHARE")}>
              <DropdownMenuItem>
                <span className="mr-2">
                  <Icon name="download" size={18} />
                </span>
                <span>Download</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger asChild onClick={() => setDialogType("SHARE")}>
              <DropdownMenuItem>
                <span className="mr-2">
                  <Icon name="share" size={18} />
                </span>
                <span>Share</span>
              </DropdownMenuItem>
            </DialogTrigger>
            {pathname === "/drive/share-with-me" ? (
              <DropdownMenuItem
                onClick={handleRemoveShareDoc}
                className="cursor-pointer"
              >
                <span className="mr-2">
                  <Icon name="trash" size={18} />
                </span>
                <span>Remove</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={handleMoveToBin}
                className="cursor-pointer"
              >
                <span className="mr-2">
                  <Icon name="trash" size={18} />
                </span>
                <span>Move to bin</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
      {dialogType === "DELETE" ? (
        <DeleteForeverDialog deleteData={fileOrFolderData} setOpen={setOpen} />
      ) : dialogType === "SHARE" ? (
        <ShareDialog shareData={fileOrFolderData} setOpen={setOpen} />
      ) : (
        <RenameDialog renameData={fileOrFolderData} setOpen={setOpen} />
      )}
    </Dialog>
  );
};

export default FileFolderMoreOption;
