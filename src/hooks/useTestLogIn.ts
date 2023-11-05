"use client";

import authService from "@/appwrite/auth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

const useTestLogIn = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleTestLogIn = useCallback(async () => {
    try {
      await authService.testUserLogIn();
      router.push("/drive");
    } catch (error: any) {
      console.error(error);
      toast({ description: error.message, variant: "destructive" });
    }
  }, [router, toast]);

  return handleTestLogIn;
};

export default useTestLogIn;
