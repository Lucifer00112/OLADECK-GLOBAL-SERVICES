import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminPostManager } from "@/components/admin/admin-post-manager";

export const metadata: Metadata = {
  title: "AI Content Studio — OLADECK Admin",
  description: "Upload cleared vehicle posts with automatic AI Truth Social captions and customs documentation."
};

export default async function AdminPostsPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-7xl mx-auto">
      <AdminPostManager />
    </div>
  );
}
