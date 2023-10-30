"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import { DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { TFile, TFolder, TUser } from "@/lib/types";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useToast } from "../ui/use-toast";
import useDebounce from "@/hooks/useDebounce";
import service from "@/appwrite/services";
import { setSearchUser, setSelectedUser } from "@/redux/userSlice";
import UserCard from "../UserCard";

type ShareDialogProp = {
  shareData: TFolder | TFile;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const ShareDialog = ({ shareData, setOpen }: ShareDialogProp) => {
  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue, 500);

  const dispatch = useAppDispatch();

  const { toast } = useToast();
  const { user, searchUser, selectedUser } = useAppSelector(
    (state) => state.user
  );

  const handleSend = async () => {
    try {
      if (user && selectedUser) {
        const shareDoc = await service.createShareDoc({
          docId: shareData.$id,
          shareWithId: selectedUser.$id,
        });
        if (shareDoc) {
          setOpen(false);
          dispatch(setSelectedUser(null));
          toast({
            title: "Done",
            description: `Document share with '${selectedUser.name}'`,
            variant: "default",
          });
        }
      }
    } catch (error: any) {
      toast({ description: error.message, variant: "destructive" });
      console.log(error);
    }
  };

  useEffect(() => {
    async function searchUser() {
      try {
        const user = await service.searchUser(debounceValue);

        dispatch(setSearchUser(user));
      } catch (error) {
        console.log(error);
      }
    }
    searchUser();
  }, [debounceValue, dispatch]);

  return (
    <DialogContent>
      <DialogHeader>
        <h4 className="text-lg font-medium">
          Share &quot;
          {shareData.name.length > 15
            ? shareData.name.slice(0, 15) + "..."
            : shareData.name}
          &quot;
        </h4>
      </DialogHeader>
      <div className="relative">
        <Input
          placeholder="Add people"
          name="people"
          id="people"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchUser !== null && searchUser.total > 0 && (
          <div className="absolute bg-secondary left-0 mt-1 w-full shadow-xl">
            {searchUser.total !== 0 &&
              searchUser.documents.map((user) => (
                <UserCard type="SEARCH" user={user} key={user.$id} />
              ))}
          </div>
        )}
      </div>
      <p>People with access</p>
      {user && <UserCard type="OWNER" user={user} />}
      {selectedUser !== null && (
        <>
          <p>Selected User</p>
          <UserCard type="SELECTED" user={selectedUser} />
        </>
      )}
      <DialogFooter>
        <Button onClick={handleSend}>Send</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ShareDialog;
