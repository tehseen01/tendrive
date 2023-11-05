"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import service from "@/appwrite/services";
import { useToast } from "../ui/use-toast";
import { setBinFiles } from "@/redux/fileSlice";
import { setBinFolders } from "@/redux/folderSlice";

const EmptyBin = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleEmptyBin = async () => {
    try {
      if (user) {
        await service.emptyBin(user.$id);
        dispatch(setBinFiles(null));
        dispatch(setBinFolders(null));
        toast({ description: "Bin empty successful!", variant: "default" });
      }
    } catch (error: any) {
      console.log(error);
      toast({ description: error.message, variant: "destructive" });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete forever?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete and
            remove all your files and folders data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleEmptyBin}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EmptyBin;
