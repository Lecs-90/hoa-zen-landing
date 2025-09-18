import { Home, Megaphone, Users, CreditCard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "residents", label: "Residents", icon: Users },
  { id: "dues", label: "Dues & Payments", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
];

const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-full">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-sidebar-foreground">HOA Hub</h2>
        <p className="text-sm text-sidebar-foreground/60">Admin Dashboard</p>
      </div>
      
      <nav className="px-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center px-3 py-2.5 mb-1 rounded-lg text-left transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;