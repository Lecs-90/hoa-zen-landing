import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AdminLayout from "@/components/layout/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Residents from "@/pages/admin/Residents";
import Payments from "@/pages/admin/Payments";
import Maintenance from "@/pages/admin/Maintenance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="residents" element={<Residents />} />
              <Route path="payments" element={<Payments />} />
              <Route path="maintenance" element={<Maintenance />} />
              <Route path="announcements" element={<div className="p-8 text-center text-muted-foreground">Announcements page coming soon...</div>} />
              <Route path="documents" element={<div className="p-8 text-center text-muted-foreground">Documents page coming soon...</div>} />
              <Route path="reports" element={<div className="p-8 text-center text-muted-foreground">Reports page coming soon...</div>} />
              <Route path="settings" element={<div className="p-8 text-center text-muted-foreground">Settings page coming soon...</div>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
