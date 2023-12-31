import { User, useAuth0 } from "@auth0/auth0-react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useGlobalDispatch } from "../../../context/context";
import { useAxios } from "../../../hooks/use-axios";
import { Todos } from "../../../models/todos";
import { sendEmailToUser } from "../../../services/emailJS";
import { getFavoritesByEmail } from "../../../services/supabase/favorites";
import { postTodo } from "../../../services/supabase/todos";
import { Switch } from "../../generic-components/switch";
import {
  NewTodoInput,
  NewTodoInputProps,
} from "../../new-todo-input/new-todo-input";
import { NewTodoSelect } from "../../new-todo-select/new-todo-select";

export interface NewTodoModalProps {
  onPostTodo: () => void;
}

export const NewTodoModal: React.FC<NewTodoModalProps> = ({ onPostTodo }) => {
  const [todoName, setTodoName] = React.useState<string>("");
  const [todoDescription, setTodoDescription] = React.useState<string>("");
  const [todoShareWith, setTodoShareWith] = React.useState<string[]>([]);
  const [todoIsImportant, setTodoIsImportant] = React.useState<boolean>(false);
  const [favorites, setFavorites] = React.useState<[]>([]);
  const [showEmailWrongAlert, setEmailWrongAlert] =
    React.useState<boolean>(false);
  const [todoAlert, setTodoAlert] = React.useState<boolean>(false);
  const [sharedWithEmail, setSharedWithEmail] = React.useState<string>("");
  const [selectedFavorite, setSelectedFavorite] = React.useState<string>("");

  const { user } = useAuth0();
  const dispatch = useGlobalDispatch();

  const sendEmailToUserFetch = useAxios(
    sendEmailToUser(
      todoShareWith.length === 0 ? [sharedWithEmail] : todoShareWith,
      user?.name || user?.given_name || "",
      todoName,
      todoDescription ? todoDescription : "No description",
      user?.name || user?.given_name || null
    ),
    false
  );

  const postTodoFetch = useAxios(
    postTodo(
      todoName,
      todoDescription,
      todoIsImportant,
      user?.email || "",
      todoShareWith.length === 0 ? [sharedWithEmail] : todoShareWith
    ),
    false
  );

  const getFavoritesByEmailFetch = useAxios<User>(
    getFavoritesByEmail(user?.email || ""),
    false
  );

  const resetTodoState = () => {
    setTodoName("");
    setTodoDescription("");
    setTodoIsImportant(false);

    dispatch({
      type: "REMOVE_FAVORITE",
      payload: "",
    });
  };

  const handleFavoriteValue = (value: string) => {
    dispatch({
      type: "ADD_FAVORITE",
      payload: value,
    });
  };

  const handleModalClose = () => {
    resetTodoState();
  };

  const handleTodoName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(event.target.value);
  };

  const handleTodoDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTodoDescription(event.target.value);
  };

  const handleAddEmailToArray = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailWrongAlert(true);
      setTimeout(() => {
        setEmailWrongAlert(false);
      }, 2500);
    } else {
      if (!todoShareWith.includes(email)) {
        setTodoShareWith([...todoShareWith, email]);
        setSharedWithEmail("");
      }
    }
  };

  const handleShareWithEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSharedWithEmail(event.target.value);
  };

  const handleAddTodo = () => {
    const isTodoNameValid = (todoName: string) => {
      return todoNameRegex.test(todoName);
    };

    const todoNameRegex = /^(\S+)/;

    if (user && !isTodoNameValid(todoName)) {
      Swal.fire({
        title: "Todo title can't be null",
        background: "#111827",
        icon: "error",
        confirmButtonColor: "#BA2092",
        confirmButtonText: "OK !",
        color: "white",
      });
    } else {
      if (todoShareWith.length > 0 || [sharedWithEmail.length > 0]) {
        sendEmailToUserFetch.executeFetch();
      }
      postTodoFetch.executeFetch().then(() => {
        onPostTodo();
        resetTodoState();
      });
      setTodoAlert(true);
    }
  };

  React.useEffect(() => {
    if (selectedFavorite) {
      setSharedWithEmail(selectedFavorite);
    }
  }, [selectedFavorite]);

  React.useEffect(() => {
    if (user) {
      getFavoritesByEmailFetch.executeFetch();
    }
  }, [user]);

  React.useEffect(() => {
    if (getFavoritesByEmailFetch.response) {
      setFavorites(
        getFavoritesByEmailFetch?.response?.map((fav: Todos) => fav.favorites)
      );
    }
  }, [getFavoritesByEmailFetch.response]);

  React.useEffect(() => {
    if (todoAlert) {
      setTimeout(() => {
        setTodoAlert(false);
      }, 2000);
    }
  }, [todoAlert]);

  const inputFields: NewTodoInputProps[] = [
    {
      label: "Name",
      inputValue: todoName,
      onChange: handleTodoName,
      onResetInput: () => setTodoName(""),
    },
    {
      label: "Description",
      inputValue: todoDescription,
      onChange: handleTodoDescription,
      onResetInput: () => setTodoDescription(""),
    },
    {
      withAddMoreButton: true,
      label: "Share with",
      inputValue: sharedWithEmail,
      onChange: handleShareWithEmail,
      onResetInput: () => setSharedWithEmail(""),
      onAddArray: () => handleAddEmailToArray(sharedWithEmail),
    },
  ];

  return (
    <React.Fragment>
      <dialog id="newTodoModal" className="modal">
        <form
          method="dialog"
          className="bg-slate-800 border border-slate-700 modal-box"
        >
          <div className="flex mb-5 items-center">
            <span className="me-1">📝</span>
            <h1 className="font-bold text-slate-300">New todo</h1>
          </div>

          <div className="flex flex-col">
            {inputFields.map((field) => (
              <NewTodoInput
                inputValue={field.inputValue}
                onChange={field.onChange}
                onResetInput={field.onResetInput}
                label={field.label}
                withAddMoreButton={field.withAddMoreButton}
                onAddArray={field.onAddArray}
              />
            ))}

            {showEmailWrongAlert && (
              <p className="ms-1 mb-3 rounded text-red-600">
                Wrong adresse email format
              </p>
            )}
            {todoShareWith.length > 0 && (
              <div className="flex items-center">
                <p className="text-warning flex text-sm">
                  This todo wil be shared with:
                </p>
              </div>
            )}
            {todoShareWith.map((shared) => (
              <div className="flex justify-between items-center w-auto rounded-xl">
                <span className="text-warning font-semibold flex">
                  {shared}
                </span>
              </div>
            ))}
            {todoShareWith.length > 0 && (
              <span
                onClick={() => setTodoShareWith([])}
                className="cursor-pointer font-semibold text-sm"
              >
                Reset shared users
              </span>
            )}

            <NewTodoSelect
              selectValue={selectedFavorite}
              onSelectChange={(event) => {
                setSelectedFavorite(event.target.value);
                handleFavoriteValue(event.target.value);
              }}
              favorites={favorites}
              onAddEmailToArray={() => {
                handleAddEmailToArray(selectedFavorite);
                setSelectedFavorite("");
              }}
            />

            <div className="flex text-sm mt-2">
              <InformationCircleIcon className="w-4 me-1" />
              To register a new favorite user, click{" "}
              <NavLink to="/favorite-users" className="font-semibold ms-1 link">
                here
              </NavLink>
            </div>
            <div className="flex w-full mt-5 items-center">
              <Switch
                value={todoIsImportant}
                onChange={() => setTodoIsImportant(!todoIsImportant)}
              />
              <span
                className={`label-text ${
                  todoIsImportant ? "text-secondary" : "text-slate-500"
                } font-bold`}
              >
                Important
              </span>
            </div>

            <div className="flex w-full justify-end">
              <button
                onClick={handleModalClose}
                className="btn me-2 mt-10 btn-ghost text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTodo}
                className="btn mt-10 btn-secondary"
              >
                Add todo
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </React.Fragment>
  );
};
