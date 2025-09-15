import React, { useState, useMemo } from 'react';
import { Search, Plus, Download, Eye, DollarSign, CreditCard, Calendar } from 'lucide-react';
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
import { StatCard } from '@/components/StatCard';
import { mockPayments, mockResidents, mockUnits } from '@/data/mockData';

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');

  // Calculate summary stats
  const totalCollected = mockPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalOutstanding = mockResidents
    .filter(r => r.balance < 0)
    .reduce((sum, r) => sum + Math.abs(r.balance), 0);

  const delinquencyRate = (mockResidents.filter(r => r.balance < 0).length / mockResidents.length * 100);

  const avgDaysOverdue = 15; // Mock calculation

  // Get resident and unit info for display
  const getResidentName = (residentId: string) => {
    const resident = mockResidents.find(r => r.id === residentId);
    return resident ? `${resident.firstName} ${resident.lastName}` : 'Unknown';
  };

  const getUnitInfo = (unitId: string) => {
    const unit = mockUnits.find(u => u.id === unitId);
    return unit ? `${unit.building}${unit.number}` : 'N/A';
  };

  // Filter payments
  const filteredPayments = useMemo(() => {
    return mockPayments.filter(payment => {
      const residentName = getResidentName(payment.residentId);
      const unitInfo = getUnitInfo(payment.unitId);
      
      const searchMatch = !searchQuery || 
        residentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unitInfo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.reference.toLowerCase().includes(searchQuery.toLowerCase());

      const statusMatch = statusFilter === 'all' || payment.status === statusFilter;
      const typeMatch = typeFilter === 'all' || payment.type === typeFilter;
      const methodMatch = methodFilter === 'all' || payment.method === methodFilter;

      return searchMatch && statusMatch && typeMatch && methodMatch;
    });
  }, [searchQuery, statusFilter, typeFilter, methodFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Paid</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getMethodBadge = (method: string) => {
    const methodMap = {
      card: { label: 'Card', variant: 'default' as const },
      ach: { label: 'ACH', variant: 'secondary' as const },
      check: { label: 'Check', variant: 'outline' as const },
      cash: { label: 'Cash', variant: 'outline' as const },
      manual: { label: 'Manual', variant: 'outline' as const },
    };
    
    const config = methodMap[method as keyof typeof methodMap] || { label: method, variant: 'outline' as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments & Collections</h1>
          <p className="text-muted-foreground">
            Track payments, manage assessments, and monitor collection performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Collected This Month"
          value={formatAmount(totalCollected)}
          change="+8.2%"
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Outstanding Total"
          value={formatAmount(totalOutstanding)}
          change={`${mockResidents.filter(r => r.balance < 0).length} units`}
          changeType="negative"
          icon={CreditCard}
        />
        <StatCard
          title="Delinquency Rate"
          value={`${delinquencyRate.toFixed(1)}%`}
          change="-2.1%"
          changeType="positive"
          icon={Calendar}
        />
        <StatCard
          title="Avg Days Overdue"
          value={`${avgDaysOverdue} days`}
          description="Collection period"
          icon={Calendar}
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by resident, unit, or reference..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="dues">Dues</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="fee">Fee</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="ach">ACH</SelectItem>
                <SelectItem value="check">Check</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Resident</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    {payment.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    {getResidentName(payment.residentId)}
                  </TableCell>
                  <TableCell>{getUnitInfo(payment.unitId)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {payment.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{getMethodBadge(payment.method)}</TableCell>
                  <TableCell className="font-medium">
                    {formatAmount(payment.amount)}
                  </TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {payment.reference}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No payments found matching your search criteria.</p>
        </div>
      )}

      {/* Placeholder Cards for Future Features */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Manager</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create and manage recurring dues and special assessments.
            </p>
            <Button className="w-full" disabled>
              <Plus className="mr-2 h-4 w-4" />
              Create Assessment
              <Badge variant="secondary" className="ml-2">TODO</Badge>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Autopay Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Set up and manage automatic payment processing.
            </p>
            <Button className="w-full" disabled>
              <CreditCard className="mr-2 h-4 w-4" />
              Configure Autopay
              <Badge variant="secondary" className="ml-2">Payments Integration TODO</Badge>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;