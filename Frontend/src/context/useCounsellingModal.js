import { useContext } from "react";
import { CounsellingModalContext } from "./counsellingContext";

export function useCounsellingModal() {
  return useContext(CounsellingModalContext);
}

