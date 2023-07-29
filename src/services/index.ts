import { AxiosRequestConfig } from "axios";
import { SUPABASE_ANONKEY, SUPABASE_URL } from "../config";
import { Todos } from "../models";

export const postTodo = (data: Todos): AxiosRequestConfig => ({
  url: `${SUPABASE_URL}/rest/v1/todos`,
  method: "POST",
  headers: {
    apikey: SUPABASE_ANONKEY,
  },
  data: data,
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

export const getTodos = (): AxiosRequestConfig => ({
  url: `${SUPABASE_URL}/rest/v1/todos`,
  method: "GET",
  params: {
    select: "*",
  },
  headers: {
    apikey: SUPABASE_ANONKEY,
  },
});
