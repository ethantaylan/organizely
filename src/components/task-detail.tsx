import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../hooks/use-axios";
import { Todos } from "../models/todos";
import { getTodoById, patchTodo } from "../services/todos";
import { AppLayout } from "./layout/layout";

export interface TaskDetailProps {}

export const TaskDetail: React.FC<TaskDetailProps> = () => {
  const [todo, setTodo] = React.useState<Todos | undefined>(undefined);
  const [editedTodoName, setEditedTodoName] = React.useState<string>("");

  const { todoId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { response, executeFetch } = useAxios<any>(
    getTodoById(+todoId!),
    false
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateTodoFetch = useAxios<any>(
    patchTodo(+todoId!, editedTodoName),
    false
  );

  React.useEffect(() => {
    if (todoId) {
      executeFetch();
    }
  }, [todoId]);

  React.useEffect(() => {
    if (response) {
      setTodo(response?.[0]);
      setEditedTodoName(response[0]?.todo || "");
    }
  }, [response]);

  React.useEffect(() => {
    todo && setEditedTodoName(todo?.todo);
  }, [todo]);

  const navigate = useNavigate();

  const handleEditTodoName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTodoName(event.target.value);
  };

  return (
    <AppLayout>
      <span>
        <button
          onClick={() => navigate("/tasks")}
          className="btn text-white cursor-pointer mb-10 mt-5"
        >
          <ArrowLeftIcon className="h-6" />
        </button>
      </span>
      <h1 className="text-2xl text-white">
        Editing todo <span className="text-secondary">{todo?.todo}</span>
      </h1>
      <div className="bg-slate-900 rounded-2xl flex flex-col p-5 mt-5">
        <label htmlFor="name">Name</label>
        <input
          onChange={handleEditTodoName}
          className="input mb-5 bg-slate-800 text-white font-semibold"
          value={editedTodoName}
        />

        <label htmlFor="description">Description</label>
        <input
          className="input bg-slate-800 text-white font-semibold"
          value={todo?.description}
        />
        <button
          onClick={updateTodoFetch.executeFetch}
          className="btn mt-5 w-auto btn-secondary"
        >
          Update
        </button>
      </div>
    </AppLayout>
  );
};
