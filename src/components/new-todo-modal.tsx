import { StarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useGlobalDispatch } from "../context/context";
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
  favorites: string[];
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
  favorites,
}) => {
  const [isFavoritesUsers, setIsFavoritesUsers] =
    React.useState<boolean>(false);

  const dispatch = useGlobalDispatch();

  const handleFavoriteValue = (value: string) => {
    dispatch({
      type: "ADD_FAVORITE",
      payload: value,
    });
  };

  return (
    <React.Fragment>
      <dialog id="newTodoModal" className="modal">
        <form
          method="dialog"
          className="bg-slate-800 border border-slate-700 modal-box"
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
              className="input mb-5 w-full text-sm bg-slate-700"
            />

            <label htmlFor="todo" className="me-2">
              Description
            </label>
            <input
              onChange={onTodoDescriptionChange}
              type="text"
              placeholder=""
              className="input mb-5 w-full bg-slate-700"
            />

            <div className="flex w-full">
              <label htmlFor="todo" className="me-2">
                Share with
              </label>
            </div>
            <div className="flex w-full">
              <div className="items-center flex w-full">
                <input
                  disabled={isFavoritesUsers}
                  autoComplete="on"
                  value={sharedValue}
                  onChange={onTodoShareWithChange}
                  type="email"
                  placeholder=""
                  className="input w-full text-sm bg-slate-700"
                />
              </div>
              <button
                disabled={isFavoritesUsers}
                onClick={addShared}
                className="btn ms-4 btn-primary"
              >
                Share
              </button>
            </div>

            {!isFavoritesUsers && (
              <div className="flex mb-2 mt-5 w-full items-center justify-between">
                <span
                  onClick={() => setIsFavoritesUsers(true)}
                  className="cursor-pointer badge flex whitespace-nowrap border rounded-xl border-primary"
                >
                  Show favorite users{" "}
                  <StarIcon className="w-4 ms-1 text-warning" />
                </span>
              </div>
            )}

            {showAlert && (
              <p className="ms-1 mb-3 rounded text-red-600">
                Wrong adresse email format
              </p>
            )}

            {sharedEmails.map((shared) => (
              <p className="ms-1 text-secondary">{shared}</p>
            ))}

            <div className="flex mt-5">
              {isFavoritesUsers && (
                <select
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    handleFavoriteValue(event.target.value)
                  }
                  className="select bg-primary bg-opacity-10 border-primary w-full"
                >
                  <option>Select favorite user</option>
                  {favorites.map((fav) => (
                    <option
                      onClick={() => handleFavoriteValue(fav)}
                      value={fav}
                    >
                      {fav}
                    </option>
                  ))}
                </select>
              )}
              {isFavoritesUsers && (
                <span
                  onClick={() => setIsFavoritesUsers(false)}
                  className="btn ms-4 btn-primary"
                >
                  <XMarkIcon className="w-5" />
                </span>
              )}
            </div>

            <div className="flex w-full mt-5 items-center">
              <Switch
                value={switchValue}
                onChange={onTodoIsImportantChange}
                onClick={() => switchOnClick(!switchValue)}
              />
              <span
                className={`label-text ${
                  switchValue ? "text-secondary" : "text-slate-500"
                } font-bold`}
              >
                Important
              </span>
            </div>

            <div className="flex w-full justify-end">
              <button
                onClick={onClose}
                className="btn me-2 mt-10 btn-ghost text-white"
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
