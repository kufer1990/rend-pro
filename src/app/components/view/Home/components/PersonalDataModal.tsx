import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import axiosInstance from "../../../../../../utils/InstanceAxios";
import { useUserStore } from "@/app/store/store";

type PersonalDataModalProps = {
  isUserModalOpen: boolean;
  setIsUserModalOpen: (isUserModalOpen: boolean) => void;
};
const PersonalDataModal = ({
  isUserModalOpen,
  setIsUserModalOpen,
}: PersonalDataModalProps) => {
  const userStore = useUserStore(state => state);
  console.log("🚀 ~ userStore:", userStore);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    setFirstName(userStore.firstName);
    setLastName(userStore.lastName);
  }, [userStore]);

  const disabled = false;

  const handleSubmit = () => {
    if (disabled) {
      toast.error("Please fill all fields");
      return;
    }

    axiosInstance
      .put("/users/update", {
        firstName: firstName,
        lastName: lastName,
      })
      .then(() => {
        userStore.setUserData({ firstName: firstName, lastName: lastName });
        toast.success("User data updated successfully");
        setIsUserModalOpen(false);
      })
      .catch(err => {
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  };
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isUserModalOpen}
      className=" bg-white rounded-3xl w-full mx-5 p-5 md:w-[586px]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h1 className="text-2xl font-medim text-black">Almost there!</h1>
      <p className="text-sm mb-4">We just need more information...</p>
      <input
        className="mb-2 bg-customGray w-full rounded-md px-3 py-2.5 placeholder:text-customTextPlaceholder placeholder:font-medium"
        type="text"
        value={firstName}
        placeholder="First name"
        onChange={e => setFirstName(e.target.value)}
      />
      <input
        className="mb-2 bg-customGray w-full rounded-md py-3 px-2.5 placeholder:text-customTextPlaceholder placeholder:font-medium"
        value={lastName}
        type="text"
        placeholder="Last name"
        onChange={e => setLastName(e.target.value)}
      />
      <div className="flex  items-center mb-2">
        <button className="bg-customGray w-full rounded-md pl-3 py-2.5 text-start text-customTextPlaceholder font-medium">
          Click to upload your avatar
        </button>
        <div className="w-10 h-10 ml-2 bg-[#d9d9d9] rounded-full"></div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={disabled}
        className={clsx(" text-white py-2.5 px-4 rounded-md mt-2", {
          "bg-customDisabledPurple": disabled,
          "bg-customPurple": !disabled,
        })}
      >
        {disabled ? "Complete information" : "Let's start!"}
      </button>
    </Modal>
  );
};

export default PersonalDataModal;
