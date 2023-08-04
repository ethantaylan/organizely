import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItemsProps } from "./menu";

export interface TodosProps {
  name: string;
  isImportant: boolean;
  description?: string;
  onClick: () => void;
  isShared: boolean;
  sharedPeoples?: string[];
  todoId: number;
}

export const TodosList: React.FC<TodosProps> = ({
  name,
  isImportant,
  description,
  onClick,
  isShared,
  sharedPeoples,
  todoId,
}) => {
  const navigate = useNavigate();

  const menuItems: MenuItemsProps[] = [
    // {
    //   name: "Done",
    //   isDeleteBtn: false,
    //   isDoneBtn: false,
    //   onClick: onClick,
    // },
    // {
    //   name: "Edit",
    //   isDeleteBtn: false,
    //   isDoneBtn: false,
    //   onClick: onClick,
    // },
    {
      name: "Remove",
      isDeleteBtn: true,
      isDoneBtn: false,
      onClick: onClick,
    },
  ];

  return (
    <React.Fragment>
      <div
        // onClick={() => navigate(`/tasks/${todoId}`)}
        className="bg-slate-900 hover:scale-105 cursor-pointer my-4 p-4 rounded-xl text-primary-content"
      >
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
        </div>
        {isShared && (
          <span
            style={{ fontSize: 11 }}
            className="mt-4 flex font-semibold text-sm text-yellow-500"
          >
            Shared by:
            {sharedPeoples}
          </span>
        )}
      </div>
    </React.Fragment>
  );
};
