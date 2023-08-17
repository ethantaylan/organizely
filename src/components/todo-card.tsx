import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItemsProps } from "./generic-components/menu";

export interface TodoCardProps {
  name: string;
  isImportant: boolean;
  description?: string;
  isShared: boolean;
  sharedPeoples?: string;
  todoId: number;
  onClick: () => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({
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
          <div style={{ maxWidth: "90%" }} className="flex w-full">
            <div className="flex-col max-w-full">
              <h2 className="font-semibold text-slate-200">
                {name}
                {isImportant && (
                  <span className="badge badge-sm whitespace-nowrap bg-blue-600 text-slate-300 ms-2">
                    Important
                  </span>
                )}
              </h2>
              <p
                className={` ${
                  description
                    ? "not-italic text-slate-400"
                    : "italic text-slate-500"
                } text-sm mt-2 break-words`}
              >
                {description ? description : "No description"}
              </p>
            </div>
          </div>

          <Menu items={menuItems} />
        </div>
        {isShared && (
          <div
            style={{ fontSize: 11 }}
            className="mt-4 flex-col flex font-semibold text-sm text-yellow-500"
          >
            <p>Shared by:</p>
            <p>{sharedPeoples}</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
