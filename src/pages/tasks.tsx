import React from "react";
import { NewTodoModal } from "../components/new-todo-modal";
import { getTodosByEmail } from "../services";
import { useAuth0 } from "@auth0/auth0-react";
import { TodosList } from "../components/todos/todos-list";
import { useAxios } from "../hooks/use-axios";
import { Todos } from "../models";
import { AppLayout } from "../components/layout/layout";

export const Tasks: React.FC = () => {
  const { user } = useAuth0();

  const [todos, setTodos] = React.useState<Todos[]>([]);

  const getTodosByEmailFetch = useAxios<Todos[]>(
    getTodosByEmail(user?.email || ""),
    false
  );

  React.useEffect(() => {
    if (user) {
      getTodosByEmailFetch.executeFetch();
    }
  }, [user]);

  React.useEffect(() => {
    setTodos(getTodosByEmailFetch.response || []);
  }, [getTodosByEmailFetch.response]);
  return (
    <AppLayout>
      <NewTodoModal />
      <div className="mt-5">
        <div className="flex mt-10 items-end justify-between">
          <p><span className="me-2 text-secondary font-bold">{user?.given_name || user?.nickname}</span>here is your todos ⤵</p>
          <p className="rounded">
            <button
              onClick={() => window.newTodoModal.showModal()}
              className="bg-gray-900 hover:bg-gray-800 px-3 text-xl rounded"
            >
              +
            </button>
          </p>
        </div>
        {user
          ? todos.map((todo, index) => (
              <TodosList
                key={index}
                name={todo.todo}
                isImportant={todo.is_important}
                description={todo.description || ""}
              />
            ))
          : "Loading"}
      </div>
    </AppLayout>
  );
};
