"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((text: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setMessage(text);
    timerRef.current = setTimeout(() => {
      setMessage(null);
      timerRef.current = null;
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed bottom-10 left-1/2 z-[100] -translate-x-1/2"
          >
            <div className="rounded-sm border border-[#D4AF37]/25 bg-[#0a0a0c]/90 px-6 py-3 font-serif text-sm tracking-wide text-[#D4AF37]/90 shadow-[0_0_40px_rgba(212,175,55,0.12)] backdrop-blur-md">
              {message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}
