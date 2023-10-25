import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import React, { Suspense } from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Providers>
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
      </Providers>
    </>
  );
};

export default PageLayout;
