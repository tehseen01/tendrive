"use client";

import React from "react";
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

const Logout = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/");
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
      console.log(error);
    }
  };

  return (
    <Dialog>
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
