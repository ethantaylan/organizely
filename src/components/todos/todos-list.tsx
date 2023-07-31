import React from "react";
import { Menu, MenuItemsProps } from "../menu";

export interface TodosProps {
  name: string;
  isImportant: boolean;
  description: string;
  onClick: () => void;
  isShared: boolean;
  sharedPeoples?: string[];
}

export const TodosList: React.FC<TodosProps> = ({
  name,
  isImportant,
  description,
  onClick,
  isShared,
  sharedPeoples,
}) => {
  const menuItems: MenuItemsProps[] = [
    {
      name: "Done",
      isDeleteBtn: false,
      isDoneBtn: false,
      onClick: onClick,
    },
    {
      name: "Edit",
      isDeleteBtn: false,
      isDoneBtn: false,
      onClick: onClick,
    },
    {
      name: "Remove",
      isDeleteBtn: true,
      isDoneBtn: false,
      onClick: onClick,
    },
  ];

  return (
    <React.Fragment>
      <div className="bg-gray-900 my-4 p-4 rounded-xl text-primary-content">
        <div className="flex justify-between items-center w-full">
          <div className="flex w-full items-center">
            <div className="flex-col">
              <h2 className="font-semibold text-slate-200">{name}</h2>
              {description && (
                <h3 className="text-slate-400 text-sm mt-2">{description}</h3>
              )}
            </div>
            {isImportant && (
              <h2 className="badge whitespace-nowrap bg-blue-600 text-white p-3 ms-4">
                Important
              </h2>
            )}
          </div>

          <Menu items={menuItems} />
          {isShared && (
            <span
              style={{ fontSize: 11 }}
              className="mt-4 flex font-semibold text-sm text-yellow-500"
            >
              Todo author:
              <br /> {sharedPeoples}
            </span>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
