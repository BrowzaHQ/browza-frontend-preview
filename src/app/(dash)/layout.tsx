import AppHeader from "@/components/AppHeader";

export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-neutral-50">
      <AppHeader />
      <main className="mx-auto max-w-7xl p-6 text-gray-900">
        {children}
      </main>
    </div>
  );
}
