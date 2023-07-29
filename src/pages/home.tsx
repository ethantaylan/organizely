import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { AppLayout } from "../components/layout/layout";
import { TodosList } from "../components/todos/todos-list";
import { useAxios } from "../hooks/use-axios";
import { Todos } from "../models";
import { getTodosByEmail } from "../services";

export const Home: React.FC = () => {
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
      <div className="p-20">
        <h1 className="text-white text-4xl">
          Todo list de{" "}
          <span className="text-secondary font-bold">{user?.name}</span>
        </h1>
        {user ?
          todos.map((todo) => (
            <TodosList
              name={todo.todo}
              isImportant={todo.is_important}
              description={todo.description || ""}
            />
          )): 'Loading'}
      </div>
    </AppLayout>
  );
};
