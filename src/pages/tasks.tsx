import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Swal from "sweetalert2";
import { Alert } from "../components/alert";
import { AppLayout } from "../components/layout/layout";
import { NewTodoModal } from "../components/new-todo-modal";
import { TodosList } from "../components/todos/todos-list";
import { useGlobalContext, useGlobalDispatch } from "../context/context";
import { useAxios } from "../hooks/use-axios";
import { Todos } from "../models";
import { getFavoritesByEmail } from "../services/favorites";
import {
  deleteTodoById,
  getSharedTodos,
  getTodosByEmail,
  postTodo,
} from "../services/todos";

export const Tasks: React.FC = () => {
  const { user } = useAuth0();

  const [todos, setTodos] = React.useState<Todos[]>([]);
  const [sharedTodos, setSharedTodos] = React.useState<Todos[]>([]);
  const [isImportant, setIsImportant] = React.useState<boolean>(false);
  const [todoName, setTodoName] = React.useState<string>("");
  const [todoDescription, setTodoDescription] = React.useState<string>("");
  const [todoIsImportant, setTodoIsImportant] = React.useState<boolean>(false);
  const [todoShareWith, setTodoShareWith] = React.useState<string[]>([]);
  const [sharedWithEmail, setSharedWithEmail] = React.useState<string>("");
  const [showEmailWrongAlert, setEmailWrongAlert] =
    React.useState<boolean>(false);
  const [todoId, setTodoId] = React.useState<number>();
  const [todoAlert, setTodoAlert] = React.useState<boolean>(false);
  const [favorites, setFavorites] = React.useState<[]>([]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const { favoriteValue } = useGlobalContext();

  const postTodoFetch = useAxios(
    postTodo(
      todoName,
      todoDescription,
      todoIsImportant,
      user?.email || "",
      favoriteValue ? [favoriteValue] : todoShareWith || []
    ),
    false
  );

  const getTodosByEmailFetch = useAxios<Todos[]>(
    getTodosByEmail(user?.email || ""),
    false
  );

  const deleteTodoByIdFetch = useAxios<Todos>(
    deleteTodoById(todoId || 0),
    false
  );

  const getSharedTodosFetch = useAxios<Todos[]>(
    getSharedTodos(user?.email || ""),
    false
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFavoritesByEmailFetch = useAxios<any>(
    getFavoritesByEmail(user?.email || ""),
    false
  );

  React.useEffect(() => {
    if (user) {
      getFavoritesByEmailFetch.executeFetch();
    }
  }, [user]);

  React.useEffect(() => {
    if (getFavoritesByEmailFetch.response) {
      setFavorites(
        getFavoritesByEmailFetch?.response?.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (fav: any) => fav.favorites
        )
      );
    }
  }, [getFavoritesByEmailFetch.response]);

  React.useEffect(() => {
    if (user) {
      getSharedTodosFetch.executeFetch();
      getTodosByEmailFetch.executeFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  React.useEffect(() => {
    getTodosByEmailFetch.response && setTodos(getTodosByEmailFetch.response);
    getSharedTodosFetch.response &&
      setSharedTodos(getSharedTodosFetch.response);
  }, [getTodosByEmailFetch.response, getSharedTodosFetch.response]);

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
    if (todoAlert) {
      setTimeout(() => {
        setTodoAlert(false);
      }, 2000);
    }
  }, [todoAlert]);

  const handleAddTodo = () => {
    const isTodoNameValid = (todoName: string) => {
      return todoNameRegex.test(todoName);
    };

    const todoNameRegex = /^(\S+)/;

    if (user && !isTodoNameValid(todoName)) {
      return Swal.fire("Todo title can't be null", "", "error");
    }
    {
      postTodoFetch.executeFetch().then(() => {
        getTodosByEmailFetch.executeFetch();
        getSharedTodosFetch.executeFetch();
      });
      resetTodoState();
      setTodoAlert(true);
    }
  };

  const handleModalClose = () => {
    resetTodoState();
  };

  const dispatch = useGlobalDispatch();

  const resetTodoState = () => {
    setTodoName("");
    setTodoDescription("");
    setTodoIsImportant(false);

    dispatch({
      type: "REMOVE_FAVORITE",
      payload: "",
    });
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

  const handleAddEmailToArray = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailWrongAlert(true);
      setTimeout(() => {
        setEmailWrongAlert(false);
      }, 2500);
    }

    setTodoShareWith([...todoShareWith, email]);
    setSharedWithEmail("");
  };

  const handleShareWithEmail = (sharedWithEmail: string) => {
    setSharedWithEmail(sharedWithEmail);
  };

  return (
    <AppLayout>
      {todoAlert && (
        <Alert
          title={"Todo added with success"}
          className="alert alert-success"
        />
      )}

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
        onTodoShareWithChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleShareWithEmail(event.target.value)
        }
        sharedValue={sharedWithEmail}
        addShared={() => {
          handleAddEmailToArray(
            favoriteValue ? favoriteValue : sharedWithEmail
          );
          setSharedWithEmail("");
        }}
        sharedEmails={todoShareWith}
        showAlert={showEmailWrongAlert}
        favorites={favorites}
      />
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
              className="btn btn-secondary btn-xs  px-3 py-4 text-md rounded"
            >
              Create new todo
            </button>
          </p>
        </div>
        {user &&
          todos.map((todo, index) => (
            <TodosList
              onClick={() => {
                setTodoId(todo.id || 0);
                setTodoName(todo.todo);
                setModalOpen(true);
              }}
              key={index}
              name={todo.todo}
              isImportant={todo.is_important}
              description={todo.description || ""}
              isShared={false}
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
              setTodoId(todo.id || 0);
              setTodoName(todo.todo);
            }}
            key={index}
            name={todo.todo}
            isImportant={todo.is_important}
            description={todo.description || ""}
            isShared={true}
            sharedPeoples={sharedTodos.map((name) => name.author)}
          />
        ))}
      </div>
    </AppLayout>
  );
};
