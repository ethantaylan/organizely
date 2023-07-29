import React from "react";
import { Switch } from "./switch";
import { useAxios } from "../hooks/use-axios";
import { getTodosByEmail, postTodo } from "../services";
import { useAuth0 } from "@auth0/auth0-react";

export const NewTodoModal: React.FC = () => {
  const [isImportant, setIsImportant] = React.useState<boolean>(false);

  const [todoName, setTodoName] = React.useState<string>("");
  const [todoDescription, setTodoDescription] = React.useState<string>("");
  const [todoIsImportant, setTodoIsImportant] = React.useState<boolean>(false);

  const handleTodoNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(event.target.value);
  };

  const handleTodoDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTodoDescription(event.target.value);
  };

  const handleTodoIsImportantChange = () => {
    setTodoIsImportant((prevIsImportant) => !prevIsImportant);
  };

  const { user } = useAuth0();

  const postTodoFetch = useAxios(
    postTodo(todoName, todoDescription, todoIsImportant, user?.email || ""),
    false
  );

  const getTodosFetch = useAxios(getTodosByEmail(user?.email || ""), false);

  React.useEffect(() => {
    postTodoFetch.response && getTodosFetch.executeFetch();
  }, [postTodoFetch.response, getTodosFetch.executeFetch]);
  

  const handleAddTodo = () => {
    postTodoFetch.executeFetch();
  };

  return (
    <React.Fragment>
      <dialog id="newTodoModal" className="modal">
        <form
          method="dialog"
          className="bg-gray-900 border border-gray-700 modal-box"
        >
          <div className="flex mb-5 items-center">
            <span className="me-1">📝</span>
            <h1 className="font-bold text-white">Nouvelle todo</h1>
          </div>

          <div className="flex  flex-col">
            <label htmlFor="todo" className="me-2 text-sm">
              Nom
            </label>
            <input
              onChange={handleTodoNameChange}
              type="text"
              placeholder=""
              className="input mb-5 w-full text-sm bg-gray-800"
            />

            <label htmlFor="todo" className="me-2">
              Description
            </label>
            <input
              onChange={handleTodoDescriptionChange}
              type="text"
              placeholder=""
              className="input w-full bg-gray-800"
            />
            <div className="flex w-full mt-5 items-center">
              <Switch
                value={isImportant}
                onChange={handleTodoIsImportantChange}
                onClick={() => setIsImportant(!isImportant)}
              />
              <span className="label-text text-secondary font-bold">
                Important
              </span>
            </div>

            <div className="flex w-full justify-end">
              <button className="btn me-2 mt-10 text-white bg-gray-600 ">
                Retour
              </button>
              <button
                onClick={handleAddTodo}
                className="btn mt-10 btn-secondary"
              >
                Ajouter
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </React.Fragment>
  );
};
