"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useAppDispatch } from "@/hooks/hooks";
import { setSearchUser, setSelectedUser } from "@/redux/userSlice";
import { TUser } from "@/lib/types";

type UserCardProp = {
  type: "OWNER" | "SEARCH" | "SELECTED";
  user: TUser;
};

const UserCard = ({ type, user }: UserCardProp) => {
  const dispatch = useAppDispatch();

  const handleUserCardClick = () => {
    if (type === "SEARCH") {
      dispatch(setSelectedUser(user));
      dispatch(setSearchUser(null));
    }
  };

  return (
    <div
      className="flex gap-2 items-center hover:bg-gray-200 p-2"
      onClick={handleUserCardClick}
    >
      <Avatar>
        {user.profile && <AvatarImage src={user.profile} />}
        <AvatarFallback>
          <span className="font-bold text-2xl">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h2 className="font-medium text-sm">
          {user.name} {type === "OWNER" && "(You)"}
        </h2>
        <p className="text-xs">{user.email}</p>
      </div>
      {type === "OWNER" ? (
        <span className="text-xs">Owner</span>
      ) : (
        <Select defaultValue="VIEWER" disabled>
          <SelectTrigger className="w-[unset]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="VIEWER">VIEWER</SelectItem>
            <SelectItem value="EDITOR">EDITOR</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default UserCard;
