import React from "react";

const PocketCreateButton = () => {
  return (
    <div className="mt-5 cursor-pointer bg-customGray text-customPocketDarkGray rounded-3xl flex justify-center items-center font-medium text-sm w-8 h-8 md:w-full md:p-2 md:px-5 md:justify-start ">
      <span className="md:-ml-2">+</span>
      <button className="ml-5 hidden md:block">Create new pocket</button>
    </div>
  );
};

export default PocketCreateButton;
