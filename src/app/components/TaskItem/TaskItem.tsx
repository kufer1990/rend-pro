import React, { useState } from "react";
import ElipsisVerticalIcon from "../../../../public/icon/ElipsisVerticalIcon";
import clsx from "clsx";

const TaskItem = ({
  id,
  description = "",
  isCompleted,
  handleUpdateTask,
  handleDeletedTask,
}: {
  id: string;
  description: string;
  isCompleted: boolean;
  handleUpdateTask: (id: string) => void;
  handleDeletedTask: (id: string) => void;
}) => {
  const [isShowOptions, setIsShowOptions] = useState(false);

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsShowOptions(false);
  };
  return (
    <div
      className={clsx(
        "w-full rounded-md flex items-center justify-between p-2",
        {
          "bg-white": !isCompleted,
          "bg-customPurple": isCompleted,
        }
      )}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          className={clsx(
            "appearance-none  ml-2 h-6 w-6 rounded-md border cursor-pointer",
            {
              "bg-white": !isCompleted,
              "bg-customDisabledPurple border-customPurple": isCompleted,
            }
          )}
        />
        <p
          className={clsx("text-sm ml-2", {
            "text-white line-through": isCompleted,
          })}
        >
          {description}
        </p>
      </div>

      <div
        onClick={() => {
          setIsShowOptions(true);
        }}
        className="relative inline-block text-left"
      >
        {" "}
        <div
          onClick={e => {
            if (isShowOptions) handleClose(e);
          }}
          className={clsx(
            " w-8 h-8 rounded-md flex justify-center items-center cursor-pointer",
            {
              "bg-customGray": !isCompleted,
              "bg-customActivePurple": isCompleted,
            }
          )}
        >
          {!isShowOptions ? (
            <ElipsisVerticalIcon
              className={clsx({
                "text-white": isCompleted,
              })}
            />
          ) : (
            <div
              className={clsx({
                "text-white": isCompleted,
              })}
            >
              X
            </div>
          )}
        </div>
        {isShowOptions && (
          <div
            className={clsx(
              "origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10",
              {
                "bg-white": !isCompleted,
                "bg-customActivePurple": isCompleted,
              }
            )}
          >
            <div className="py-1 flex flex-col items-start p-3">
              {!isCompleted && (
                <button
                  name="finish"
                  disabled={isCompleted}
                  onClick={e => {
                    handleClose(e);
                    handleUpdateTask(id);
                  }}
                  className="w-full text-start my-1 p-2 rounded-md hover:bg-customGray"
                >
                  Finish
                </button>
              )}
              <button
                onClick={e => {
                  handleClose(e);
                  handleDeletedTask(id);
                }}
                className={clsx(
                  "w-full text-start my-1 p-2 rounded-md hover:bg-customGray",
                  {
                    "text-white hover:bg-customDisabledPurple": isCompleted,
                  }
                )}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
