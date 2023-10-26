"use client";

import React, { useEffect, useState } from "react";
import { DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { TFile, TFolder } from "@/lib/types";
import { Input } from "../ui/input";
import { useAppSelector } from "@/hooks/hooks";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useToast } from "../ui/use-toast";

const ShareDialog = ({ shareData }: { shareData: TFolder | TFile }) => {
  const [searchValue, setSearchValue] = useState("");

  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const time = setTimeout(() => {}, 1000);

    return () => {
      clearTimeout(time);
    };
  }, []);

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
      <Input
        placeholder="Add people"
        name="people"
        id="people"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <p>People with access</p>
      <div className="flex gap-2 items-center hover:bg-gray-200 p-2">
        <Avatar>
          <AvatarFallback>
            <span className="font-bold text-2xl">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="font-medium text-sm">{user?.name} (You)</h2>
          <p className="text-xs">{user?.email}</p>
        </div>
        <span className="text-xs">Owner</span>
      </div>
      <DialogFooter>
        <Button>Done</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ShareDialog;
