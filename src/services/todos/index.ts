import { AxiosRequestConfig } from "axios";
import { SUPABASE_ANONKEY, SUPABASE_URL } from "../../config";

export const postTodo = (
  todoName: string,
  todoDescription: string,
  todoIsImportant: boolean,
  author: string,
  shareWith: string[]
): AxiosRequestConfig => ({
  url: `${SUPABASE_URL}/rest/v1/todos`,
  method: "POST",
  headers: {
    apikey: SUPABASE_ANONKEY,
  },
  data: {
    todo: todoName,
    description: todoDescription,
    is_important: todoIsImportant,
    author: author,
    authorized_users: shareWith,
  },
});

export const getTodosByEmail = (email: string): AxiosRequestConfig => ({
  url: `${SUPABASE_URL}/rest/v1/todos`,
  method: "GET",
  params: {
    author: `eq.${email}`,
    select: "*",
  },
  headers: {
    apikey: SUPABASE_ANONKEY,
  },
});

export const getTodoById = (id: number | null): AxiosRequestConfig => ({
  url: `${SUPABASE_URL}/rest/v1/todos`,
  method: "GET",
  params: {
    id: `eq.${id}`,
    select: "*",
  },
  headers: {
    apikey: SUPABASE_ANONKEY,
  },
});

export const getSharedTodos = (email: string): AxiosRequestConfig => ({
  url: `${SUPABASE_URL}/rest/v1/todos`,
  method: "GET",
  params: {
    authorized_users: `cs.{${email}}`,

    select: "*",
  },
  headers: {
    apikey: SUPABASE_ANONKEY,
  },
});

export const deleteTodoById = (id: number): AxiosRequestConfig => ({
  url: `${SUPABASE_URL}/rest/v1/todos`,
  method: "DELETE",
  params: {
    select: "*",
    id: `eq.${id}`,
  },
  headers: {
    apikey: SUPABASE_ANONKEY,
  },
});

export const patchTodo = (
  todoId: number,
  todoName: string,
  todoDescription: string,
  todoIsImportant: boolean | null,
  sharedWith: string[]
): AxiosRequestConfig => ({
  url: `${SUPABASE_URL}/rest/v1/todos`,
  method: "PATCH",
  params: {
    select: "*",
    id: `eq.${todoId}`,
  },
  headers: {
    apikey: SUPABASE_ANONKEY,
  },
  data: {
    id: todoId,
    todo: todoName,
    description: todoDescription,
    is_important: todoIsImportant,
    authorized_users: sharedWith
  },
});
