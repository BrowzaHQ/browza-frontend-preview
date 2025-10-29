import type { Metadata } from "next";
import "./globals.css";
import Toaster from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Browza",
  description: "Browza app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-neutral-50">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
