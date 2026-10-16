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
            className={`pointer-events-auto rounded-[4px] p-4 text-xs font-mono shadow-2xl border flex flex-col gap-1.5 transition-all animate-in slide-in-from-bottom-2 ${
              toast.type === "success"
                ? "bg-[#0d1510] border-emerald-900/80 text-emerald-300"
                : toast.type === "error"
                ? "bg-[#180d0d] border-rose-900/80 text-rose-300"
                : "bg-[#111114] border-[#27272a] text-neutral-200"
            }`}
          >
            <div className="flex items-start justify-between gap-3 font-sans">
              <span className="font-medium text-xs leading-snug">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-[11px] font-mono text-neutral-400 hover:text-white px-1 cursor-pointer"
                aria-label="Close notification"
              >
                [x]
              </button>
            </div>
            {toast.txSignature && (
              <a
                href={getExplorerTxUrl(toast.txSignature, "devnet")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono underline underline-offset-2 opacity-90 hover:opacity-100 text-purple-400"
              >
                Open in Solana Explorer (devnet) -&gt;
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
