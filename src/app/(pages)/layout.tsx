"use client";

import Navbar from "@/components/Navbar";
import WithAuth from "@/components/WithAuth";
import React, { Suspense } from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        {children}
      </Suspense>
    </>
  );
};

export default WithAuth(PageLayout);
