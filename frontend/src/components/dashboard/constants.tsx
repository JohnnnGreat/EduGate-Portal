import { Home, DollarSign, Book, FileText, User, Settings, LifeBuoy, Megaphone } from "lucide-react";

export const dashboardSideNav = [
   {
      title: "Home",
      icon: <Home />,
      href: "/accounts/user/dashboard",
   },
   {
      title: "Application",
      icon: <Home />,
      href: "/accounts/user/dashboard/process-admission",
   },
   {
      title: "Fees",
      icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
         >
            <path d="M12 1v22M1 12h22" />
            <path d="M7 7c1.75-1.5 3.5-2.5 5-2.5s3.25 1 5 2.5M7 17c1.75 1.5 3.5 2.5 5 2.5s3.25-1 5-2.5" />
            <circle
               cx="12"
               cy="12"
               r="10"
            />
         </svg>
      ),
      href: "fees",
   },
   {
      title: "Results",
      icon: <FileText />,
      href: "/results",
   },
   {
      title: "Library",
      icon: <Book />,
      href: "/library",
   },
   {
      title: "Hostel",
      icon: <Home />, // or use a different icon such as 'Bed'
      href: "/hostel",
   },
   {
      title: "Profile",
      icon: <User />,
      href: "/profile?email",
   },
   {
      title: "Settings",
      icon: <Settings />,
      href: "/settings",
   },
   {
      title: "Support",
      icon: <LifeBuoy />,
      href: "/support",
   },
   {
      title: "Announcement",
      icon: <Megaphone />,
      href: "/announcement",
   },
];
