import type { Metadata } from "next";
import { AdminProtectedShell } from "../../components/admin/admin-protected-shell";

export const metadata: Metadata = {
  title: "Administration Portal | Sripalee College",
  description:
    "Secure administration portal for Sripalee College.",
};

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <AdminProtectedShell />
    </main>
  );
}