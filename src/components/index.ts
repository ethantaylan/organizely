declare global {
  interface Window {
    newTodoModal: DaisyUIModals;
  }
}

export interface DaisyUIModals {
  showModal: () => void;
}
