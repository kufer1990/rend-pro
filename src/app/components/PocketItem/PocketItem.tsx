import clsx from "clsx";
import React, { ReactNode } from "react";
import emojiToolkit from "emoji-toolkit";

type PocketItemProps = {
  id: string;
  icon: ReactNode;
  name: string;
  count: number;
  active: boolean;
  onClick: (id: string) => void;
  isModal?: boolean;
  isExpanded?: boolean;
};
const PocketItem = ({
  id,
  icon,
  name,
  count,
  active,
  onClick,
  isModal,
  isExpanded = false,
}: PocketItemProps) => {
  return (
    <div
      className={clsx(
        "flex justify-between mb-2 py-1.5 px-2 cursor-pointer w-8 md:w-full ",
        {
          "bg-customPurple rounded-md": active,
          "w-full": isModal || isExpanded,
        }
      )}
      onClick={() => {
        onClick(id);
      }}
    >
      <div className="flex items-center">
        <p
          className="py-0.5"
          dangerouslySetInnerHTML={{
            __html: emojiToolkit
              .toImage(icon)
              .replace(
                "<img",
                '<img style="width:16px;height:16px;vertical-align:middle; max-width:none"'
              ),
          }}
        />

        <div
          className={clsx(
            "text-sm text-customPocketDarkGray ml-5 font-medium md:block",
            {
              "text-white": active,
              hidden: !isModal && !isExpanded,
              block: isModal || isExpanded,
            }
          )}
        >
          {name}
        </div>
      </div>
      <div
        className={clsx(
          "py-1 px-2 items-center rounded-md text-customCounterGray text-sm md:block",
          {
            "bg-customGray": !active,
            "text-white bg-customActivePurple": active,
            hidden: !isModal && !isExpanded,
            block: isModal || isExpanded,
          }
        )}
      >
        {count}
      </div>
    </div>
  );
};

export default PocketItem;
