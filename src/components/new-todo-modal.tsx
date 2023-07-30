import React from "react";
import { Switch } from "./switch";

export interface NewTodoModalProps {
  onConfirm: () => void;
  onToDoNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTodoDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTodoIsImportantChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  switchValue: boolean;
  switchOnClick: (value: boolean) => void;
  onClose: () => void;
}

export const NewTodoModal: React.FC<NewTodoModalProps> = ({
  onConfirm,
  onToDoNameChange,
  onTodoDescriptionChange,
  onTodoIsImportantChange,
  switchValue,
  switchOnClick,
  onClose,
}) => {
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

          <div className="flex  flex-col">
            <label htmlFor="todo" className="me-2 text-sm">
              Nom
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
              className="input w-full bg-gray-800"
            />
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
                Retour
              </button>
              <button onClick={onConfirm} className="btn mt-10 btn-secondary">
                Ajouter
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </React.Fragment>
  );
};
