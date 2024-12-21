"use client";
import React, { useState } from "react";
import PocketItem from "../../PocketItem/PocketItem";
import WindowIcon from "../../../../../public/icon/WindowIcon";

const pocketsData = [
  {
    id: 1,
    icon: ":house:",
    name: "Home",
    count: 8,
  },
  {
    id: 2,
    icon: ":broccoli:",
    name: "Diet",
    count: 2,
  },
  {
    id: 3,
    icon: ":books:",
    name: "List of books",
    count: 5,
  },
  {
    id: 4,
    icon: ":automobile:",
    name: "Road trip list",
    count: 3,
  },
  {
    id: 5,
    icon: ":briefcase:",
    name: "Work",
    count: 1,
  },
];

const Home = () => {
  const [selectedPocket, setSelectedPocket] = useState(1);

  return (
    <div className="bg-customGray h-screen py-2 px-2">
      <div className="h-full rounded-md bg-white  flex flex-col items-center justify-between md:items-start  w-10 pt-10 pb-1 md:px-6 md:py-10 md:w-[274px] ">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-8 hidden md:block">Pockets</h1>
          <div className="md:hidden flex justify-center items-center w-8 h-6 mb-8 rounded-md bg-customGray">
            <WindowIcon />
          </div>
          {pocketsData.map(pocket => {
            return (
              <PocketItem
                id={pocket.id}
                key={pocket.name}
                icon={pocket.icon}
                name={pocket.name}
                count={pocket.count}
                active={selectedPocket === pocket.id}
                onClick={setSelectedPocket}
              />
            );
          })}
          <div className="mt-5 cursor-pointer bg-customGray text-customPocketDarkGray rounded-3xl flex justify-center items-center font-medium text-sm w-8 h-8 md:w-full md:p-2 md:px-5 md:justify-start ">
            <span className="">+</span>
            <button className="ml-2 hidden md:block">Create new pocket</button>
          </div>
        </div>
        <div className="flex items-center justify-between md:w-36">
          <div className="rounded-full w-9 h-9 flex items-center justify-center bg-[url('/placeholder.png')] bg-contain bg-cente"></div>
          <div className="hidden md:block">
            <p className="text-customPocketDarkGray text-sm">Claudia Doumit</p>
            <p className="text-gray-600 text-xs cursor-pointer">Log out</p>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Home;
