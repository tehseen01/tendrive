"use client";

import React from "react";
import { TFolder } from "@/lib/types";
import conf from "@/lib/conf";
import { useToast } from "../ui/use-toast";
import { useAppDispatch } from "@/hooks/hooks";
import { removeFolderFromBin } from "@/redux/folderSlice";
import service from "@/appwrite/services";
import storageService from "@/appwrite/storageService";
import { removeFileFromBin } from "@/redux/fileSlice";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

type DeleteForeverDialogProp = {
  deleteData: TFolder;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteForeverDialog = ({
  deleteData,
  setOpen,
}: DeleteForeverDialogProp) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleDeleteForever = async () => {
    try {
      if (deleteData.$collectionId === conf.appwriteFolderCollectionId) {
        await service.deleteDocForever({
          docId: deleteData.$id,
          collectionId: conf.appwriteFolderCollectionId,
        });
        dispatch(removeFolderFromBin(deleteData));
      } else if (deleteData.$collectionId === conf.appwriteFileCollectionId) {
        await service.deleteDocForever({
          docId: deleteData.$id,
          collectionId: conf.appwriteFileCollectionId,
        });
        await storageService.deleteFile({ fileId: deleteData.$id });
        dispatch(removeFileFromBin(deleteData));
      }

      toast({
        description: "Document deleted forever",
        variant: "default",
      });
      setOpen(false);
    } catch (error: any) {
      toast({ description: error.message, variant: "destructive" });
      console.error(error);
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Forever?</AlertDialogTitle>
        <AlertDialogDescription>
          &apos;{deleteData.name}&apos; will be deleted forever and you
          won&apos;t be able to restore it.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteForever}>
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteForeverDialog;
