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
    <details className="dropdown dropdown-left">
      <summary className="mb-1 p-2 hover:bg-gray-800 bg-gray-900 btn border-none">
        <EllipsisVerticalIcon className="w-5" />
      </summary>
      <ul className="p-1 shadow menu dropdown-content z-[1] bg-gray-800 rounded w-52">
        {items.map((item, index) => (
          <li
            key={index}
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
