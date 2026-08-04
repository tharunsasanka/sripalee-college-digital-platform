import type { Metadata } from "next";
import { AdminLoginForm } from "../../../components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Administrator Login | Sripalee College",
  description:
    "Secure login for approved Sripalee College administrators.",
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-16 sm:px-6">
      <AdminLoginForm />
    </main>
  );
}