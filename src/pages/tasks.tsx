import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Swal from "sweetalert2";
import { Alert } from "../components/alert";
import { AppLayout } from "../components/layout/layout";
import { ModalDetail } from "../components/modal-detail";
import { NewTodoModal } from "../components/new-todo-modal";
import { TodosList } from "../components/todos-list";
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

export const Tasks: React.FC = () => {
  const { user } = useAuth0();








  return (
    <AppLayout>
      {todoAlert && (
        <Alert
          title="Todo added with success"
          className="alert alert-success"
        />
      )}

      <NewTodoModal
        onConfirm={handleAddTodo}
        onToDoNameChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleTodoNameChange(event.target.value)
        }
        onTodoDescriptionChange={(
          event: React.ChangeEvent<HTMLInputElement>
        ) => {
          handleTodoDescriptionChange(event.target.value);
        }}
        onTodoIsImportantChange={handleTodoIsImportantChange}
        switchValue={isImportant}
        switchOnClick={() => setIsImportant(!isImportant)}
        onClose={handleModalClose}
        onTodoShareWithChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleShareWithEmail(event.target.value)
        }
        sharedValue={sharedWithEmail}
        addShared={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          handleAddEmailToArray(
            favoriteValue ? favoriteValue : sharedWithEmail
          );
          setSharedWithEmail("");
        }}
        sharedEmails={todoShareWith}
        showAlert={showEmailWrongAlert}
        favorites={favorites}
        onResetTodoName={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleTodoNameChange(event.target.value)
        }
        onResetTodoDescription={() => setTodoDescription("")}
        onResetTodoSharedWith={() => setTodoShareWith([""])}
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
              className="px-3 bg-secondary py-2 text-md text-white rounded"
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
