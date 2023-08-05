import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../hooks/use-axios";
import { getTodoById } from "../services/todos";
import { Todos, TodosResponse } from "../models";
import { AppLayout } from "./layout/layout";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { TodosList } from "./todos-list";

export interface TaskDetailProps {}

export const TaskDetail: React.FC<TaskDetailProps> = () => {
  const [todo, setTodo] = React.useState<Todos>();
  const { todoId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { response, executeFetch } = useAxios<any>(
    getTodoById(+todoId!),
    false
  );

  React.useEffect(() => {
    if (todoId) {
      executeFetch();
    }
  }, [todoId]);

  React.useEffect(() => {
    response && response && setTodo(response?.[0]);
  }, [response]);

  const navigate = useNavigate();

  return (
    <AppLayout>
      <span>
        <button className="btn text-white cursor-pointer mb-10 mt-5">
          {" "}
          <ArrowLeftIcon onClick={() => navigate(-1)} className="h-6" />
        </button>
      </span>
      <h1 className="text-2xl text-white">Editing todo</h1>
      <div className="bg-slate-900 rounded-2xl p-5 m-5">
        <p className="text-white font-semibold">{todo?.todo}</p>
        <p>{todo?.description}</p>
        <TodosList
          name={todo?.todo || ""}
          isImportant={todo?.isImportant || null}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          isShared={todo?.isShared}
          todoId={0}
        />
      </div>
    </AppLayout>
  );
};
