import React, { useState } from "react";
import Modal from "react-modal";
import PocketCreateButton from "../PocketCreateButton/PocketCreateButton";
import PocketItem from "../PocketItem/PocketItem";

type PocketModalProps = {
  pocketsData: { _id: string; emoji: string; name: string; task: [] }[];
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void;
};
const PocketModal = ({
  modalIsOpen,
  setModalIsOpen,
  pocketsData,
}: PocketModalProps) => {
  const [isCreateNewPocket, setIsCreateNewPocket] = useState(false);
  console.log("🚀 ~ isCreateNewPocket:", isCreateNewPocket);

  return (
    <div>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
          setIsCreateNewPocket(false);
        }}
        className="fixed bottom-20 bg-white rounded-3xl shadow-lg pb-2 px-2 max-w-md mx-auto w-full"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="p-1 bg-customGray rounded-xl mt-3 mb-5 flex justify-between">
          <div className="flex items-center w-full">
            <input
              type="checkbox"
              className="appearance-none bg-white ml-2 h-6 w-7 rounded-md border cursor-pointer "
            />
            <input
              type="text"
              className="w-full ml-4 bg-customGray text-customPocketDarkGray text-sm font-medium placeholder-customTextPlaceholder focus:outline-none"
              placeholder="Create a new task"
            />
          </div>
          <button className="bg-[#E7E7E7] py-2 px-3 ml-2 text-sm rounded-md font-semibold text-customPocketDarkGray">
            Create
          </button>
        </div>
        {!isCreateNewPocket && (
          <p className="text-md text-customPocketDarkGray font-medium pl-2 mb-2">
            Select pocket
          </p>
        )}
        {!isCreateNewPocket &&
          pocketsData.map(pocket => {
            return (
              <PocketItem
                id={pocket._id}
                key={pocket.name}
                icon={pocket.emoji}
                name={pocket.name}
                count={pocket?.task?.length || 0}
                active={false}
                onClick={() => {}}
                isModal={true}
              />
            );
          })}

        <PocketCreateButton
          isInModal={true}
          onClick={() => {
            setIsCreateNewPocket(true);
          }}
        />
      </Modal>
    </div>
  );
};

export default PocketModal;
