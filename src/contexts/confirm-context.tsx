"use client";

import { createContext, useState, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmOptions {
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  variant?: "info" | "danger";
  onConfirm: () => void;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => void;
}

export const ConfirmContext = createContext<ConfirmContextType | undefined>(
  undefined,
);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const confirm = (data: ConfirmOptions) => {
    setOptions(data);
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    if (options?.onConfirm) {
      options.onConfirm();
    }
    handleClose();
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{options?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {options?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant={"ghost"}>
              {options?.cancelText || "Cancelar"}
            </AlertDialogCancel>
            <AlertDialogAction
              variant={
                options?.variant === "danger"
                  ? "destructive"
                  : options?.variant === "info"
                    ? "default"
                    : "default"
              }
              onClick={handleConfirm}
            >
              {options?.confirmText || "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmContext.Provider>
  );
}
