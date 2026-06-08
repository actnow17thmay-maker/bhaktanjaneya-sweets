"use client";

import { AdminProvider, useAdmin } from "@/context/AdminContext";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminShell } from "@/components/admin/AdminShell";

function AdminGate({ children }: { children: React.ReactNode }) {
  const { hydrated, session } = useAdmin();

  // Avoid an auth flash before localStorage is read.
  if (!hydrated) return <div className="min-h-screen bg-cream-50" />;
  if (!session) return <AdminLogin />;
  return <AdminShell>{children}</AdminShell>;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <AdminGate>{children}</AdminGate>
    </AdminProvider>
  );
}
