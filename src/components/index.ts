declare global {
  interface Window {
    newTodoModal: DaisyUIModals;
    newFavoriteUserModal: DaisyUIModals
  }
}

export interface DaisyUIModals {
  showModal: () => void;
}
