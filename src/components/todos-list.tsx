import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface TodosProps {
  name: string;
  isImportant: boolean;
  description?: string;
  isShared: boolean;
  sharedPeoples?: string[];
  todoId: number;
  onClick: () => void;
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

  return (
    <React.Fragment>
      <div className="relative bg-slate-900 hover:scale-105 cursor-pointer my-4 p-4 py-6 rounded-xl text-primary-content">
        <div className="flex justify-between items-center w-full">
          <div
            onClick={() => navigate(`/tasks/${todoId}`)}
            className="flex w-full "
          >
            <div className="flex-col">
              <h2 className="font-semibold text-slate-200">
                {name}
                {isImportant && (
                  <h2 className="badge whitespace-nowrap bg-blue-600 text-slate-300 p-3 ms-4">
                    Important
                  </h2>
                )}
              </h2>
              {description && (
                <h3 className="text-slate-400 text-sm mt-2">{description}</h3>
              )}
            </div>
          </div>
          <button
            onClick={onClick}
            className="btn absolute right-5 bg-slate-800 hover:bg-slate-700"
          >
            <XCircleIcon className="w-6 text-red-500" />
          </button>
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
