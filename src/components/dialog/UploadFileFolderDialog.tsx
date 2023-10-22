"use client";

import React, { useState } from "react";
import { DialogContent, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import storageService from "@/appwrite/storageService";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useToast } from "../ui/use-toast";
import Icon from "../Icon";
import { appendFile } from "@/redux/fileSlice";
import service from "@/appwrite/services";
import conf from "@/lib/conf";

type UploadFileFolderProp = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UploadFileFolderDialog = ({ setOpen }: UploadFileFolderProp) => {
  const params = useParams();
  const { folderId } = params;
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setLoading(true);
    try {
      if (user) {
        const bucketFile = await storageService.uploadFile({ file });
        if (bucketFile) {
          const uploadedFile = await service.createDoc({
            docId: bucketFile.$id,
            name: bucketFile.name,
            userId: user?.$id,
            parentId: folderId ? (folderId as string) : null,
            collectionId: conf.appwriteFileCollectionId,
          });

          dispatch(appendFile(uploadedFile));
          setOpen(false);
          toast({
            description: "File uploaded successfully",
            variant: "default",
          });
          setLoading(false);
        }
      }
    } catch (error: any) {
      setOpen(false);
      toast({ description: error.message, variant: "destructive" });
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <DialogContent>
      {loading ? (
        <div className="h-52 flex items-center justify-center flex-col">
          <span>
            <Icon
              name="arrow-down-to-line"
              className="animate-bounce"
              size={28}
            />
          </span>
          <span>Uploading...</span>
        </div>
      ) : (
        <>
          <div className="h-52 flex items-center justify-center flex-col">
            <span className="font-semibold">Drop file here</span>
            <span>or use the &apos;chose file&apos; button</span>
          </div>
          <DialogFooter>
            <Button asChild>
              <Label htmlFor="upload_file">
                Chose file
                <input
                  type="file"
                  name="upload_file"
                  id="upload_file"
                  className="hidden"
                  onChange={handleUpload}
                />
              </Label>
            </Button>
          </DialogFooter>
        </>
      )}
    </DialogContent>
  );
};

export default UploadFileFolderDialog;
