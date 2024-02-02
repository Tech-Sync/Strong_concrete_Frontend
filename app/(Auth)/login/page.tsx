/* eslint-disable @next/next/no-img-element */

import BlankLayout from "@/app/components/Layout/BlankLayout";
import LoginForm from "@/app/components/login/LoginForm";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden min-h-screen w-1/2 flex-col  items-center justify-center bg-gradient-to-t from-[#ff1361bf] to-[#44107A] p-4 text-white dark:text-black lg:flex">
        <div className="mx-auto mb-5 w-full">
          <img
            src="/assets/images/auth-cover.svg"
            alt="coming_soon"
            className="mx-auto lg:max-w-[370px] xl:max-w-[500px]"
          />
        </div>
        <h3 className="mb-4 text-center text-3xl font-bold">
          Join the community of expert developers
        </h3>
        <p>
          It is easy to setup with great customer experience. Start your 7-day
          free trial
        </p>
      </div>
      <div className="relative flex w-full items-center justify-center lg:w-1/2">
        <div className="max-w-[480px] p-5 md:p-10">
          <h2 className="mb-3 text-3xl font-bold">Sign In</h2>
          <p className="mb-7">Enter your email and password to login</p>
          <LoginForm />

          <p className=" mt-5 text-center">
            Dont&apos;t have an account ?
            <Link
              href="/register"
              className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
Login.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>;
};
export default Login;
