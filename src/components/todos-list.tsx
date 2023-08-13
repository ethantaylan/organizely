import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItemsProps } from "./menu";

export interface TodosProps {
  name: string;
  isImportant: boolean;
  description?: string;
  isShared: boolean;
  sharedPeoples?: string[];
  todoId: number;
  onClick: () => void;
  onEdit: () => void;
}

export const TodosList: React.FC<TodosProps> = ({
  name,
  isImportant,
  description,
  isShared,
  sharedPeoples,
  todoId,
  onClick,
}) => {
  const navigate = useNavigate();

  const menuItems: MenuItemsProps[] = [
    // {
    //   name: "Done",
    //   isDeleteBtn: false,
    //   isDoneBtn: false,
    //   onClick: onClick,
    // },
    {
      name: "Edit",
      isDeleteBtn: false,
      isDoneBtn: false,
      onClick: () => navigate(`/tasks/${todoId}`),
    },
    {
      name: "Delete",
      isDeleteBtn: true,
      isDoneBtn: false,
      onClick: onClick,
    },
  ];

  return (
    <React.Fragment>
      <div className="relative bg-slate-900 my-4 p-4 py-4 rounded-xl text-primary-content">
        <div className="flex justify-between items-center w-full">
          <div style={{ maxWidth: "90%" }}  className="flex w-full">
            <div className="flex-col max-w-full">
              <h2 className="font-semibold text-slate-200">
                {name}
                {isImportant && (
                  <h2 className="badge whitespace-nowrap bg-blue-600 text-white p-3 ms-4">
                    Important
                  </h2>
                )}
              </h2>
              {description && (
                <p
                  style={{}}
                  className="text-slate-400 text-sm mt-2 break-words"
                >
                  {description}
                </p>
              )}
            </div>
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
