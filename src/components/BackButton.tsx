"use client";

import React from "react";
import { Button } from "./ui/button";
import Icon from "./Icon";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant={"ghost"}
      className="fixed top-6 md:left-6 left-4"
      onClick={() => router.back()}
    >
      <Icon name="chevron-left" /> Back
    </Button>
  );
};

export default BackButton;
