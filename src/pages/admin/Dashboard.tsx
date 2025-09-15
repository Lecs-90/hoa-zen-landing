import React from 'react';
import { Users, DollarSign, Wrench, Calendar, Plus, FileText, UserPlus, Receipt } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockResidents, mockPayments, mockMaintenanceRequests, mockAnnouncements } from '@/data/mockData';

const Dashboard = () => {
  // Calculate stats from mock data
  const totalResidents = mockResidents.filter(r => !r.archived).length;
  const overdueUnits = mockResidents.filter(r => r.balance < 0).length;
  const openRequests = mockMaintenanceRequests.filter(r => r.status !== 'completed').length;
  const upcomingEvents = 2; // Mock upcoming events

  const recentActivity = [
    {
      id: '1',
      type: 'payment',
      title: 'Payment received from Sarah Johnson',
      time: '2 hours ago',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      id: '2',
      type: 'maintenance',
      title: 'New maintenance request - Unit A101',
      time: '4 hours ago',
      icon: Wrench,
      color: 'text-orange-600',
    },
    {
      id: '3',
      type: 'announcement',
      title: 'Pool maintenance announcement posted',
      time: '1 day ago',
      icon: FileText,
      color: 'text-blue-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening in your community.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Residents"
          value={totalResidents}
          change="+2 this month"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Units with Overdue Dues"
          value={overdueUnits}
          change="-1 from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Open Maintenance Requests"
          value={openRequests}
          change="2 urgent"
          changeType="negative"
          icon={Wrench}
        />
        <StatCard
          title="Upcoming Events"
          value={upcomingEvents}
          description="Next 7 days"
          icon={Calendar}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Create Announcement
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Resident
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Receipt className="mr-2 h-4 w-4" />
              Record Expense
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <DollarSign className="mr-2 h-4 w-4" />
              Create Assessment
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Collections Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Month's Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$15,750</div>
            <p className="text-sm text-muted-foreground">87% collected</p>
            <div className="mt-4 h-2 bg-muted rounded-full">
              <div className="h-2 bg-green-600 rounded-full" style={{ width: '87%' }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Outstanding Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$2,325</div>
            <p className="text-sm text-muted-foreground">From 3 units</p>
            <Badge variant="destructive" className="mt-2">
              Action Required
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Collection Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 days</div>
            <p className="text-sm text-muted-foreground">2 days improvement</p>
            <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
              Improved
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;