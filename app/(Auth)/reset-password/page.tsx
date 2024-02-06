import ResetPassForm from "@/app/components/auth/ResetPassForm";
import Link from "next/link";
import React from "react";

const ResetPassPage = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
      <h4 className="mb-1 text-xl font-semibold text-blue-500 sm:text-5xl">
        Reset your password
      </h4>
      <div className="panel m-6 w-full max-w-lg sm:w-[480px] shadow-2xl">
        <ResetPassForm />
      </div>
    </div>
  );
};

export default ResetPassPage;