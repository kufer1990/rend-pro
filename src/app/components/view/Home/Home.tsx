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
import { toast } from "react-toastify";

type Pocket = {
  _id: string;
  emoji: string;
  name: string;
  task: [];
};

const Home = () => {
  const [selectedPocket, setSelectedPocket] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [pockets, setIsPockets] = useState<Pocket[]>([]);

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

    axiosInstance
      .get("/pockets")
      .then(res => {
        setIsPockets(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleCreatePocket = () => {
    axiosInstance
      .post("/pockets", {
        name: "test12",
        emoji: ":house:",
      })
      .then(res => {
        setIsPockets([...pockets, res.data]);
      })
      .catch(err => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div className="bg-customGray h-[100dvh] py-2 px-2">
      <button className="hidden" onClick={handleCreatePocket}>
        test button
      </button>
      <div className="h-full rounded-md bg-white flex flex-col items-center justify-between md:items-start w-10 pt-5 pb-1 md:px-6 md:py-10 md:w-[274px] ">
        <div className="w-full flex flex-col items-center md:items-start">
          <h1 className="text-2xl font-bold mb-8 hidden md:block">Pockets</h1>
          <div className="cursor-pointer md:hidden flex justify-center items-center w-8 h-6 mb-6 rounded-md bg-customGray">
            <WindowIcon className="-rotate-90" />
          </div>
          {pockets?.map(pocket => {
            return (
              <PocketItem
                id={pocket._id}
                key={pocket._id}
                icon={pocket.emoji}
                name={pocket.name}
                count={pocket?.task?.length || 0}
                active={selectedPocket === pocket._id}
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
          pocketsData={pockets}
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
