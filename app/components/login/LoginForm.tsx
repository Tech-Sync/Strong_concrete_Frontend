"use client";
import { login } from "@/actions/login";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const LoginForm = () => {
  const router = useRouter();

  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    login({ email, password })
      .then((data) => {
        if (data?.error) {
          setError(data.error);
        } else {
          router.push("/");
        }
      })
      .catch((error) => {
        setError("An error occurred");
      });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          className="form-input"
          placeholder="Enter Email"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="form-input"
          placeholder="Enter Password"
        />
      </div>
      <div>
        <label className="cursor-pointer">
          <input type="checkbox" className="form-checkbox" />
          <span className="text-white-dark">Remember me</span>
        </label>
      </div>
      <button type="submit" className="btn btn-primary w-full">
        SIGN IN
      </button>
      {error && (
        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
          {error}
        </div>
      )}
    </form>
  );
};

export default LoginForm;
