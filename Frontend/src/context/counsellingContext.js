import { createContext } from "react";

export const CounsellingModalContext = createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  toggleModal: () => {},
  initialData: {},
  submittedData: null,
  setSubmittedData: () => {},
});

