"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = { email: string; role: "admin" | "buyer" };
const STORAGE_KEY = "browza-session";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function AppHeader() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const read = () => {
      try { setUser(JSON.parse(localStorage.getItem(STORAGE_KEY) || "null")); }
      catch { setUser(null); }
    };
    read();
    const onStorage = (e: StorageEvent) => { if (e.key === STORAGE_KEY) read(); };
    const onFocus = () => read();
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    return () => { window.removeEventListener("storage", onStorage); window.removeEventListener("focus", onFocus); };
  }, []);

  const logout = async () => {
    try { await fetch(`${API_BASE}/auth/logout`, { method: "POST", credentials: "include" }); } catch {}
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = "role=; path=/; max-age=0; SameSite=Lax";
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-200">
      <div className="mx-auto max-w-7xl h-14 px-4 flex items-center justify-between">
        <span className="font-semibold tracking-wide">Browza</span>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-700 px-2 py-1 rounded-md bg-gray-100 border border-gray-200">
              {user.email} · {user.role}
            </span>
          )}
          <button className="text-sm text-gray-700 hover:text-gray-900" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
