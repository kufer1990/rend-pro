import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import PocketCreateButton from "../PocketCreateButton/PocketCreateButton";
import PocketItem from "../PocketItem/PocketItem";
import emojiToolkit from "emoji-toolkit";
import clsx from "clsx";
import ArrowIcon from "../../../../public/icon/ArrowIcon";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "motion/react";

type PocketModalProps = {
  pocketsData: { _id: string; emoji: string; name: string; tasks: string[] }[];
  modalIsOpen: boolean;
  initialSelectedPocket: string;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  handleCreateTast: (
    inputTaskContent: string,
    pocketId: string,
    handleCreateTast: () => void
  ) => void;
  handleCreatePocket: (
    inputPocketContent: string,
    selectedEmoji: string,
    handleClear: () => void
  ) => void;
};
const PocketModal = ({
  pocketsData,
  modalIsOpen,
  initialSelectedPocket,
  setModalIsOpen,
  handleCreateTast,
  handleCreatePocket,
}: PocketModalProps) => {
  //modal mode - view
  const [isCreateNewPocket, setIsCreateNewPocket] = useState(false);

  //selected pocket
  const [selectedPocket, setSelectedPocket] = useState<string | null>(null);

  //emoji list and variants
  const myCategories = ["people", "nature", "food", "objects"];
  const [categoriesList, setCategoriesList] = useState<string[]>([]);

  //selected of emoji
  const [selectedCategoryEmoji, setSelectedCategoryEmoji] = useState<string>(
    myCategories[0]
  );
  const [selectedEmoji, setSelectedEmoji] = useState<string>(":smile:");

  const [inputPocketContent, setInputPocketContent] = useState<string>("");
  const [inputTaskContent, setInputTaskContent] = useState<string>("");

  useEffect(() => {
    setSelectedPocket(initialSelectedPocket);
  }, [initialSelectedPocket]);

  const handleClear = () => {
    setIsCreateNewPocket(false);
    setSelectedCategoryEmoji(myCategories[0]);
    setInputPocketContent("");
    setSelectedEmoji(":smile:");
    setInputTaskContent("");
  };

  const initialCategories = () => {
    const categories = new Set(
      Object.values(emojiToolkit.emojiList)
        .filter(emoji =>
          myCategories.some(category => emoji.category === category)
        )
        .map(emoji => emoji.category)
    );
    setCategoriesList(Array.from(categories));
  };

  const emojiList = useMemo(() => {
    return Object.entries(emojiToolkit.emojiList)
      .filter(([, emoji]) => emoji.category === selectedCategoryEmoji)
      .map(([key]) => key)
      .reverse()
      .slice(0, 110);
  }, [selectedCategoryEmoji]);

  return (
    <div>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
          setIsCreateNewPocket(false);
        }}
        onAfterClose={handleClear}
        className="fixed bottom-20 bg-white rounded-3xl shadow-lg pb-2 px-2 max-w-md mx-auto w-[90%] overflow-hidden"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {!isCreateNewPocket && (
            <motion.div
              key="defaultMode"
              className="relative"
              initial={{ y: "100%", opacity: 0, height: 0 }}
              animate={{ y: 0, opacity: 1, height: "auto" }}
              exit={{ y: "0", opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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
                    value={inputTaskContent}
                    onChange={e => setInputTaskContent(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => {
                    if (!selectedPocket) {
                      toast.error("Please select pocket");
                      return;
                    }
                    handleCreateTast(
                      inputTaskContent,
                      selectedPocket,
                      handleClear
                    );
                  }}
                  className="bg-[#E7E7E7] py-2 px-3 ml-2 text-sm rounded-md font-semibold text-customPocketDarkGray"
                >
                  Create
                </button>
              </div>

              <p className="text-md text-customPocketDarkGray font-medium pl-2 mb-2">
                Select pocket
              </p>
              <div className="overflow-y-auto max-h-[340px]">
                {pocketsData.map(pocket => {
                  return (
                    <PocketItem
                      id={pocket._id}
                      key={pocket.name}
                      icon={pocket.emoji}
                      name={pocket.name}
                      count={pocket?.tasks?.length || 0}
                      active={selectedPocket === pocket._id}
                      onClick={() => setSelectedPocket(pocket._id)}
                      isModal={true}
                    />
                  );
                })}
              </div>
              <PocketCreateButton
                isInModal={true}
                onClick={() => {
                  setIsCreateNewPocket(true);
                  initialCategories();
                }}
              />
            </motion.div>
          )}

          {isCreateNewPocket && (
            <motion.div
              key="createPocketMode"
              initial={{ y: "100%", opacity: 0, height: 0 }}
              animate={{ y: 0, opacity: 1, height: "auto" }}
              exit={{ y: "0", opacity: 0, height: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <div
                onClick={handleClear}
                className="text-customPurple cursor-pointer flex px-4 mt-4"
              >
                <ArrowIcon className="mr-2" /> Go Back
              </div>
              <div className="p-1 bg-customGray rounded-xl mt-3 mb-5 flex justify-between">
                <div className="flex items-center w-full">
                  <div
                    className="p-1"
                    dangerouslySetInnerHTML={{
                      __html: emojiToolkit
                        .toImage(selectedEmoji)
                        .replace(
                          "<img",
                          '<img style="width:30px;height:30px;vertical-align:middle; max-width:none"'
                        ),
                    }}
                  />
                  <input
                    maxLength={19}
                    type="text"
                    className="w-full ml-4 bg-customGray text-customPocketDarkGray text-sm font-medium placeholder-customTextPlaceholder focus:outline-none"
                    placeholder="Create a new pocket"
                    value={inputPocketContent}
                    onChange={e => setInputPocketContent(e.target.value)}
                  />
                </div>
                <button
                  onClick={() =>
                    handleCreatePocket(
                      inputPocketContent,
                      selectedEmoji,
                      handleClear
                    )
                  }
                  className="bg-[#E7E7E7] py-2 px-3 ml-2 text-sm rounded-md font-semibold text-customPocketDarkGray"
                >
                  Create
                </button>
              </div>
              <p className="text-md text-customPocketDarkGray font-medium pl-2 mb-2">
                Select emoji
              </p>
              <div>
                <div className="flex justify-around w-full bg-customGray rounded-xl overflow-hidden">
                  {categoriesList &&
                    categoriesList?.map((el, index) => (
                      <div
                        key={index}
                        className={clsx(
                          "w-full h-full text-sm py-2 text-center text-customTextPlaceholder  font-medium capitalize cursor-pointer",
                          {
                            "bg-customPurple text-white":
                              selectedCategoryEmoji === el,
                          }
                        )}
                        onClick={() => {
                          setSelectedCategoryEmoji(el);
                        }}
                      >
                        {el}
                      </div>
                    ))}
                </div>

                <div className="flex flex-wrap justify-around w-full mt-2 overflow-hidden max-h-[340px]">
                  {emojiList.map((emoji, index) => {
                    return (
                      <div
                        key={index}
                        onClick={e => {
                          setSelectedEmoji((e.target as HTMLElement).title);
                        }}
                        className="p-1 cursor-pointer"
                        dangerouslySetInnerHTML={{
                          __html: emojiToolkit
                            .toImage(emoji)
                            .replace(
                              "<img",
                              '<img style="width:30px;height:30px;vertical-align:middle; max-width:none"'
                            ),
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </div>
  );
};

export default PocketModal;
