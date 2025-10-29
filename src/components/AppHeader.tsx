"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = { email: string; role: "admin" | "buyer"; userId?: string };

const STORAGE_KEY = "browza-session";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

/**
 * Self-contained header:
 * - reads user from localStorage("browza-session")
 * - listens to storage/focus to stay in sync
 * - calls /auth/logout, clears storage & cookie, then redirects to /login
 */
export default function AppHeader({ variant = "light" as "light" | "dark" }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        setUser(raw ? JSON.parse(raw) : null);
      } catch {
        setUser(null);
      }
    };
    read();
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) read();
    };
    const onFocus = () => read();
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {}
    try {
      localStorage.removeItem(STORAGE_KEY);
      // clear FE helper cookie (role)
      document.cookie = "role=; path=/; max-age=0; SameSite=Lax";
    } catch {}
    router.push("/login");
  };

  const base =
    "sticky top-0 z-40 w-full border-b";
  const light =
    "bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 text-gray-900 border-gray-200";
  const dark =
    "bg-[#0B0F19] text-gray-100/90 border-white/10";

  return (
    <header className={`${base} ${variant === "dark" ? dark : light}`}>
      <div className="mx-auto max-w-7xl h-14 px-4 flex items-center justify-between">
        <span className="font-semibold tracking-wide">Browza</span>
        <div className="flex items-center gap-4">
          {user && (
            <span
              className={
                variant === "dark" ? "text-sm text-gray-300" : "text-sm text-gray-700"
              }
            >
              {user.email} · {user.role}
            </span>
          )}
          <button
            onClick={logout}
            className={
              variant === "dark"
                ? "text-sm text-gray-300 hover:text-white transition"
                : "text-sm text-gray-700 hover:text-gray-900 transition"
            }
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
