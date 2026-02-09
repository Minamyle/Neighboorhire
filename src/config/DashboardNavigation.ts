import {
  LayoutDashboard,
  Briefcase,
  Wallet,
  Star,
  User,
  ClipboardList,
  CreditCard,
  LogOut,
} from "lucide-react";

export const dashboardNavigation = {
  artisan: [
    {
      label: "Overview",
      path: "/dashboard/artisan",
      icon: LayoutDashboard,
    },
    {
      label: "Jobs",
      path: "/dashboard/artisan/jobs",
      icon: Briefcase,
    },
    {
      label: "Earnings",
      path: "/dashboard/artisan/earnings",
      icon: Wallet,
    },
    {
      label: "Ratings",
      path: "/dashboard/artisan/ratings",
      icon: Star,
    },
  ],

  customer: [
    {
      label: "Overview",
      path: "/dashboard/customer",
      icon: LayoutDashboard,
    },
    {
      label: "Profile",
      path: "/dashboard/customer/profile",
      icon: User,
    },
    {
      label: "Job History",
      path: "/dashboard/customer/jobs",
      icon: ClipboardList,
    },
    {
      label: "Checkout",
      path: "/dashboard/customer/checkout",
      icon: CreditCard,
    },
  ],
};

export const dashboardFooterNav = {
  label: "Logout",
  action: "logout",
  icon: LogOut,
};
