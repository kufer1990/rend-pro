import React, { useEffect, useState } from "react";
import { useUserStore } from "@/app/store/store";
import { useRouter } from "next/navigation";

const SidebarFooter = () => {
  const useUserStores = useUserStore(state => state);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const router = useRouter();

  useEffect(() => {
    setFirstName(useUserStores.firstName);
    setLastName(useUserStores.lastName);
  }, [useUserStores]);

  const handleLogout = () => {
    useUserStores.clearUserData();
    localStorage.setItem("accessToken", "");
    router.push("/");
  };

  return (
    <div className="flex items-center  md:w-36">
      <div className="rounded-full w-9 h-9 flex items-center justify-center bg-[url('/placeholder.png')] bg-contain bg-cente"></div>
      <div className="hidden md:block ml-5">
        <p className="text-customPocketDarkGray text-sm">
          {firstName} {lastName}
        </p>
        <p
          onClick={handleLogout}
          className="text-gray-600 text-xs cursor-pointer"
        >
          Log out
        </p>
      </div>
    </div>
  );
};

export default SidebarFooter;
