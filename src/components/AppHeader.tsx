"use client";

import { useSession } from "@/lib/useSession"; // your hook
export default function AppHeader() {
  const { user, logout } = useSession();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F19] text-gray-100/90 border-b border-white/10">
      <div className="mx-auto max-w-7xl h-12 px-4 flex items-center justify-between">
        <span className="font-semibold tracking-wide">Browza</span>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-300">
              {user.email} · {user.role}
            </span>
          )}
          <button
            onClick={logout}
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
