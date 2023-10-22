"use client";

import React from "react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { appendFolder } from "@/redux/folderSlice";
import { useParams } from "next/navigation";
import service from "@/appwrite/services";
import { ID } from "appwrite";
import conf from "@/lib/conf";

type TInput = {
  folder: string;
};

type TNewFolderDialogProp = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewFolderDialog = ({ setOpen }: TNewFolderDialogProp) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const params = useParams();
  const { folderId } = params;

  const { user } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors, isValid },
  } = useForm<TInput>();

  const handleFolderSubmit: SubmitHandler<TInput> = async (data) => {
    try {
      if (user) {
        const newFolder = await service.createDoc({
          name: data.folder,
          userId: user?.$id,
          parentId: folderId ? (folderId as string) : null,
          docId: ID.unique(),
          collectionId: conf.appwriteFolderCollectionId,
        });
        reset();
        if (newFolder) {
          toast({
            description: "folder created successfully",
            variant: "default",
          });
          setOpen(false);
          dispatch(appendFolder(newFolder));
        }
      }
    } catch (error: any) {
      console.log(error);
      toast({ variant: "destructive", description: error.message });
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New Folder</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleFolderSubmit)} autoComplete="off">
        <Input
          {...register("folder", { required: "Folder can not be empty!" })}
          placeholder="New folder"
        />
        {errors.folder && (
          <p className="text-destructive font-semibold py-2">
            {errors.folder.message}
          </p>
        )}
        <DialogFooter className="mt-4">
          <Button type="submit" disabled={isSubmitting || !isValid || !isDirty}>
            {isSubmitting ? "Creating.." : "Create"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default NewFolderDialog;
