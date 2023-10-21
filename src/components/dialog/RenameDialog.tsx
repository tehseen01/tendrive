"use client";

import React from "react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { TFolder } from "@/lib/types";
import folderService from "@/appwrite/folderService";
import { useToast } from "../ui/use-toast";
import { useAppDispatch } from "@/hooks/hooks";
import { updateFolder } from "@/redux/folderSlice";
import conf from "@/lib/conf";

type TFormState = {
  rename: string;
};

type TRenameDialogProp = {
  renameData: TFolder;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RenameDialog = ({ renameData, setOpen }: TRenameDialogProp) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<TFormState>({ defaultValues: { rename: renameData.name } });

  const handleRenameSubmit: SubmitHandler<TFormState> = async ({ rename }) => {
    try {
      if (renameData.$collectionId === conf.appwriteFolderCollectionId) {
        const renamedItem = await folderService.renameFolder({
          id: renameData.$id,
          name: rename,
        });

        if (renamedItem) {
          setOpen(false);
          toast({ description: "Renamed successfully", variant: "default" });
          dispatch(updateFolder(renamedItem));
        }
      }
    } catch (error: any) {
      toast({ description: error.message, variant: "destructive" });
      console.log(error);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Rename</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleRenameSubmit)} autoComplete="off">
        <Input
          {...register("rename", { required: "Folder can not be empty!" })}
          placeholder="Rename"
        />
        {errors.rename && (
          <p className="text-destructive font-semibold py-2">
            {errors.rename.message}
          </p>
        )}
        <DialogFooter className="mt-4">
          <Button type="submit" disabled={isSubmitting || !isValid || !isDirty}>
            {isSubmitting ? "Renaming.." : "Rename"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default RenameDialog;
