import Link from "next/link";
import React from "react";
import KeyIcon from "../../../../../public/icon/KeyIcon";
import PersonIcon from "../../../../../public/icon/PersonIcon";

const Login = () => {
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/4 pt-56">
        <p className="w-3/4 m-auto text-3xl font-bold mb-6">Login</p>
        <div className="flex flex-col justify-center items-center">
          <div className="relative w-3/4 mt-4 mb-3">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <PersonIcon />
            </div>
            <input
              type="text"
              id="email-address-icon"
              className="bg-gray-50 border border-customGray text-black text-md rounded-lg block w-full ps-10 p-2.5 placeholder-customTextPlaceholder  "
              placeholder="Username"
            />
          </div>
          <div className="relative w-3/4 mb-5">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <KeyIcon />
            </div>
            <input
              type="password"
              id="password-icon"
              className="bg-gray-50 border border-customGray text-black text-md rounded-lg block w-full ps-10 p-2.5 placeholder-customTextPlaceholder"
              placeholder="Password"
            />
          </div>

          <div className="w-3/4 flex justify-start">
            <button className="bg-customPurple border-buttonPurple rounded-md p-2 px-5 text-white">
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
      <div className="w-3/4 hidden md:block  bg-[url('/image1.jpg')] bg-coitain bg-center"></div>
    </div>
  );
};

export default Login;