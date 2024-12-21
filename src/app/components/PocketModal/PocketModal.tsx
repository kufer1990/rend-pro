import React from "react";
import Modal from "react-modal";
import PocketCreateButton from "../PocketCreateButton/PocketCreateButton";
import PocketItem from "../PocketItem/PocketItem";

type PocketModalProps = {
  pocketsData: { id: number; icon: string; name: string; count: number }[];
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void;
};
const PocketModal = ({
  modalIsOpen,
  setModalIsOpen,
  pocketsData,
}: PocketModalProps) => {
  return (
    <div>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed bottom-20 bg-white rounded-3xl shadow-lg pb-2 px-2 max-w-md mx-auto mt-20 w-full md:w-[400px]"
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
        <p className="text-md text-customPocketDarkGray font-medium pl-2">
          Select pocket
        </p>
        {pocketsData.map(pocket => {
          return (
            <PocketItem
              id={pocket.id}
              key={pocket.name}
              icon={pocket.icon}
              name={pocket.name}
              count={pocket.count}
              active={false}
              onClick={() => {}}
            />
          );
        })}

        <PocketCreateButton isInModal={true} />
      </Modal>
    </div>
  );
};

export default PocketModal;
