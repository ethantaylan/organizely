import { AxiosRequestConfig } from "axios";
import { SUPABASE_ANONKEY, SUPABASE_URL } from "../../../config";

export const getFavoritesByEmail = (email: string): AxiosRequestConfig => ({
  url: `${SUPABASE_URL}/rest/v1/favorites`,
  method: "GET",
  params: {
    email: `eq.${email}`,
    select: "*",
  },
  headers: {
    apikey: SUPABASE_ANONKEY,
  },
});

export const postFavoriteUSer = (
  email: string,
  favoriteUser: string
): AxiosRequestConfig => ({
  url: `${SUPABASE_URL}/rest/v1/favorites`,
  method: "POST",
  data: {
    email: email,
    favorites: favoriteUser,
  },
  headers: {
    apikey: SUPABASE_ANONKEY,
  },
});

export const deleteFavoriteUserById = (
  id: number | null
): AxiosRequestConfig => ({
  url: `${SUPABASE_URL}/rest/v1/favorites`,
  method: "DELETE",
  params: {
    id: `eq.${id}`,
    select: "*",
  },
  headers: {
    apikey: SUPABASE_ANONKEY,
  },
});
