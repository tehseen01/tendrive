import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { TFolder } from "@/lib/types";
import conf from "@/lib/conf";
import folderService from "@/appwrite/folderService";
import { useToast } from "../ui/use-toast";
import { useAppDispatch } from "@/hooks/hooks";
import { removeFolderFromBin } from "@/redux/folderSlice";

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
        await folderService.deleteFolderForever({
          folderId: deleteData.$id,
        });
        dispatch(removeFolderFromBin(deleteData));
        toast({
          description: "Folder deleted forever",
          variant: "default",
        });
      }
      setOpen(false);
    } catch (error: any) {
      toast({ description: error.message, variant: "destructive" });
      console.error(error);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Forever?</DialogTitle>
        <DialogDescription>
          &apos;{deleteData.name}&apos; will be deleted forever and you
          won&apos;t be able to restore it.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={handleDeleteForever}>Delete</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteForeverDialog;
