import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, User, LogIn } from "lucide-react";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Header = () => {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Home className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold">HOA Manager</span>
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-4">
            <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Admin Access
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Admin Access</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login">
                    <LoginForm onSuccess={() => setIsAuthDialogOpen(false)} />
                  </TabsContent>
                  <TabsContent value="signup">
                    <SignupForm onSuccess={() => setIsAuthDialogOpen(false)} />
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;