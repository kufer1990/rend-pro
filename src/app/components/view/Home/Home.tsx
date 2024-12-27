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
import { ClipLoader } from "react-spinners";
import emojiToolkit from "emoji-toolkit";
import TaskItem from "../../TaskItem/TaskItem";
import TastCreateButton from "../../TastCreateButton/TastCreateButton";

type Pocket = {
  _id: string;
  emoji: string;
  name: string;
  tasks: string[];
};

type Task = {
  _id: string;
  description: string;
  isCompleted: boolean;
  pocket: string;
  user: string;
};

const Home = () => {
  const [selectedPocketId, setSelectedPocketId] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [pockets, setIsPockets] = useState<Pocket[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refetch, setIsRefetch] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const setUserData = useUserStore(state => state.setUserData);
  const selectedPocket = pockets.find(
    pocket => pocket._id === selectedPocketId
  );

  const openModal = () => {
    setIsTaskModalOpen(true);
  };

  useEffect(() => {
    handleUserData();
    handlePockets();
  }, [refetch]);

  const handleUserData = () => {
    axiosInstance.get("/users/me").then(res => {
      setUserData({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
      });

      if (!res.data.firstName || !res.data.lastName) {
        setIsUserModalOpen(true);
      }
    });
  };

  const handlePockets = () => {
    axiosInstance
      .get("/pockets")
      .then(res => {
        setIsPockets(res.data);
        setSelectedPocketId(selectedPocketId || res.data[0]._id);
        handleTasks(selectedPocketId || res.data[0]._id);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const handleTasks = (pocketId: string) => {
    axiosInstance
      .get(`/pockets/${pocketId}/tasks`)
      .then(res => {
        const tasks = res.data.sort((a: Task, b: Task) => {
          return a.isCompleted === b.isCompleted ? 0 : b.isCompleted ? 1 : -1;
        });
        setTasks(tasks);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const handleCreatePocket = (
    inputContent: string,
    selectedEmoji: string,
    handleClear: () => void
  ) => {
    if (!inputContent || !selectedEmoji) {
      toast.error("Please fill all fields");
      return;
    }

    axiosInstance
      .post("/pockets", {
        name: inputContent,
        emoji: selectedEmoji,
      })
      .then(res => {
        toast.success("Pockets created successfully");
        setIsPockets([...pockets, res.data]);
        setIsTaskModalOpen(false);
        handleClear();
      })
      .catch(err => {
        toast.error(err.response.data.message);
      });
  };

  const handleCreateTast = (
    inputTaskContent: string,
    selectedPocketId: string,
    handleClear: () => void
  ) => {
    if (!inputTaskContent.length) {
      toast.error("Please enter task content");
      return;
    }

    axiosInstance
      .post(`/pockets/${selectedPocketId}/tasks`, {
        description: inputTaskContent,
        completed: false,
      })
      .then(() => {
        toast.success("Task created successfully");
        setIsRefetch(!refetch);
        setIsTaskModalOpen(false);
        handleClear();
      })
      .catch(err => {
        toast.error(err.response.data.message);
      });
  };

  const handleDeletePocket = () => {
    axiosInstance.delete("/pockets/676892fce125a33b7e678f0b");
  };

  const handlePocketItem = (id: string) => {
    setSelectedPocketId(id);
    handleTasks(id);
  };

  const handleUpdateTask = (taskId: string) => {
    axiosInstance
      .put(`/pockets/${selectedPocketId}/tasks/${taskId}`, {
        isCompleted: true,
      })
      .then(() => {
        toast.success("Task has been completed");
        setIsRefetch(!refetch);
      })
      .catch(() => {
        toast.error("Task has not been completed");
      });
  };

  const handleDeletedTask = (taskId: string) => {
    axiosInstance
      .delete(`/pockets/${selectedPocketId}/tasks/${taskId}`)
      .then(() => {
        toast.success("Task has been deleted");
        setIsRefetch(!refetch);
      })
      .catch(() => {
        toast.error("Task has not been deleted");
      });
  };

  return (
    <>
      <div className="flex">
        {/* sidebar */}
        <div className="bg-customGray h-[100dvh] py-2 px-2">
          <button className="hidden" onClick={handleDeletePocket}>
            delete button
          </button>
          <div className="h-full rounded-md bg-white flex flex-col items-center justify-between md:items-start w-10 pt-5 pb-1 md:px-6 md:py-10 md:w-[274px] ">
            <div className="w-full flex flex-col items-center md:items-start">
              <h1 className="text-2xl font-bold mb-8 hidden md:block">
                Pockets
              </h1>
              <div className="cursor-pointer md:hidden flex justify-center items-center w-8 h-6 mb-8 mt-10 rounded-md bg-customGray">
                <WindowIcon className="-rotate-90" />
              </div>
              {pockets?.map(pocket => {
                return (
                  <PocketItem
                    id={pocket._id}
                    key={pocket._id}
                    icon={pocket.emoji}
                    name={pocket.name}
                    count={pocket?.tasks?.length || 0}
                    active={selectedPocketId === pocket._id}
                    onClick={handlePocketItem}
                  />
                );
              })}

              <PocketCreateButton onClick={openModal} />
            </div>
            <SidebarFooter />
          </div>
        </div>
        {/* main */}

        <div className="bg-customGray w-full pt-10 px-4 md:p-10">
          {selectedPocket ? (
            <>
              <div className="flex mb-16 flex-col md:flex-row  md:justify-between md:items-center">
                <div>
                  <div className="flex items-center">
                    <p
                      className="py-0.5"
                      dangerouslySetInnerHTML={{
                        __html: emojiToolkit
                          .toImage(selectedPocket?.emoji)
                          .replace(
                            "<img",
                            '<img style="width:24px;height:24px;vertical-align:middle; max-width:none"'
                          ),
                      }}
                    />
                    <p className="ml-2 text-customPocketDarkGray text-2xl font-bold">
                      {selectedPocket?.name}
                    </p>
                  </div>
                  <p className="text-customCounterGray mt-2">
                    Remaining {tasks.filter(el => el.isCompleted).length} from{" "}
                    {tasks.length} tasks
                  </p>
                </div>

                <button
                  onClick={() => {
                    setShowCompleted(!showCompleted);
                  }}
                  className="bg-white  px-3 text-sm rounded-md font-semibold text-customPocketDarkGray py-3 md:py-2 mt-8 md:mt-0 md:ml-2"
                >
                  {showCompleted ? "Show completed" : "Hide completed"}
                </button>
              </div>

              {tasks.map(task => {
                if (task.isCompleted && showCompleted) {
                  return null;
                }
                return (
                  <div key={task._id} className="my-2">
                    <TaskItem
                      key={task._id}
                      id={task._id}
                      description={task.description}
                      handleUpdateTask={handleUpdateTask}
                      handleDeletedTask={handleDeletedTask}
                      isCompleted={task.isCompleted}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex justify-center items-center h-[100vh]">
              <ClipLoader size={80} color="#4076EE" />{" "}
              <span className="text-3xl ml-3">Loading...</span>
            </div>
          )}
        </div>
      </div>

      <PocketModal
        pocketsData={pockets}
        modalIsOpen={isTaskModalOpen}
        setModalIsOpen={setIsTaskModalOpen}
        handleCreatePocket={handleCreatePocket}
        handleCreateTast={handleCreateTast}
        initialSelectedPocket={selectedPocketId}
      />

      <PersonalDataModal
        isUserModalOpen={isUserModalOpen}
        setIsUserModalOpen={setIsUserModalOpen}
      />

      <TastCreateButton isTaskModalOpen={isTaskModalOpen} onClick={openModal} />
    </>
  );
};

export default Home;
