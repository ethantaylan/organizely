export interface Todos {
  authorized_users: string;
  author: string
  id: number;
  todo: string;
  description?: string;
  is_important: boolean;
  is_shared: boolean;
}
