declare global {
  interface Window {
    newTodoModal: DaisyUIModals;
    newFavoriteUserModal: DaisyUIModals
    modalDetail: DaisyUIModals
  }
}

export interface DaisyUIModals {
  showModal: () => void;
}
