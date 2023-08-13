import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Swal from "sweetalert2";
import { Alert } from "../components/alert";
import { AppLayout } from "../components/layout/layout";
import { ModalDetail } from "../components/modal-detail";
import { NewTodoModal } from "../components/new-todo-modal";
import { TodosList } from "../components/todos-list";
import { useAxios } from "../hooks/use-axios";
import { Todos } from "../models/todos";
import {
  deleteTodoById,
  getSharedTodos,
  getTodosByEmail,
} from "../services/todos";

export const Tasks: React.FC = () => {
  const { user } = useAuth0();

  const [todos, setTodos] = React.useState<Todos[]>([]);
  const [sharedTodos, setSharedTodos] = React.useState<Todos[]>([]);
  const [todoAlert, setTodoAlert] = React.useState<boolean>(false);
  const [todoId, setTodoId] = React.useState<number | null>(null);
  const [todoName, setTodoName] = React.useState<string>("");
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const getTodosByEmailFetch = useAxios<Todos[]>(
    getTodosByEmail(user?.email || ""),
    false
  );
  const getSharedTodosFetch = useAxios<Todos[]>(
    getSharedTodos(user?.email || ""),
    false
  );
  const deleteTodoByIdFetch = useAxios<Todos>(
    deleteTodoById(todoId || 0),
    false
  );

  React.useEffect(() => {
    getTodosByEmailFetch.response && setTodos(getTodosByEmailFetch.response);
    getSharedTodosFetch.response &&
      setSharedTodos(getSharedTodosFetch.response);
  }, [getTodosByEmailFetch.response, getSharedTodosFetch.response]);

  React.useEffect(() => {
    if (user) {
      getSharedTodosFetch.executeFetch();
      getTodosByEmailFetch.executeFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  React.useEffect(() => {
    if (todoId) {
      Swal.fire({
        title: `You are removing todo <br /> <span class="font-bold text-secondary">${todoName}</span>`,
        showCancelButton: true,
        confirmButtonText: "Remove",
        confirmButtonColor: "#BA2092",
        allowEscapeKey: true,
        allowOutsideClick: true,
        background: "#111827",
        color: "white",
        reverseButtons: true,
      }).then((result) => {
        if (user && result.isConfirmed) {
          Swal.fire({
            title: "Todo removed with success",
            background: "#111827",
            icon: "success",
            confirmButtonColor: "#BA2092",
            confirmButtonText: "OK !",
            color: "white",
          });
          deleteTodoByIdFetch.executeFetch().then(() => {
            getTodosByEmailFetch.executeFetch();
            getSharedTodosFetch.executeFetch();
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
    setModalOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoId, modalOpen]);

  React.useEffect(() => {
    if (todoAlert === true) {
      setTimeout(() => {
        setTodoAlert(false);
      }, 2500);
    }
  }, [todoAlert]);

  return (
    <AppLayout>
      {todoAlert && (
        <Alert
          title="Todo added with success"
          className="alert alert-success"
        />
      )}

      <NewTodoModal
        onPostTodo={() => {
          getTodosByEmailFetch.executeFetch();
          getSharedTodosFetch.executeFetch();
          setTodoAlert(true);
        }}
      />
      <ModalDetail />
      <div className="mt-5">
        <div className="flex mt-10 items-end justify-between">
          <p>
            {todos.length === 0 ? (
              <>
                <p className="text-xl font-bold">Your todos</p>
                <p className="text-slate-500">You don't have any todos</p>
              </>
            ) : (
              <p className="text-xl font-bold">My todos</p>
            )}
          </p>
          <p className="rounded">
            <button
              onClick={() => window.newTodoModal.showModal()}
              className="px-4 bg-secondary py-2 text-md font-semibold text-white rounded-lg"
            >
              New todo
            </button>
          </p>
        </div>
        {user &&
          todos.map((todo, index) => (
            <TodosList
              onClick={() => {
                setTodoId(todo.id);
                setTodoName(todo.todo);
                setModalOpen(true);
              }}
              key={index}
              name={todo.todo}
              isImportant={todo.is_important}
              description={todo.description}
              isShared={false}
              todoId={todo.id}
            />
          ))}

        <p>
          {sharedTodos.length === 0 ? (
            <div className="my-20">
              <p className="text-xl font-bold">Shared todos with me</p>
              <p className="text-slate-500">No shared todos :(</p>
            </div>
          ) : (
            <p className="text-xl font-bold">Todos shared with me</p>
          )}
        </p>
        {sharedTodos.map((todo, index) => (
          <TodosList
            onClick={() => {
              setTodoId(todo.id);
              setTodoName(todo.todo);
            }}
            key={index}
            name={todo.todo}
            isImportant={todo.is_important}
            description={todo.description}
            isShared={true}
            sharedPeoples={sharedTodos.map((name) => name.author)}
            todoId={todo.id}
          />
        ))}
      </div>
    </AppLayout>
  );
};
