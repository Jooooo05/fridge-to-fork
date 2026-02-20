import DashboardHeader from "@/components/shared/Dashboardheader";
import BottomNav from "@/components/shared/BottomNav";

export default function DashboardLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50">
        <DashboardHeader />

        {/* Main content area - padding top untuk header, bottom untuk bottom nav + input bar */}
        <main className="max-w-5xl mx-auto px-4 pt-20 pb-36">
            {children}
        </main>

        <BottomNav />
    </div>
  );
}