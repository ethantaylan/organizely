import { PlusIcon } from "@heroicons/react/24/solid";
import React from "react";

export interface NewTodoSelectProps {
  selectValue: string;
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  favorites: string[];
  onAddEmailToArray: () => void;
}

export const NewTodoSelect: React.FC<NewTodoSelectProps> = ({
  selectValue,
  onSelectChange,
  favorites,
  onAddEmailToArray,
}) => {
  return (
    <div className="flex mt-5">
      <select
        value={selectValue}
        onChange={onSelectChange}
        className="select bg-primary bg-opacity-10 border-primary w-full"
      >
        <option>Select favorite user</option>
        {favorites.map((fav) => (
          <option key={fav} value={fav}>
            {fav}
          </option>
        ))}
      </select>

      <span onClick={onAddEmailToArray} className="btn ms-4 btn-primary">
        <PlusIcon className="w-5" />
      </span>
    </div>
  );
};
