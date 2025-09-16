import { Users, UserCheck, Activity, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // Mock data - would come from API
  const metrics = [
    {
      title: "Total Members",
      value: "1,234",
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Active Trainers",
      value: "24",
      change: "+2 new this month",
      changeType: "positive" as const,
      icon: <UserCheck className="h-4 w-4" />,
    },
    {
      title: "Today's Attendance",
      value: "187",
      change: "+5% from yesterday",
      changeType: "positive" as const,
      icon: <Activity className="h-4 w-4" />,
    },
    {
      title: "Monthly Revenue",
      value: "$24,500",
      change: "+8% from last month",
      changeType: "positive" as const,
      icon: <DollarSign className="h-4 w-4" />,
    },
  ];

  const recentActivities = [
    { id: 1, type: "member_joined", user: "Alex Johnson", time: "2 minutes ago" },
    { id: 2, type: "payment_received", user: "Sarah Wilson", time: "15 minutes ago" },
    { id: 3, type: "class_scheduled", user: "Trainer Mike", time: "1 hour ago" },
    { id: 4, type: "equipment_maintenance", user: "Admin", time: "2 hours ago" },
  ];

  const upcomingClasses = [
    { id: 1, name: "Morning Yoga", trainer: "Sarah Wilson", time: "09:00 AM", participants: 12 },
    { id: 2, name: "HIIT Training", trainer: "Mike Johnson", time: "10:30 AM", participants: 8 },
    { id: 3, name: "Strength Training", trainer: "Alex Davis", time: "2:00 PM", participants: 15 },
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at FitGym today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Class
          </Button>
          <Button className="gym-button-primary text-primary-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <Card className="gym-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest updates from your gym</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.user}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {activity.type.replace('_', ' ')}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card className="gym-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Classes
            </CardTitle>
            <CardDescription>Today's scheduled classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{classItem.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {classItem.trainer} • {classItem.participants} participants
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-primary">{classItem.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;