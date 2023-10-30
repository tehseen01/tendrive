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
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to Logout</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => handleLogout()}>Logout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Logout;
