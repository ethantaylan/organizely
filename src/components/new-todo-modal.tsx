import { StarIcon } from "@heroicons/react/24/solid";
import React, { useRef } from "react";
import { useGlobalContext, useGlobalDispatch } from "../context/context";
import { Switch } from "./switch";

export interface NewTodoModalProps {
  onConfirm: () => void;
  onToDoNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTodoDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTodoIsImportantChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTodoShareWithChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  switchValue: boolean;
  switchOnClick: (value: boolean) => void;
  onClose: () => void;
  addShared: () => void;
  sharedValue: string;
  sharedEmails: string[];
  showAlert: boolean;
  onShowFavs: () => void;
  favorites: string[];
  onClickAddValue: () => void;
}

export const NewTodoModal: React.FC<NewTodoModalProps> = ({
  onConfirm,
  onToDoNameChange,
  onTodoDescriptionChange,
  onTodoIsImportantChange,
  onTodoShareWithChange,
  switchValue,
  switchOnClick,
  onClose,
  addShared,
  sharedValue,
  sharedEmails,
  showAlert,
  onShowFavs,
  favorites,
}) => {
  const dispatch = useGlobalDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const favoriteValueRef = useRef<any>(null);

  const handleAddFavoriteValue = () => {
    dispatch({
      type: "ADD_FAVORITE",
      payload: favoriteValueRef.current.innerHTML,
    });
  };

  console.log(favoriteValueRef);
  

  const { favoriteValue } = useGlobalContext();

  return (
    <React.Fragment>
      <dialog id="newTodoModal" className="modal">
        <form
          method="dialog"
          className="bg-gray-900 border border-gray-700 modal-box"
        >
          <div className="flex mb-5 items-center">
            <span className="me-1">📝</span>
            <h1 className="font-bold text-white">New todo</h1>
          </div>

          <div className="flex flex-col">
            <label htmlFor="todo" className="me-2 text-sm">
              Todo
            </label>
            <input
              onChange={onToDoNameChange}
              type="text"
              placeholder=""
              className="input mb-5 w-full text-sm bg-gray-800"
            />

            <label htmlFor="todo" className="me-2">
              Description
            </label>
            <input
              onChange={onTodoDescriptionChange}
              type="text"
              placeholder=""
              className="input mb-5 w-full bg-gray-800"
            />

            <div className="flex w-full">
              <label htmlFor="todo" className="me-2">
                Share with
              </label>
            </div>

            <div className="flex w-full">
              <div className="items-center flex w-full">
                <input
                  autoComplete="on"
                  value={favoriteValue ? favoriteValue : sharedValue}
                  onChange={onTodoShareWithChange}
                  type="email"
                  placeholder=""
                  className="input w-full text-sm bg-gray-800"
                />
              </div>
              <span onClick={addShared} className="btn ms-4 btn-primary">
                Share
              </span>
            </div>

            <div className="dropdown whitespace-nowrap dropdown-bottom mt-5">
              <label
                tabIndex={0}
                className=" cursor-pointer flex badge mb-1 bg-opacity-25 badge-primary"
              >
                <span onClick={onShowFavs} className="me-2 text-slate-300">
                  Show favorite users
                </span>
                <StarIcon className="w-4 text-warning" />
              </label>
              <ul
                tabIndex={0}
                className="p-1 shadow menu dropdown-content z-[1] cursor-pointer bg-gray-800 rounded-xl w-52"
              >
                {favorites.map((fav) => (
                  <li
                    onClick={handleAddFavoriteValue}
                    ref={favoriteValueRef}
                    className="text-white flex items-center justify-center hover:text-secondary h-8"
                  >
                    {fav}
                  </li>
                ))}
              </ul>
            </div>

            {showAlert && (
              <p className="ms-1 mb-3 rounded text-red-600">
                Wrong adresse email format
              </p>
            )}

            {sharedEmails.map((shared) => (
              <p className="ms-1 text-secondary">{shared}</p>
            ))}

            <div className="flex w-full mt-5 items-center">
              <Switch
                value={switchValue}
                onChange={onTodoIsImportantChange}
                onClick={() => switchOnClick(!switchValue)}
              />
              <span
                className={`label-text ${
                  switchValue ? "text-secondary" : "text-gray-500"
                } font-bold`}
              >
                Important
              </span>
            </div>

            <div className="flex w-full justify-end">
              <button
                onClick={onClose}
                className="btn me-2 mt-10 text-white bg-gray-600 "
              >
                Cancel
              </button>
              <button onClick={onConfirm} className="btn mt-10 btn-secondary">
                Add todo
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </React.Fragment>
  );
};
