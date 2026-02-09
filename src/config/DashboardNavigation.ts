import {
  LayoutDashboard,
  ClipboardList,
  Wrench,
  Wallet,
  Star,
  Calendar,
  User,
  Settings,
  LogOut,
  Search,
  ShoppingBag,
} from "lucide-react";

export const dashboardNavigation = {
  artisan: [
    {
      label: "Dashboard",
      path: "/artisan",
      icon: LayoutDashboard,
    },
    {
      label: "Jobs",
      path: "/artisan/jobs",
      icon: ClipboardList,
    },
    {
      label: "Services",
      path: "/artisan/services",
      icon: Wrench,
    },
    {
      label: "Earnings",
      path: "/artisan/earnings",
      icon: Wallet,
    },
    {
      label: "Reviews",
      path: "/artisan/reviews",
      icon: Star,
    },
    {
      label: "Schedule",
      path: "/artisan/schedule",
      icon: Calendar,
    },
    {
      label: "Profile",
      path: "/artisan/profile",
      icon: User,
    },
    {
      label: "Settings",
      path: "/artisan/settings",
      icon: Settings,
    },
  ],

  customer: [
    {
      label: "Dashboard",
      path: "/customer",
      icon: LayoutDashboard,
    },
    {
      label: "Find Artisans",
      path: "/customer/artisans",
      icon: Search,
    },
    {
      label: "My Orders",
      path: "/customer/orders",
      icon: ShoppingBag,
    },
    {
      label: "Reviews",
      path: "/customer/reviews",
      icon: Star,
    },
    {
      label: "Profile",
      path: "/customer/profile",
      icon: User,
    },
    {
      label: "Settings",
      path: "/customer/settings",
      icon: Settings,
    },
  ],
};

export const logoutNavItem = {
  label: "Logout",
  action: "logout",
  icon: LogOut,
};
