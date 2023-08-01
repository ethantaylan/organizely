import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import React from "react";

export interface MenuItemsProps {
  name: string;
  isDeleteBtn: boolean;
  isDoneBtn: boolean;
  onClick: () => void;
}

export interface MenuProps {
  items: MenuItemsProps[];
}

export const Menu: React.FC<MenuProps> = ({ items }) => {
  return (
    <div className="dropdown dropdown-left">
      <label
        tabIndex={0}
        className="mb-1 p-2 hover:bg-slate-800 bg-slate-900 btn border-none"
      >
        <EllipsisVerticalIcon className="w-5" />
      </label>
      <ul
        tabIndex={0}
        className="p-1 shadow menu dropdown-content z-[1] bg-slate-800 rounded-xl w-52"
      >
        {items.map((item, index) => (
          <li
            onClick={item.onClick}
            key={index}
            className={`${item.isDeleteBtn ? "text-red-600" : ""} ${
              item.isDoneBtn ? "text-green-600" : ""
            }`}
          >
            <a>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
