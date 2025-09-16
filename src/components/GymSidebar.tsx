import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Activity
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const adminMenuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Members", url: "/members", icon: Users },
  { title: "Trainers", url: "/trainers", icon: UserCheck },
  { title: "Schedule", url: "/schedule", icon: Calendar },
  { title: "Attendance", url: "/attendance", icon: Activity },
  { title: "Payments", url: "/payments", icon: CreditCard },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

const trainerMenuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "My Schedule", url: "/my-schedule", icon: Calendar },
  { title: "Attendance", url: "/attendance", icon: Activity },
  { title: "Members", url: "/members", icon: Users },
];

const memberMenuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Schedule", url: "/schedule", icon: Calendar },
  { title: "Attendance", url: "/my-attendance", icon: Activity },
  { title: "Payments", url: "/my-payments", icon: CreditCard },
];

export function GymSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // TODO: Get user role from authentication context
  const userRole = "admin" as "admin" | "trainer" | "member"; // This would come from auth context
  
  const getMenuItems = () => {
    if (userRole === "trainer") {
      return trainerMenuItems;
    } else if (userRole === "member") {
      return memberMenuItems;
    } else {
      return adminMenuItems;
    }
  };

  const menuItems = getMenuItems();
  const isActive = (path: string) => currentPath === path;
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={cn("border-r border-border transition-all duration-300", collapsed ? "w-16" : "w-64")} collapsible="icon">
      <SidebarContent className="bg-gradient-to-b from-card to-card/80">
        {/* Logo Section */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-dark">
              <Dumbbell className="h-6 w-6 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg text-foreground">FitGym</h2>
                <p className="text-xs text-muted-foreground capitalize">{userRole} Panel</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={cn("text-muted-foreground font-medium", collapsed && "sr-only")}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "w-full justify-start transition-all duration-200 hover:bg-primary/10",
                      isActive(item.url) && "gym-sidebar-active"
                    )}
                  >
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Info (bottom) */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                <span className="text-accent-foreground font-medium text-sm">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">John Doe</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}