import React, { useState } from 'react';
import { Plus, Filter, Eye, Edit2, Calendar, User, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockMaintenanceRequests, mockUnits, mockVendors } from '@/data/mockData';
import type { MaintenanceRequest } from '@/types';

const Maintenance = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const getUnitInfo = (unitId: string) => {
    if (!unitId) return 'Common Area';
    const unit = mockUnits.find(u => u.id === unitId);
    return unit ? `${unit.building}${unit.number}` : 'N/A';
  };

  const getVendorName = (vendorId?: string) => {
    if (!vendorId) return 'Unassigned';
    const vendor = mockVendors.find(v => v.id === vendorId);
    return vendor ? vendor.name : 'Unknown Vendor';
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { variant: 'secondary' as const, className: 'bg-blue-100 text-blue-800' },
      medium: { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      high: { variant: 'secondary' as const, className: 'bg-orange-100 text-orange-800' },
      urgent: { variant: 'destructive' as const, className: '' },
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.low;
    return (
      <Badge variant={config.variant} className={config.className}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'new': { variant: 'secondary' as const, className: 'bg-gray-100 text-gray-800' },
      'in-review': { variant: 'secondary' as const, className: 'bg-blue-100 text-blue-800' },
      'assigned': { variant: 'secondary' as const, className: 'bg-purple-100 text-purple-800' },
      'in-progress': { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      'completed': { variant: 'secondary' as const, className: 'bg-green-100 text-green-800' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    return (
      <Badge variant={config.variant} className={config.className}>
        {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </Badge>
    );
  };

  // Group requests by status for Kanban view
  const groupedRequests = mockMaintenanceRequests.reduce((acc, request) => {
    const status = request.status;
    if (!acc[status]) acc[status] = [];
    acc[status].push(request);
    return acc;
  }, {} as Record<string, MaintenanceRequest[]>);

  const statusColumns = [
    { key: 'new', title: 'New', color: 'border-gray-200' },
    { key: 'in-review', title: 'In Review', color: 'border-blue-200' },
    { key: 'assigned', title: 'Assigned', color: 'border-purple-200' },
    { key: 'in-progress', title: 'In Progress', color: 'border-yellow-200' },
    { key: 'completed', title: 'Completed', color: 'border-green-200' },
  ];

  const filteredRequests = mockMaintenanceRequests.filter(request => {
    const statusMatch = statusFilter === 'all' || request.status === statusFilter;
    const priorityMatch = priorityFilter === 'all' || request.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const RequestCard = ({ request }: { request: MaintenanceRequest }) => (
    <Card className="mb-3 cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-sm line-clamp-2">{request.title}</h4>
          {request.priority === 'urgent' && (
            <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 ml-2" />
          )}
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          {getPriorityBadge(request.priority)}
          <Badge variant="outline" className="text-xs">
            {request.category.replace('-', ' ')}
          </Badge>
        </div>
        
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {request.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {request.createdAt.toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {getUnitInfo(request.unitId)}
          </div>
        </div>
        
        {request.vendorId && (
          <div className="mt-2 text-xs text-muted-foreground">
            Assigned to: {getVendorName(request.vendorId)}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Maintenance & Work Orders</h1>
          <p className="text-muted-foreground">
            Manage maintenance requests, track progress, and coordinate with vendors.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <User className="mr-2 h-4 w-4" />
            Manage Vendors
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMaintenanceRequests.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockMaintenanceRequests.filter(r => r.status !== 'completed').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Urgent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockMaintenanceRequests.filter(r => r.priority === 'urgent').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2 days</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="kanban" className="w-full">
        <TabsList>
          <TabsTrigger value="kanban">Board View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="kanban" className="space-y-4">
          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {statusColumns.map((column) => (
              <div key={column.key} className={`border-t-4 ${column.color} bg-muted/20 rounded-lg p-4`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm">{column.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {groupedRequests[column.key]?.length || 0}
                  </Badge>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {groupedRequests[column.key]?.map((request) => (
                    <RequestCard key={request.id} request={request} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="space-y-4">
          {/* List View */}
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{request.title}</h4>
                          {getPriorityBadge(request.priority)}
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Unit: {getUnitInfo(request.unitId)}</span>
                          <span>Category: {request.category.replace('-', ' ')}</span>
                          <span>Created: {request.createdAt.toLocaleDateString()}</span>
                          {request.vendorId && <span>Vendor: {getVendorName(request.vendorId)}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Maintenance;