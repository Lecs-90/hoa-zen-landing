import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardOverview from "@/components/admin/DashboardOverview";
import AnnouncementsTab from "@/components/admin/AnnouncementsTab";
import ResidentsTab from "@/components/admin/ResidentsTab";
import EventsTab from "@/components/admin/EventsTab";
import SettingsTab from "@/components/admin/SettingsTab";

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "announcements":
        return <AnnouncementsTab />;
      case "residents":
        return <ResidentsTab />;
      case "events":
        return <EventsTab />;
      case "dues":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-foreground">Dues & Payments</h1>
            <p className="text-muted-foreground">Payment management features coming soon...</p>
          </div>
        );
      case "settings":
        return <SettingsTab />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-primary mr-2" />
              <div>
                <span className="text-xl font-bold text-foreground">HOA Hub</span>
                <p className="text-sm text-muted-foreground">Administrator Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, <span className="font-medium text-foreground">{user?.email}</span>
              </span>
              <Button variant="outline" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-73px)]">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;