import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, LogIn, UserPlus, DollarSign } from "lucide-react";
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
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Home className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold">HOA Manager</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" onClick={() => scrollToSection('pricing')}>
              <DollarSign className="h-4 w-4 mr-2" />
              Pricing
            </Button>
            
            <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="admin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="admin">Admin Login</TabsTrigger>
                    <TabsTrigger value="resident">Resident Login</TabsTrigger>
                  </TabsList>
                  <TabsContent value="admin">
                    <LoginForm 
                      userType="admin"
                      onSuccess={() => setIsLoginDialogOpen(false)} 
                    />
                  </TabsContent>
                  <TabsContent value="resident">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-2">Resident Portal Coming Soon</p>
                      <p className="text-sm text-muted-foreground">
                        Resident login functionality will be available in a future update.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>

            <Dialog open={isSignupDialogOpen} onOpenChange={setIsSignupDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Admin Sign Up</DialogTitle>
                </DialogHeader>
                <SignupForm onSuccess={() => setIsSignupDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <LogIn className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="admin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                    <TabsTrigger value="resident">Resident</TabsTrigger>
                  </TabsList>
                  <TabsContent value="admin">
                    <LoginForm 
                      userType="admin"
                      onSuccess={() => setIsLoginDialogOpen(false)} 
                    />
                  </TabsContent>
                  <TabsContent value="resident">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-2">Coming Soon</p>
                      <p className="text-sm text-muted-foreground">
                        Resident login will be available soon.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>

            <Dialog open={isSignupDialogOpen} onOpenChange={setIsSignupDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Admin Sign Up</DialogTitle>
                </DialogHeader>
                <SignupForm onSuccess={() => setIsSignupDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;