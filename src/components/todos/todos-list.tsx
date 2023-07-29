import React from "react";
import { Menu, MenuItemsProps } from "../menu";

export interface TodosProps {
  name: string;
  isImportant: boolean;
  description: string;
}

export const TodosList: React.FC<TodosProps> = ({
  name,
  isImportant,
  description,
}) => {
  const menuItems: MenuItemsProps[] = [
    {
      name: "Tâche accompli",
      isDeleteBtn: false,
      isDoneBtn: true,
    },
    {
      name: "Mettre à jour",
      isDeleteBtn: false,
      isDoneBtn: false,
    },
    {
      name: "Supprimer",
      isDeleteBtn: true,
      isDoneBtn: false,
    },
  ];

  return (
    <React.Fragment>
      <div className="bg-gray-900 my-4 p-4 rounded text-primary-content">
        <div className="flex justify-between items-center w-full">
          <div>
            <div className="flex items-center">
              <h2 className="font-bold text-white">{name}</h2>
              {isImportant && (
                <h2 className="badge bg-slate-700 p-3 ms-4">Important !</h2>
              )}
            </div>
            <h3 className="text-slate-300 text-sm mt-2">{description}</h3>
          </div>
          <Menu items={menuItems} />
        </div>
      </div>
    </React.Fragment>
  );
};
