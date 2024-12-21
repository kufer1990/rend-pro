import clsx from "clsx";
import React from "react";

type PocketCreateButtonProps = {
  onClick?: () => void | undefined;
  isInModal?: boolean;
};

const PocketCreateButton = ({
  onClick,
  isInModal = false,
}: PocketCreateButtonProps) => {
  return (
    <div
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className={clsx(
        "mt-5 cursor-pointer bg-customGray text-customTextPlaceholder rounded-3xl flex justify-center items-center font-medium text-sm w-8 h-8 md:w-full md:p-2 md:px-5 md:justify-start",
        {
          "mt-0": isInModal,
        }
      )}
    >
      <span className="md:-ml-2">+</span>
      <button className="ml-5 hidden md:block">Create new pocket</button>
    </div>
  );
};

export default PocketCreateButton;
