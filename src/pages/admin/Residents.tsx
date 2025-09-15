import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Download, Eye, Edit2, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockResidents, mockUnits } from '@/data/mockData';
import type { Resident } from '@/types';

const Residents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('all');

  // Get unit information for display
  const getUnitInfo = (unitId: string) => {
    const unit = mockUnits.find(u => u.id === unitId);
    return unit ? `${unit.building}${unit.number}` : 'N/A';
  };

  // Filter and search residents
  const filteredResidents = useMemo(() => {
    return mockResidents.filter(resident => {
      // Search filter
      const searchMatch = !searchQuery || 
        `${resident.firstName} ${resident.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resident.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getUnitInfo(resident.unitId).toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const statusMatch = statusFilter === 'all' || resident.ownershipType === statusFilter;

      // Payment status filter
      const paymentStatusMatch = paymentStatusFilter === 'all' || 
        (paymentStatusFilter === 'overdue' && resident.balance < 0) ||
        (paymentStatusFilter === 'current' && resident.balance >= 0);

      return searchMatch && statusMatch && paymentStatusMatch;
    });
  }, [searchQuery, statusFilter, paymentStatusFilter]);

  const getPaymentStatusBadge = (balance: number) => {
    if (balance < 0) {
      return <Badge variant="destructive">Overdue</Badge>;
    }
    return <Badge variant="secondary">Current</Badge>;
  };

  const formatBalance = (balance: number) => {
    if (balance < 0) {
      return `-$${Math.abs(balance).toFixed(2)}`;
    }
    return `$${balance.toFixed(2)}`;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Never';
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Residents</h1>
          <p className="text-muted-foreground">
            Manage resident information, payments, and communication.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Resident
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or unit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="tenant">Tenant</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Residents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockResidents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Owners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockResidents.filter(r => r.ownershipType === 'owner').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tenants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockResidents.filter(r => r.ownershipType === 'tenant').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockResidents.filter(r => r.balance < 0).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Residents Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResidents.map((resident) => (
                <TableRow key={resident.id}>
                  <TableCell className="font-medium">
                    {resident.firstName} {resident.lastName}
                  </TableCell>
                  <TableCell>{getUnitInfo(resident.unitId)}</TableCell>
                  <TableCell>{resident.email}</TableCell>
                  <TableCell>{resident.phone}</TableCell>
                  <TableCell>
                    <Badge variant={resident.ownershipType === 'owner' ? 'default' : 'secondary'}>
                      {resident.ownershipType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {getPaymentStatusBadge(resident.balance)}
                  </TableCell>
                  <TableCell className={resident.balance < 0 ? 'text-red-600' : 'text-green-600'}>
                    {formatBalance(resident.balance)}
                  </TableCell>
                  <TableCell>{formatDate(resident.lastPaymentAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredResidents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No residents found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Residents;