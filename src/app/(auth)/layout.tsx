import React, { Suspense } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Suspense fallback={<>Loading...</>}>{children}</Suspense>
    </>
  );
};

export default AuthLayout;
