"use client";

import { createContext, useContext, useState, useCallback } from "react";

type ToastType = "success" | "error" | "warning" | "info";

type ToastState = {
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    setToast({ message, type });

    // Auto hide after 3s
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  const getBgColor = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-emerald-500";
      case "error":
        return "bg-rose-500";
      case "warning":
        return "bg-amber-500";
      case "info":
      default:
        return "bg-sky-500";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div
          className={`
            fixed top-5 right-5 z-50 
            rounded-lg px-4 py-3 
            text-sm font-medium text-white 
            shadow-lg 
            flex items-center gap-3
            ${getBgColor(toast.type)}
          `}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-white/80 hover:text-white focus:outline-none"
          >
            ✕
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
};
