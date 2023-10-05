"use client";

import React, { Suspense } from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<>Loading...</>}></Suspense>
      {children}
    </div>
  );
};

export default PageLayout;
