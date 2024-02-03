import AuthLoader from "@/app/components/verifyLoader/AuthLoader";
import React from "react";

const VerifyEmailPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
      <div className="p-5 text-center font-semibold">
        <AuthLoader />
      </div>
    </div>
  );
};

export default VerifyEmailPage;
