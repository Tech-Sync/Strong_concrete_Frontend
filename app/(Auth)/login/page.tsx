
import BlankLayout from "@/app/components/Layout/BlankLayout";
import LoginForm from "@/app/(Auth)/_components/LoginForm";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "User Login", description: "User Login" };

const Login = () => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden min-h-screen w-1/2 flex-col  items-center  bg-[url(/assets/images/strongConcreteCover.jpg)] bg-no-repeat bg-cover p-4 bg-center text-white dark:text-black lg:flex">
        {/* <div className="mx-auto mb-5 w-full">
          <Image
            height={370}
            width={500}
            src="/assets/images/strongConcreteCover.jpg"
            alt="coming_soon"
            className="mx-auto lg:max-w-[370px] xl:max-w-[500px]"
          />
        </div> */}
        {/* <h3 className="mb-4 text-center text-3xl text-black font-bold">
          Strong concrete is the best Concrete supplier In Zambia
        </h3> */}
        {/* <p>
          It is easy to setup with great customer experience. Start your 7-day
          free trial
        </p> */}
      </div>
      <div className="relative flex w-full items-center justify-center lg:w-1/2">

        <div className="w-[500px] p-5 md:p-10">
          <Image
            height={130}
            width={130}
            src="/assets/images/logo.png"
            alt="coming_soon"
            className="mx-auto pb-5"
          />
          <h2 className="mb-3 text-3xl font-bold">Sign In</h2>
          {/* <p className="mb-7">Enter your email and password to login</p> */}
          <LoginForm />

         {/*  <p className=" mt-5 text-center">
            Dont&apos;t have an account ?
            <Link
              href="/register"
              className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1"
            >
              Sign Up
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  );
};

Login.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>;
};
export default Login;
