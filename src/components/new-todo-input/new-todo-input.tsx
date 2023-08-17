import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

export interface NewTodoInputProps {
  inputValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onResetInput: () => void;
  label: string;
  withAddMoreButton?: boolean;
  onAddArray?: () => void;
}

export const NewTodoInput: React.FC<NewTodoInputProps> = ({
  inputValue,
  onChange,
  onResetInput,
  label,
  withAddMoreButton,
  onAddArray,
}) => {
  return (
    <React.Fragment>
      <label htmlFor="todo" className="me-2 text-sm">
        {label}
      </label>
      <div className="mb-5 flex items-center">
        <input
          value={inputValue}
          onChange={onChange}
          type="text"
          placeholder=""
          className="input relative w-full text-sm bg-slate-700"
        />
        <span
          onClick={onResetInput}
          className={`absolute  cursor-pointer ${
            withAddMoreButton ? "right-28" : "right-10"
          }`}
        >
          <XMarkIcon className="w-5 text-slate-500" />
        </span>
        {withAddMoreButton && (
          <button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              onAddArray && onAddArray();
              onResetInput();
            }}
            className="btn ms-4 btn-primary"
          >
            <PlusIcon className="w-5" />
          </button>
        )}
      </div>
    </React.Fragment>
  );
};
