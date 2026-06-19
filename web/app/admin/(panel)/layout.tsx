import { AdminDataProvider } from "@/components/admin/AdminDataProvider";
import Sidebar from "@/components/admin/Sidebar";

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminDataProvider>
      <div className="flex min-h-screen bg-bg-soft">
        <Sidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </AdminDataProvider>
  );
}
