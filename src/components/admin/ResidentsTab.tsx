import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Mail, Edit2, Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResidentsTab = () => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  // Mock data - will be replaced with real data later
  const residents = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      address: "123 Oak Street",
      role: "admin",
      status: "active"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      address: "456 Pine Avenue",
      role: "resident",
      status: "active"
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@email.com",
      address: "789 Maple Drive",
      role: "resident",
      status: "active"
    },
    {
      id: 4,
      name: "Lisa Wilson",
      email: "lisa.w@email.com",
      address: "321 Elm Court",
      role: "resident",
      status: "pending"
    }
  ];

  const handleInviteResident = () => {
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    // TODO: Implement actual invite functionality
    toast({
      title: "Success",
      description: `Invitation sent to ${email}`
    });
    
    setEmail("");
    setShowInviteForm(false);
  };

  const handleRoleChange = (residentId: number, newRole: string) => {
    // TODO: Implement role change functionality
    toast({
      title: "Success",
      description: `Role updated successfully`
    });
  };

  const handleStatusChange = (residentId: number, newStatus: string) => {
    // TODO: Implement status change functionality
    toast({
      title: "Success",
      description: `Status updated successfully`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Residents</h1>
          <p className="text-muted-foreground">Manage community members and access</p>
        </div>
        <Button onClick={() => setShowInviteForm(!showInviteForm)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Resident
        </Button>
      </div>

      {/* Invite Form */}
      {showInviteForm && (
        <Card className="feature-card">
          <CardHeader>
            <CardTitle>Invite New Resident</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter resident's email address..."
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleInviteResident}>
                <Mail className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
              <Button variant="outline" onClick={() => setShowInviteForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Residents Table */}
      <Card className="feature-card">
        <CardHeader>
          <CardTitle>Community Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {residents.map((resident) => (
                <TableRow key={resident.id}>
                  <TableCell className="font-medium">{resident.name}</TableCell>
                  <TableCell>{resident.email}</TableCell>
                  <TableCell>{resident.address}</TableCell>
                  <TableCell>
                    <Select
                      value={resident.role}
                      onValueChange={(value) => handleRoleChange(resident.id, value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="resident">Resident</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        resident.status === "active"
                          ? "default"
                          : resident.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {resident.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Ban className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResidentsTab;