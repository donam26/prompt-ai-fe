import {
  LayoutDashboard,
  FileText,
  Tag,
  Building,
  Users,
  Settings,
  BarChart3,
  Bell,
  MessageSquare,
  AlertTriangle,
  Globe,
  GraduationCap,
  Calendar,
  FileBarChart,
  User,
} from "lucide-react";
import type { SidebarItemType } from "@/components/admin/types/sidebar";

/**
 * Sidebar navigation configuration
 */
export const sidebarConfig: SidebarItemType[] = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    permission: "dashboard",
  },
  {
    name: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
    permission: "notifications",
    badge: {
      text: "1",
      variant: "destructive",
    },
  },
  {
    name: "Conversations",
    href: "/admin/conversations",
    icon: MessageSquare,
    permission: "conversations",
  },
  {
    name: "Incidents",
    href: "/admin/incidents",
    icon: AlertTriangle,
    permission: "incidents",
  },
  {
    name: "Communities",
    href: "/admin/communities",
    icon: Globe,
    permission: "communities",
  },
  {
    name: "Badges",
    href: "/admin/badges",
    icon: Tag,
    permission: "badges",
    children: [
      {
        name: "Management",
        href: "/admin/badges/management",
        icon: Settings,
        permission: "badge_management",
      },
      {
        name: "Request to Earn",
        href: "/admin/badges/requests",
        icon: FileText,
        permission: "badge_requests",
      },
    ],
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
    permission: "users",
  },
  {
    name: "Activities",
    href: "/admin/activities",
    icon: BarChart3,
    permission: "activities",
  },
  {
    name: "Classes",
    href: "/admin/classes",
    icon: GraduationCap,
    permission: "classes",
    children: [
      {
        name: "Management",
        href: "/admin/classes/management",
        icon: Settings,
        permission: "class_management",
      },
      {
        name: "Join Requests",
        href: "/admin/classes/join-requests",
        icon: FileText,
        permission: "class_requests",
      },
    ],
  },
  {
    name: "Reports",
    href: "/admin/reports",
    icon: FileBarChart,
    permission: "reports",
    children: [
      {
        name: "Grades",
        href: "/admin/reports/grades",
        icon: FileText,
        permission: "grade_reports",
      },
      {
        name: "Attendance",
        href: "/admin/reports/attendance",
        icon: FileText,
        permission: "attendance_reports",
      },
      {
        name: "Demographic",
        href: "/admin/reports/demographic",
        icon: FileText,
        permission: "demographic_reports",
      },
    ],
  },
  {
    name: "Events",
    href: "/admin/events",
    icon: Calendar,
    permission: "events",
    children: [
      {
        name: "Management",
        href: "/admin/events/management",
        icon: Settings,
        permission: "event_management",
      },
      {
        name: "Join Requests",
        href: "/admin/events/join-requests",
        icon: FileText,
        permission: "event_requests",
      },
    ],
  },
  {
    name: "My Profile",
    href: "/admin/profile",
    icon: User,
    permission: "profile",
  },
  {
    name: "Entity",
    href: "/admin/entity",
    icon: Building,
    permission: "entity",
    children: [
      {
        name: "Class Type",
        href: "/admin/entity/class-type",
        icon: FileText,
        permission: "class_type",
      },
      {
        name: "Class Name",
        href: "/admin/entity/class-name",
        icon: FileText,
        permission: "class_name",
      },
      {
        name: "Class Room",
        href: "/admin/entity/class-room",
        icon: FileText,
        permission: "class_room",
      },
      {
        name: "Semester",
        href: "/admin/entity/semester",
        icon: FileText,
        permission: "semester",
      },
    ],
  },
];
