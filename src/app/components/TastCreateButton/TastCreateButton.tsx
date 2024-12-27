import clsx from "clsx";
import React from "react";
import ChevronUpIcon from "../../../../public/icon/ChevronUpIcon";

type TastCreateButtonProps = {
  onClick?: () => void | undefined;
  isTaskModalOpen: boolean;
};

const TastCreateButton = ({
  onClick,
  isTaskModalOpen,
}: TastCreateButtonProps) => {
  return (
    <div
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className={clsx(
        "fixed bottom-5 left-1/2 transform -translate-x-1/2 cursor-pointer flex items-center text-white rounded-3xl px-2 py-2 z-10 w-[90%] sm:w-[448px]",
        {
          "bg-[#3D3D3D]": !isTaskModalOpen,
          "bg-customPurple": isTaskModalOpen,
        }
      )}
    >
      <span
        className={clsx("mx-2", {
          "rotate-180": isTaskModalOpen,
        })}
      >
        <ChevronUpIcon />
      </span>
      <button className={clsx("")}>Create new Task</button>
    </div>
  );
};

export default TastCreateButton;
