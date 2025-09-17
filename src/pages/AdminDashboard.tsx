import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";

const AdminDashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold">HOA Manager - Admin</span>
            </div>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-background rounded-lg shadow-elegant p-8">
            <h1 className="text-3xl font-bold mb-4 text-primary">
              Welcome to the Admin Dashboard
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Hello <span className="font-semibold text-foreground">{user?.email}</span>!
            </p>
            <p className="text-muted-foreground">
              Your admin dashboard is ready. This is where you'll manage your HOA community, 
              residents, payments, and more. Full dashboard features coming soon!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;