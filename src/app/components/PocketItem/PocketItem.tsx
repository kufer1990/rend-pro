import clsx from "clsx";
import React, { ReactNode } from "react";
import emojiToolkit from "emoji-toolkit";

type PocketItemProps = {
  id: number;
  icon: ReactNode;
  name: string;
  count: number;
  active: boolean;
  onClick: (id: number) => void;
};
const PocketItem = ({
  id,
  icon,
  name,
  count,
  active,
  onClick,
}: PocketItemProps) => {
  return (
    <div
      className={clsx(
        "flex justify-between mb-2 py-1.5 px-2 cursor-pointer w-8 md:w-full ",
        {
          "bg-customPurple rounded-md": active,
        }
      )}
      onClick={() => {
        onClick(id);
      }}
    >
      <div className="flex items-center">
        <p
          className=""
          dangerouslySetInnerHTML={{
            __html: emojiToolkit
              .toImage(icon)
              .replace(
                "<img",
                '<img style="width:14px;height:14px;vertical-align:middle;"'
              ),
          }}
        />

        <div
          className={clsx(
            "text-sm text-customPocketDarkGray ml-5 font-medium hidden md:block",
            {
              "text-white": active,
            }
          )}
        >
          {name}
        </div>
      </div>
      <div
        className={clsx(
          "py-1 px-2 flex items-center rounded-md text-customCounterGray text-sm hidden md:block",
          {
            "bg-customGray": !active,
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
