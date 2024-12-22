"use client";
import React, { useEffect, useState } from "react";
import PocketItem from "../../PocketItem/PocketItem";
import WindowIcon from "../../../../../public/icon/WindowIcon";
import SidebarFooter from "./components/SidebarFooter";
import PocketCreateButton from "../../PocketCreateButton/PocketCreateButton";
import PocketModal from "../../PocketModal/PocketModal";
import axiosInstance from "../../../../../utils/InstanceAxios";
import { useUserStore } from "@/app/store/store";
import PersonalDataModal from "./components/PersonalDataModal";

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
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const setUserData = useUserStore(state => state.setUserData);

  const openModal = () => {
    setIsTaskModalOpen(true);
  };

  useEffect(() => {
    axiosInstance.get("/users/me").then(res => {
      setUserData({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
      });

      if (!res.data.firstName || !res.data.lastName) {
        setIsUserModalOpen(true);
      }
    });
  }, []);

  return (
    <div className="bg-customGray h-screen py-2 px-2">
      <div className="h-full rounded-md bg-white flex flex-col items-center justify-between md:items-start w-10 pt-5 pb-1 md:px-6 md:py-10 md:w-[274px] ">
        <div className="w-full flex flex-col items-center md:items-start">
          <h1 className="text-2xl font-bold mb-8 hidden md:block">Pockets</h1>
          <div className="cursor-pointer md:hidden flex justify-center items-center w-8 h-6 mb-6 rounded-md bg-customGray">
            <WindowIcon className="-rotate-90" />
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

          <PocketCreateButton onClick={openModal} />
        </div>
        <SidebarFooter />
      </div>

      <div>
        <PocketModal
          pocketsData={pocketsData}
          modalIsOpen={isTaskModalOpen}
          setModalIsOpen={setIsTaskModalOpen}
        />
      </div>
      <PersonalDataModal
        isUserModalOpen={isUserModalOpen}
        setIsUserModalOpen={setIsUserModalOpen}
      />
    </div>
  );
};

export default Home;
