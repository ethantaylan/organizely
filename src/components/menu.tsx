import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import React from "react";

export interface MenuItemsProps {
  name: string;
  isDeleteBtn: boolean;
  isDoneBtn: boolean;
}

export interface MenuProps {
  items: MenuItemsProps[];
}

export const Menu: React.FC<MenuProps> = ({ items }) => {
  return (
    <details className="dropdown">
      <summary className="mb-1 p-2 btn bg-slate-600 border-none">
        <EllipsisVerticalIcon className="w-5" />
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {items.map((item) => (
          <li
            className={`${item.isDeleteBtn ? "text-red-600" : ""} ${
              item.isDoneBtn ? "text-green-600" : ""
            }`}
          >
            <a>{item.name}</a>
          </li>
        ))}
      </ul>
    </details>
  );
};
