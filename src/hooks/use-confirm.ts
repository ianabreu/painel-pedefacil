import { ConfirmContext } from "@/contexts/confirm-context";
import { useContext } from "react";

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm deve ser usado dentro de um ConfirmProvider");
  }
  return context;
};
