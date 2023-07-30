import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { AppLayout } from "../components/layout/layout";
import { NewTodoModal } from "../components/new-todo-modal";
import { TodosList } from "../components/todos/todos-list";
import { useAxios } from "../hooks/use-axios";
import { Todos } from "../models";
import { getTodosByEmail, postTodo } from "../services";

export const Tasks: React.FC = () => {
  const { user } = useAuth0();

  const [todos, setTodos] = React.useState<Todos[]>([]);

  const [isImportant, setIsImportant] = React.useState<boolean>(false);
  const [todoName, setTodoName] = React.useState<string>("");
  const [todoDescription, setTodoDescription] = React.useState<string>("");
  const [todoIsImportant, setTodoIsImportant] = React.useState<boolean>(false);

  const postTodoFetch = useAxios(
    postTodo(todoName, todoDescription, todoIsImportant, user?.email || ""),
    false
  );

  const getTodosByEmailFetch = useAxios<Todos[]>(
    getTodosByEmail(user?.email || ""),
    false
  );

  React.useEffect(() => {
    if (user) {
      getTodosByEmailFetch.executeFetch();
      console.log("tasks");
    }
  }, [user]);

  React.useEffect(() => {
    setTodos(getTodosByEmailFetch.response || []);
  }, [getTodosByEmailFetch.response]);

  const handleAddTodo = () => {
    postTodoFetch.executeFetch().then(() => {
      getTodosByEmailFetch.executeFetch();
    });
    resetTodoState();
  };

  const handleModalClose = () => {
    resetTodoState();
  };

  const resetTodoState = () => {
    setTodoName("");
    setTodoDescription("");
    setTodoIsImportant(false);
  };

  const handleTodoNameChange = (todoName: string) => {
    setTodoName(todoName);
  };

  const handleTodoDescriptionChange = (todoDescription: string) => {
    setTodoDescription(todoDescription);
  };

  const handleTodoIsImportantChange = () => {
    setTodoIsImportant((prevIsImportant) => !prevIsImportant);
  };

  return (
    <AppLayout>
      <NewTodoModal
        onConfirm={handleAddTodo}
        onToDoNameChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleTodoNameChange(event.target.value)
        }
        onTodoDescriptionChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleTodoDescriptionChange(event.target.value)
        }
        onTodoIsImportantChange={handleTodoIsImportantChange}
        switchValue={isImportant}
        switchOnClick={() => setIsImportant(!isImportant)}
        onClose={handleModalClose}
      />
      <div className="mt-5">
        <div className="flex mt-10 items-end justify-between">
          <p>
            <span className="me-2 text-secondary font-bold">
              {user?.given_name || user?.nickname}
            </span>
            here is your todos ⤵
          </p>
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
