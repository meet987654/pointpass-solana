"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { getExplorerTxUrl } from "@/lib/constants";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  txSignature?: string;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 7000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-xl p-4 shadow-lg border text-sm flex flex-col gap-1 transition-all animate-in slide-in-from-bottom-2 ${
              toast.type === "success"
                ? "bg-green-950/95 border-green-800 text-green-100"
                : toast.type === "error"
                ? "bg-rose-950/95 border-rose-800 text-rose-100"
                : "bg-neutral-900/95 border-neutral-700 text-neutral-100"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-medium leading-snug">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-xs opacity-60 hover:opacity-100 px-1"
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>
            {toast.txSignature && (
              <a
                href={getExplorerTxUrl(toast.txSignature, "devnet")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline underline-offset-2 opacity-90 hover:opacity-100 mt-1 inline-flex items-center gap-1 text-emerald-300"
              >
                Open in Solana Explorer (devnet) ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
