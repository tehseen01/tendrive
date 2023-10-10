import CurrentUser from "@/components/CurrentUser";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import React, { Suspense } from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Providers>
        <CurrentUser />
        <Navbar />
        <Suspense fallback={<>Loading...</>}>{children}</Suspense>
      </Providers>
    </>
  );
};

export default PageLayout;