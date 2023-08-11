import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../hooks/use-axios";
import { Todos } from "../models/todos";
import { getTodoById } from "../services/todos";
import { AppLayout } from "./layout/layout";
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
        <button
          onClick={() => navigate("/tasks")}
          className="btn text-white cursor-pointer mb-10 mt-5"
        >
          {" "}
          <ArrowLeftIcon className="h-6" />
        </button>
      </span>
      <h1 className="text-2xl text-white">
        Editing todo <span className="text-secondary">"{todo?.todo}"</span>
      </h1>
      <TodosList
        withNavigate={false}
        name={todo?.todo || ""}
        isImportant={todo?.is_important || null}
        isShared={todo?.is_shared || null}
        todoId={todo?.id || null}
        onClick={() => console.log("test")}
        onEdit={() => console.log("test")}
      />
    </AppLayout>
  );
};
