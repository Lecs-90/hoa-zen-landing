import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Building2, 
  Users, 
  DollarSign, 
  Upload, 
  Mail, 
  Phone, 
  MapPin,
  Shield,
  Calendar,
  CreditCard
} from "lucide-react";

// Demo data
const demoSettings = {
  general: {
    hoaName: "Sunset Ridge HOA",
    address: "123 Main Street, Sunset Ridge, CA 90210",
    phone: "(555) 123-4567",
    email: "admin@sunsetridgehoa.com",
    website: "www.sunsetridgehoa.com"
  },
  boardMembers: [
    { id: 1, name: "John Smith", email: "john@sunsetridge.com", role: "President", permissions: ["Full Access"] },
    { id: 2, name: "Sarah Johnson", email: "sarah@sunsetridge.com", role: "Vice President", permissions: ["Announcements", "Residents"] },
    { id: 3, name: "Mike Chen", email: "mike@sunsetridge.com", role: "Treasurer", permissions: ["Financial", "Residents"] },
    { id: 4, name: "Lisa Rodriguez", email: "lisa@sunsetridge.com", role: "Secretary", permissions: ["Announcements", "Residents"] }
  ],
  financial: {
    monthlyDues: 150,
    dueDate: "1st of each month",
    lateFeeAmount: 25,
    lateFeeGracePeriod: 10,
    paymentMethods: ["Online", "Check", "Bank Transfer"]
  }
};

const SettingsTab = () => {
  const [settings, setSettings] = useState(demoSettings);
  const { toast } = useToast();

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  const GeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              HOA Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hoa-name">HOA Name</Label>
              <Input 
                id="hoa-name"
                value={settings.general.hoaName}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, hoaName: e.target.value }
                })}
                aria-describedby="hoa-name-help"
              />
              <p id="hoa-name-help" className="text-sm text-muted-foreground">
                The official name of your HOA community
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hoa-address">Address</Label>
              <Textarea 
                id="hoa-address"
                value={settings.general.address}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, address: e.target.value }
                })}
                rows={3}
                aria-describedby="hoa-address-help"
              />
              <p id="hoa-address-help" className="text-sm text-muted-foreground">
                Main address for HOA correspondence
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hoa-website">Website</Label>
              <Input 
                id="hoa-website"
                type="url"
                value={settings.general.website}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, website: e.target.value }
                })}
                placeholder="https://"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hoa-phone">Phone Number</Label>
              <Input 
                id="hoa-phone"
                type="tel"
                value={settings.general.phone}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, phone: e.target.value }
                })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hoa-email">Email Address</Label>
              <Input 
                id="hoa-email"
                type="email"
                value={settings.general.email}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, email: e.target.value }
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hoa-logo">HOA Logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Logo
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Recommended size: 200x200 pixels, PNG or JPG format
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => handleSave("General")}>
          Save General Settings
        </Button>
      </div>
    </div>
  );

  const BoardRolesSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Board Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {settings.boardMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{member.name}</h4>
                    <Badge variant="secondary">{member.role}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                  <div className="flex gap-1">
                    {member.permissions.map((permission) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Shield className="h-4 w-4 mr-1" />
                    Edit Permissions
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <h4 className="font-medium">Add New Board Member</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input placeholder="Full Name" />
              <Input type="email" placeholder="Email Address" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="president">President</SelectItem>
                  <SelectItem value="vice-president">Vice President</SelectItem>
                  <SelectItem value="treasurer">Treasurer</SelectItem>
                  <SelectItem value="secretary">Secretary</SelectItem>
                  <SelectItem value="director">Director</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Invite Board Member
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => handleSave("Board Roles")}>
          Save Board Settings
        </Button>
      </div>
    </div>
  );

  const FinancialSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Dues Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="monthly-dues">Monthly Dues Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="monthly-dues"
                  type="number"
                  value={settings.financial.monthlyDues}
                  onChange={(e) => setSettings({
                    ...settings,
                    financial: { ...settings.financial, monthlyDues: Number(e.target.value) }
                  })}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="due-date">Due Date</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={settings.financial.dueDate} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st">1st of each month</SelectItem>
                  <SelectItem value="15th">15th of each month</SelectItem>
                  <SelectItem value="last">Last day of month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Late Fee Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="late-fee">Late Fee Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="late-fee"
                  type="number"
                  value={settings.financial.lateFeeAmount}
                  onChange={(e) => setSettings({
                    ...settings,
                    financial: { ...settings.financial, lateFeeAmount: Number(e.target.value) }
                  })}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grace-period">Grace Period (days)</Label>
              <Input 
                id="grace-period"
                type="number"
                value={settings.financial.lateFeeGracePeriod}
                onChange={(e) => setSettings({
                  ...settings,
                  financial: { ...settings.financial, lateFeeGracePeriod: Number(e.target.value) }
                })}
              />
              <p className="text-sm text-muted-foreground">
                Days after due date before late fee applies
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Select which payment methods residents can use to pay their dues
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Online Portal", "Check", "Bank Transfer", "Credit Card", "Mobile Payment", "Cash"].map((method) => (
                <label key={method} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    defaultChecked={settings.financial.paymentMethods.includes(method)}
                  />
                  <span className="text-sm">{method}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => handleSave("Financial")}>
          Save Financial Settings
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:block">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="board-roles">Board Roles</TabsTrigger>
            <TabsTrigger value="financial">Financial Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <GeneralSettings />
          </TabsContent>
          
          <TabsContent value="board-roles" className="space-y-6">
            <BoardRolesSettings />
          </TabsContent>
          
          <TabsContent value="financial" className="space-y-6">
            <FinancialSettings />
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile Accordion */}
      <div className="block md:hidden">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="general">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                General Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <GeneralSettings />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="board-roles">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Board Roles
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <BoardRolesSettings />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="financial">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Financial Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <FinancialSettings />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default SettingsTab;