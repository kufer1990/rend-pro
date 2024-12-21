"use client";
import React from "react";
import PocketItem from "../../PocketItem/PocketItem";
const pocketsData = [
  {
    icon: "brak",
    name: "Home",
    count: 8,
    active: true,
  },
  {
    icon: "brak",
    name: "Work",
    count: 2,
    active: false,
  },
  {
    icon: "brak",
    name: "Personal",
    count: 5,
    active: false,
  },
  {
    icon: "brak",
    name: "Shopping",
    count: 3,
    active: false,
  },
  {
    icon: "brak",
    name: "Others",
    count: 1,
    active: false,
  },
];

const Home = () => {
  return (
    <div className="bg-customGray w-full h-screen py-2 px-2">
      <div className="w-[274px] h-full rounded-md bg-white py-10 px-6">
        <h1 className="text-2xl font-bold mb-8">Pockets</h1>
        {pocketsData.map(pocket => {
          return (
            <PocketItem
              key={pocket.name}
              icon={pocket.icon}
              name={pocket.name}
              count={pocket.count}
              active={pocket.active}
            />
          );
        })}
      </div>

      <div></div>
    </div>
  );
};

export default Home;
