"use client";
import Link from "next/link";
import React, { useState } from "react";
import KeyIcon from "../../../../../public/icon/KeyIcon";
import PersonIcon from "../../../../../public/icon/PersonIcon";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!login || !password) {
      toast.error("Please fill all fields");
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
        login: login,
        password: password,
      })
      .then(res => {
        console.log(res);
        router.push("/home");
      })
      .catch(err => {
        toast.error(
          err?.response?.data?.message || "Incorrect login or password"
        );
      });
  };

  return (
    <div className="flex h-screen">
      <div className="pt-56 w-full md:w-1/4">
        <p className="w-3/4 m-auto text-3xl font-bold mb-6">Login</p>
        <div className="flex flex-col justify-center items-center">
          <div className="relative w-3/4 mt-4 mb-3">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <PersonIcon />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-customGray text-black text-md rounded-lg block w-full ps-10 p-2.5 placeholder-customTextPlaceholder"
              placeholder="Username"
              onChange={e => setLogin(e.target.value)}
            />
          </div>
          <div className="relative w-3/4 mb-5">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <KeyIcon />
            </div>
            <input
              type="password"
              className="bg-gray-50 border border-customGray text-black text-md rounded-lg block w-full ps-10 p-2.5 placeholder-customTextPlaceholder"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="w-3/4 flex justify-start">
            <button
              onClick={handleLogin}
              className="bg-customPurple border-buttonPurple rounded-md p-2 px-5 text-white"
            >
              Login me
            </button>
          </div>
        </div>
        <p className="w-3/4 m-auto mt-5">
          {"Don't have account? "}
          <Link href="/register" className="text-customPurple">
            Register now
          </Link>
        </p>
      </div>
      <div className="w-3/4 bg-[url('/image1.jpg')] bg-coitain bg-center hidden md:block"></div>
    </div>
  );
};

export default Login;
