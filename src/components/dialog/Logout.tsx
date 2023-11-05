"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import authService from "@/appwrite/auth";
import { useAppDispatch } from "@/hooks/hooks";
import { resetUser } from "@/redux/userSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const Logout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(resetUser());
      setOpen(false);
      router.push("/");
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
      console.log(error);
    }
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to Logout</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleLogout()}>
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Logout;
