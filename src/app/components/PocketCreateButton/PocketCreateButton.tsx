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
        "mt-5 cursor-pointer bg-customGray text-customTextPlaceholder rounded-3xl flex items-center font-medium text-sm w-8 h-8 md:w-full md:p-2 md:px-5 md:justify-start",
        {
          " justify-center": !isInModal,
          "mt-0 w-full justify-start p-2 px-5": isInModal,
        }
      )}
    >
      <span className="md:-ml-2">+</span>
      <button
        className={clsx("ml-5 md:block", {
          block: isInModal,
          hidden: !isInModal,
        })}
      >
        Create new pocket
      </button>
    </div>
  );
};

export default PocketCreateButton;
