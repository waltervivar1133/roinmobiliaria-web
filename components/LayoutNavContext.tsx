"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LayoutNavContextValue = {
  showNav: boolean;
  setShowNav: (show: boolean) => void;
};

const LayoutNavContext = createContext<LayoutNavContextValue | null>(null);

export function useLayoutNav() {
  const ctx = useContext(LayoutNavContext);
  if (!ctx) return { showNav: true, setShowNav: () => {} };
  return ctx;
}

export function LayoutNavProvider({ children }: { children: ReactNode }) {
  const [showNav, setShowNav] = useState(true);
  const value: LayoutNavContextValue = {
    showNav,
    setShowNav: useCallback((show: boolean) => setShowNav(show), []),
  };
  return (
    <LayoutNavContext.Provider value={value}>
      {showNav && <Header />}
      <main className={showNav ? "min-h-screen pt-[100.34px]" : "min-h-screen"}>
        {children}
      </main>
      {showNav && <Footer />}
    </LayoutNavContext.Provider>
  );
}
