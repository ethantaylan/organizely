import { ArrowLeftIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useAxios } from "../hooks/use-axios";
import { Todos } from "../models/todos";
import { getTodoById, patchTodo } from "../services/todos";
import { AppLayout } from "./layout/layout";
import { Switch } from "./switch";

export const TaskDetail: React.FC = () => {
  const [emailValid, setEmailValid] = React.useState<boolean>(true);
  const [todoNameValid, setTodoNameValid] = React.useState<boolean>(true);

  const [todo, setTodo] = React.useState<Todos | undefined>(undefined);
  const [editedTodoName, setEditedTodoName] = React.useState<string>("");
  const [editedTodoIsImportant, setEditedTodoIsImportant] = React.useState<
    boolean | null
  >();
  const [editedTodoDescription, setEditedTodoDescription] =
    React.useState<string>();
  const [todoIsSharedWith, setTodoIsWharedWith] = React.useState<string[]>([]);
  const [newSharedUser, setNewSharedUser] = React.useState<string>("");

  const { todoId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { response, executeFetch } = useAxios<any>(
    getTodoById(+todoId!),
    false
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const patchTodoFetch = useAxios<any>(
    patchTodo(
      +todoId!,
      editedTodoName,
      editedTodoDescription || "",
      editedTodoIsImportant || null,
      todoIsSharedWith
    ),
    false
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    if (todoId) {
      executeFetch();
    }
  }, [todoId]);

  React.useEffect(() => {
    if (response) {
      setTodo(response?.[0]);
    }
  }, [response]);

  React.useEffect(() => {
    if (todo) {
      setEditedTodoName(todo.todo);
      setEditedTodoDescription(todo.description);
      setEditedTodoIsImportant(todo.is_important);
      setTodoIsWharedWith(todo.authorized_users || []);
    }
  }, [todo]);

  React.useEffect(() => {
    todo && setEditedTodoName(todo?.todo);
  }, [todo]);

  React.useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(newSharedUser));
  }, [newSharedUser]);

  React.useEffect(() => {
    const todoNameRegex = /^(\S+)/;
    setTodoNameValid(todoNameRegex.test(editedTodoName));
  }, [editedTodoName]);

  const handleEditTodoName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTodoName(event.target.value);
  };

  const handleEditTodoDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedTodoDescription(event.target.value);
  };

  const handleRemoveSharedUser = (email: string) => {
    setTodoIsWharedWith((prevSharedUsers) =>
      prevSharedUsers.filter((user) => user !== email)
    );
  };

  const handleAddSharedUser = () => {
    if (newSharedUser && !todoIsSharedWith.includes(newSharedUser)) {
      setTodoIsWharedWith((prevSharedUsers) => [
        ...prevSharedUsers,
        newSharedUser,
      ]);
      setNewSharedUser("");
    }
  };

  const handleUpdateTodo = () => {
    if (todoNameValid) {
      patchTodoFetch.executeFetch().then(() => {
        Swal.fire({
          title: "Todo has been updated with success",
          background: "#111827",
          icon: "success",
          confirmButtonColor: "#BA2092",
          confirmButtonText: "OK !",
          color: "white",
        }).then(() => {
          navigate("/tasks");
        });
      });
    }
  };

  return (
    <AppLayout>
      <span>
        <button
          onClick={() => navigate("/tasks")}
          className="btn text-slate-300 cursor-pointer mb-10 mt-5"
        >
          <ArrowLeftIcon className="h-6" />
        </button>
      </span>
      <h1 className="text-2xl text-slate-300">
        Editing todo <span className="text-secondary">{todo?.todo}</span>
      </h1>
      <div className="bg-slate-900 rounded-2xl flex flex-col p-5 mt-5">
        <label htmlFor="name">Name</label>
        <input
          onChange={handleEditTodoName}
          className={`input mb-5 bg-slate-800 text-slate-300 font-semibold ${
            !todoNameValid ? "border-red-500" : ""
          }`}
          value={editedTodoName}
        />

        <>
          <label htmlFor="description">Description</label>
          <input
            onChange={handleEditTodoDescription}
            className="input bg-slate-800"
            value={editedTodoDescription}
          />
        </>

        {todoIsSharedWith.length > 0 && (
          <p className="mt-5 text-warning">This todo is shared with:</p>
        )}
        {todoIsSharedWith.length > 0 ? (
          todoIsSharedWith.map((user, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex rounded-lg p-3 my-2 bg-slate-800 w-100 justify-between">
                <span>{user}</span>
                <span onClick={() => handleRemoveSharedUser(user)}>
                  {<XCircleIcon className="w-6 text-red-500 cursor-pointer" />}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-warning mt-5">This todo is not shared</p>
        )}

        <p className="mt-5">Add new shared user</p>

        <div className="flex">
          <input
            type="email"
            placeholder="Enter email"
            className={`input w-full text-sm bg-slate-800`}
            value={newSharedUser}
            onChange={(e) => setNewSharedUser(e.target.value)}
          />

          <button
            onClick={handleAddSharedUser}
            className={`btn ms-3 btn-primary ${
              !emailValid ? "cursor-not-allowed" : ""
            }`}
            disabled={!emailValid}
          >
            Add
          </button>
        </div>

        <div className="flex mt-5 items-center">
          <Switch
            value={editedTodoIsImportant || null}
            onChange={() => setEditedTodoIsImportant(!editedTodoIsImportant)}
          />
          <small
            className={
              editedTodoIsImportant
                ? "text-secondary font-bold"
                : " font-normal"
            }
          >
            Important
          </small>
        </div>

        <div className="w-full flex justify-end">
          <button
            onClick={() => navigate("/tasks")}
            className="btn mt-5 me-4 w-100 btn-ghost"
          >
            My todos
          </button>
          <button
            onClick={handleUpdateTodo}
            className="btn mt-5 w-100 btn-secondary"
          >
            Update
          </button>
          {/* <button
            onClick={updateTodoFetch.executeFetch}
            className="btn mt-5 ms-2 w-100 text-slate-300 bg-red-500"
          >
            DELETE TODO
          </button> */}
        </div>
      </div>
    </AppLayout>
  );
};
