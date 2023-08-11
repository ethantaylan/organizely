declare global {
  interface Window {
    newTodoModal: DaisyUIModals;
    newFavoriteUserModal: DaisyUIModals
    editTodoModal: DaisyUIModals
    
  }
}

export interface DaisyUIModals {
  showModal: () => void;
}
