import clsx from "clsx";
import React, { ReactNode } from "react";

type PocketItemProps = {
  icon: ReactNode;
  name: string;
  count: number;
  active: boolean;
};
const PocketItem = ({ icon, name, count, active }: PocketItemProps) => {
  return (
    <div
      className={clsx("flex justify-between py-1.5 px-2 cursor-pointer", {
        "bg-customPurple rounded-md": active,
      })}
    >
      <div className="flex items-center">
        <div className="text-md">{icon}</div>
        <div
          className={clsx("text-sm text-customPocketDarkGray ml-5", {
            "text-white": active,
          })}
        >
          {name}
        </div>
      </div>
      <div
        className={clsx(
          "py-1 px-2 bg-customGray rounded-md text-customCounterGray text-sm",
          {
            "text-white bg-customActivePurple": active,
          }
        )}
      >
        {count}
      </div>
    </div>
  );
};

export default PocketItem;
