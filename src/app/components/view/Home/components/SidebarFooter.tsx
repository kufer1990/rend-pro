import React from "react";

const SidebarFooter = () => {
  return (
    <div className="flex items-center justify-between md:w-36">
      <div className="rounded-full w-9 h-9 flex items-center justify-center bg-[url('/placeholder.png')] bg-contain bg-cente"></div>
      <div className="hidden md:block">
        <p className="text-customPocketDarkGray text-sm">Claudia Doumit</p>
        <p className="text-gray-600 text-xs cursor-pointer">Log out</p>
      </div>
    </div>
  );
};

export default SidebarFooter;
