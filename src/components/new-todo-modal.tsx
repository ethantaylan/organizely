import { useAuth0 } from "@auth0/auth0-react";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import Swal from "sweetalert2";
import { useGlobalContext, useGlobalDispatch } from "../context/context";
import { useAxios } from "../hooks/use-axios";
import { Todos } from "../models/todos";
import { getFavoritesByEmail } from "../services/favorites";
import {
  deleteTodoById,
  getSharedTodos,
  getTodosByEmail,
  postTodo,
} from "../services/todos";
import { Switch } from "./switch";

export interface NewTodoModalProps {}

export const NewTodoModal: React.FC<NewTodoModalProps> = ({}) => {
  const [isFavoritesUsers, setIsFavoritesUsers] =
    React.useState<boolean>(false);
  const [todos, setTodos] = React.useState<Todos[]>([]);
  const [todoName, setTodoName] = React.useState<string>("");
  const [todoDescription, setTodoDescription] = React.useState<string>("");
  const [todoShareWith, setTodoShareWith] = React.useState<string[]>([]);
  const [sharedTodos, setSharedTodos] = React.useState<Todos[]>([]);
  const [todoIsImportant, setTodoIsImportant] = React.useState<boolean>(false);
  const [favorites, setFavorites] = React.useState<[]>([]);
  const [showEmailWrongAlert, setEmailWrongAlert] =
    React.useState<boolean>(false);
  const [todoId, setTodoId] = React.useState<number>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [todoAlert, setTodoAlert] = React.useState<boolean>(false);
  const [todoShareWith, setTodoShareWith] = React.useState<string[]>([]);
  const [sharedWithEmail, setSharedWithEmail] = React.useState<string>("");

  const { favoriteValue } = useGlobalContext();

  const { user } = useAuth0();

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

  const handleFavoriteValue = (value: string) => {
    dispatch({
      type: "ADD_FAVORITE",
      payload: value,
    });
  };

  const handleTodoName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(event.target.value);
  };

  const handleTodoDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTodoDescription(event.target.value);
  };

  const handleTodoSharedWith = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoShareWith([event.target.value]);
  };

  const handleTodoIsImportant = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTodoIsImportant(!event.target.value);
  };

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
      Swal.fire("Todo title can't be null", "", "error");
    } else {
      postTodoFetch.executeFetch().then(() => {
        getTodosByEmailFetch.executeFetch();
        getSharedTodosFetch.executeFetch();
        resetTodoState();
      });
      setTodoAlert(true);
    }
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
    <React.Fragment>
      <dialog id="newTodoModal" className="modal">
        <form
          method="dialog"
          className="bg-slate-800 border border-slate-700 modal-box"
        >
          <div className="flex mb-5 items-center">
            <span className="me-1">📝</span>
            <h1 className="font-bold text-white">New todo</h1>
          </div>

          <div className="flex flex-col">
            <label htmlFor="todo" className="me-2 text-sm">
              Todo
            </label>
            <div className="relative mb-5 flex items-center">
              <input
                value={todoName}
                onChange={handleTodoName}
                type="text"
                placeholder=""
                className="input w-full text-sm bg-slate-700"
              />
              <span
                onClick={() => setTodoName("")}
                className="absolute btn btn-ghost btn-sm right-3"
              >
                <XMarkIcon className="w-6 text-slate-500" />
              </span>
            </div>
            <label htmlFor="todo" className="me-2">
              Description
            </label>
            <div className="relative mb-5 flex items-center">
              <input
                value={todoDescription}
                onChange={handleTodoDescription}
                type="text"
                placeholder=""
                className="input w-full text-sm bg-slate-700"
              />
              <span
                onClick={() => setTodoDescription("")}
                className="absolute btn btn-ghost btn-sm right-3"
              >
                <XMarkIcon className="w-6 text-slate-500" />
              </span>
            </div>

            <div className="flex w-full">
              <label htmlFor="todo" className="me-2">
                Share with
              </label>
            </div>
            <div className="flex w-full">
              <div className="items-center relative flex w-full">
                <input
                  disabled={isFavoritesUsers}
                  autoComplete="on"
                  value={todoShareWith}
                  onChange={handleTodoSharedWith}
                  type="email"
                  placeholder=""
                  className="input w-full text-sm bg-slate-700"
                />
                <span
                  onClick={() => setTodoShareWith([""])}
                  className="absolute btn btn-ghost btn-sm right-3"
                >
                  <XMarkIcon className="w-6 text-slate-500" />
                </span>
              </div>
              <button
                disabled={isFavoritesUsers}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault();
                  handleAddEmailToArray(
                    favoriteValue ? favoriteValue : sharedWithEmail
                  );
                  setSharedWithEmail("");
                }}
                className="btn ms-4 btn-primary"
              >
                Share
              </button>
            </div>

            {!isFavoritesUsers && (
              <div className="flex mb-2 mt-5 w-full items-center justify-between">
                <span
                  onClick={() => setIsFavoritesUsers(true)}
                  className="cursor-pointer badge flex whitespace-nowrap border rounded-xl border-primary"
                >
                  Show favorite users{" "}
                  <StarIcon className="w-4 ms-1 text-warning" />
                </span>
              </div>
            )}

            {showAlert && (
              <p className="ms-1 mb-3 rounded text-red-600">
                Wrong adresse email format
              </p>
            )}

            {sharedEmails.map((shared) => (
              <p className="ms-1 text-secondary">{shared}</p>
            ))}

            <div className="flex mt-5">
              {isFavoritesUsers && (
                <select
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    handleFavoriteValue(event.target.value)
                  }
                  className="select bg-primary bg-opacity-10 border-primary w-full"
                >
                  <option>Select favorite user</option>
                  {favorites.map((fav) => (
                    <option
                      onClick={() => handleFavoriteValue(fav)}
                      value={fav}
                    >
                      {fav}
                    </option>
                  ))}
                </select>
              )}
              {isFavoritesUsers && (
                <span
                  onClick={() => setIsFavoritesUsers(false)}
                  className="btn ms-4 btn-primary"
                >
                  <XMarkIcon className="w-5" />
                </span>
              )}
            </div>

            <div className="flex w-full mt-5 items-center">
              <Switch
                value={todoIsImportant}
                onChange={handleTodoIsImportant}
                onClick={() => switchOnClick(!switchValue)}
              />
              <span
                className={`label-text ${
                  switchValue ? "text-secondary" : "text-slate-500"
                } font-bold`}
              >
                Important
              </span>
            </div>

            <div className="flex w-full justify-end">
              <button
                onClick={onClose}
                className="btn me-2 mt-10 btn-ghost text-white"
              >
                Cancel
              </button>
              <button onClick={onConfirm} className="btn mt-10 btn-secondary">
                Add todo
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </React.Fragment>
  );
};
