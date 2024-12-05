import { Home, DollarSign, Book, FileText, User, Settings, LifeBuoy, Megaphone, BookOpen, CheckCircle, Users, Info } from "lucide-react";

export const adminDashboard = [
   {
      title: "Home",
      icon: (
         <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M13.3334 12.6668V7.00016C13.3334 6.89667 13.3093 6.79459 13.263 6.70202C13.2167 6.60945 13.1495 6.52893 13.0667 6.46683L8.40002 2.96683C8.28462 2.88028 8.14427 2.8335 8.00002 2.8335C7.85577 2.8335 7.71542 2.88028 7.60002 2.96683L2.93335 6.46683C2.85056 6.52893 2.78335 6.60945 2.73707 6.70202C2.69078 6.79459 2.66669 6.89667 2.66669 7.00016V12.6668C2.66669 12.8436 2.73693 13.0132 2.86195 13.1382C2.98697 13.2633 3.15654 13.3335 3.33335 13.3335H6.00002C6.17683 13.3335 6.3464 13.2633 6.47142 13.1382C6.59645 13.0132 6.66669 12.8436 6.66669 12.6668V10.6668C6.66669 10.49 6.73692 10.3204 6.86195 10.1954C6.98697 10.0704 7.15654 10.0002 7.33335 10.0002H8.66669C8.8435 10.0002 9.01307 10.0704 9.13809 10.1954C9.26312 10.3204 9.33335 10.49 9.33335 10.6668V12.6668C9.33335 12.8436 9.40359 13.0132 9.52862 13.1382C9.65364 13.2633 9.82321 13.3335 10 13.3335H12.6667C12.8435 13.3335 13.0131 13.2633 13.1381 13.1382C13.2631 13.0132 13.3334 12.8436 13.3334 12.6668Z"
               stroke="black"
               stroke-opacity="0.42"
               stroke-linecap="round"
               stroke-linejoin="round"
            />
         </svg>
      ),
      href: "/accounts/user/dashboard",
   },
   {
      title: "Staffs",
      icon: (
         <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M2 14V12.6667C2 11.9594 2.28095 11.2811 2.78105 10.781C3.28115 10.281 3.95942 10 4.66667 10H7.33333C8.04058 10 8.71885 10.281 9.21895 10.781C9.71905 11.2811 10 11.9594 10 12.6667V14M10.6667 2.08667C11.2403 2.23353 11.7487 2.56713 12.1118 3.03487C12.4748 3.50261 12.6719 4.07789 12.6719 4.67C12.6719 5.26211 12.4748 5.83739 12.1118 6.30513C11.7487 6.77287 11.2403 7.10647 10.6667 7.25333M14 14V12.6667C13.9966 12.0781 13.7986 11.5072 13.4368 11.0429C13.0751 10.5787 12.5699 10.2471 12 10.1M3.33333 4.66667C3.33333 5.37391 3.61428 6.05219 4.11438 6.55229C4.61448 7.05238 5.29276 7.33333 6 7.33333C6.70724 7.33333 7.38552 7.05238 7.88562 6.55229C8.38572 6.05219 8.66667 5.37391 8.66667 4.66667C8.66667 3.95942 8.38572 3.28115 7.88562 2.78105C7.38552 2.28095 6.70724 2 6 2C5.29276 2 4.61448 2.28095 4.11438 2.78105C3.61428 3.28115 3.33333 3.95942 3.33333 4.66667Z"
               stroke="black"
               stroke-opacity="0.42"
               stroke-linecap="round"
               stroke-linejoin="round"
            />
         </svg>
      ),
      sub: [
         {
            title: "All Staff",
            href: "/accounts/ict/dashboard/staff/add-staff",
         },
         {
            title: "Add New Staff",
            href: "/accounts/ict/dashboard/staff/add-staff",
         },
         {
            title: "Staff Profiles",
            href: "/accounts/ict/dashboard/payments/verification",
         },
         {
            title: "Department Management",
            href: "/accounts/ict/dashboard/payments/generate-records",
         },
         {
            title: "Roles and Permissions",
            href: "/accounts/ict/dashboard/payments/payments-settings",
         },
         {
            title: "Attendance & Leave",
            href: "/accounts/ict/dashboard/payments/payments-settings",
         },
         {
            title: "Performance Evaluation",
            href: "/accounts/ict/dashboard/payments/payments-settings",
         },
         {
            title: "Retirement & Exit",
            href: "/accounts/ict/dashboard/payments/payments-settings",
         },
      ],
   },
   {
      title: "Payments",
      icon: (
         <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M14.6666 7.99984C14.6666 5.48584 14.6666 4.2285 13.8853 3.44784C13.104 2.66717 11.8473 2.6665 9.33331 2.6665H6.66665C4.15265 2.6665 2.89531 2.6665 2.11465 3.44784C1.33398 4.22917 1.33331 5.48584 1.33331 7.99984C1.33331 10.5138 1.33331 11.7712 2.11465 12.5518C2.89598 13.3325 4.15265 13.3332 6.66665 13.3332H9.33331C11.8473 13.3332 13.1046 13.3332 13.8853 12.5518C14.3213 12.1165 14.514 11.5332 14.5986 10.6665M6.66665 10.6665H3.99998M9.33331 10.6665H8.33331M1.33331 6.6665H4.66665M14.6666 6.6665H7.33331"
               stroke="black"
               stroke-opacity="0.42"
               stroke-linecap="round"
            />
         </svg>
      ),

      sub: [
         {
            title: "Overview",
            href: "/accounts/ict/dashboard/payments/overview",
         },
         {
            title: "Payments Record",
            href: "/accounts/ict/dashboard/payments/records",
         },
         {
            title: "Payments Verification",
            href: "/accounts/ict/dashboard/payments/verification",
         },
         {
            title: "Generate Payments Record",
            href: "/accounts/ict/dashboard/payments/generate-records",
         },
         {
            title: "Payments Settings",
            href: "/accounts/ict/dashboard/payments/payments-settings",
         },
      ],
   },
   {
      title: "Hostel",
      icon: (
         <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               fill-rule="evenodd"
               clip-rule="evenodd"
               d="M12.5 12.618C12.807 12.343 13 11.944 13 11.5V6.97695C13.0001 6.7472 12.9473 6.5205 12.8459 6.31435C12.7445 6.1082 12.5971 5.9281 12.415 5.78795L8.915 3.09595C8.65271 2.89404 8.331 2.78455 8 2.78455C7.669 2.78455 7.34729 2.89404 7.085 3.09595L3.585 5.78795C3.40281 5.9282 3.2553 6.10846 3.15386 6.3148C3.05243 6.52114 2.99979 6.74803 3 6.97795V11.5C2.99947 11.6965 3.03768 11.8912 3.11244 12.073C3.1872 12.2548 3.29704 12.42 3.43569 12.5593C3.57434 12.6986 3.73908 12.8092 3.9205 12.8848C4.10192 12.9604 4.29646 12.9996 4.493 13H5V9.49995C5 8.96952 5.21071 8.46081 5.58579 8.08574C5.96086 7.71067 6.46957 7.49995 7 7.49995H9C9.53043 7.49995 10.0391 7.71067 10.4142 8.08574C10.7893 8.46081 11 8.96952 11 9.49995V13H11.507C11.888 12.998 12.237 12.854 12.5 12.618ZM14.5 11.5C14.5 12.2956 14.1839 13.0587 13.6213 13.6213C13.0587 14.1839 12.2956 14.5 11.5 14.5H4.5C3.70435 14.5 2.94129 14.1839 2.37868 13.6213C1.81607 13.0587 1.5 12.2956 1.5 11.5V6.97695C1.50003 6.51761 1.60554 6.06442 1.80839 5.6523C2.01124 5.24018 2.30602 4.88015 2.67 4.59995L6.17 1.90795C6.69458 1.50413 7.33799 1.28516 8 1.28516C8.66201 1.28516 9.30542 1.50413 9.83 1.90795L13.33 4.59995C13.6941 4.88025 13.989 5.24045 14.1918 5.65275C14.3947 6.06505 14.5001 6.51845 14.5 6.97795V11.5ZM9.5 9.49995C9.5 9.36734 9.44732 9.24017 9.35355 9.1464C9.25979 9.05263 9.13261 8.99995 9 8.99995H7C6.86739 8.99995 6.74021 9.05263 6.64645 9.1464C6.55268 9.24017 6.5 9.36734 6.5 9.49995V13H9.5V9.49995Z"
               fill="black"
               fill-opacity="0.42"
            />
         </svg>
      ),
      sub: [
         {
            title: "Hostel Allocation",
            href: "/accounts/ict/dashboard/hostel/hostel-allocation",
         },
         {
            title: "Hostel Rooms",
            href: "/accounts/ict/dashboard/hostel/hostel-rooms",
         },
         {
            title: "Payment Management",
            href: "/accounts/ict/dashboard/hostel/payment-mgt",
         },

         {
            title: "Hostel Reports",
            href: "/accounts/ict/dashboard/hostel/hostel-reports",
         },
         {
            title: "Hostel Maintenance",
            href: "/accounts/ict/dashboard/hostel/hostel-maintenance",
         },
         {
            title: "Student Feedback",
            href: "/accounts/ict/dashboard/hostel/feedbacks",
         },
         {
            title: "Settings",
            href: "/accounts/ict/dashboard/hostel/settings",
         },
      ],
   },
   {
      title: "Course Registration",
      icon: (
         <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M15 9.75V4.31175C15 4.25255 14.9884 4.19392 14.9658 4.13922C14.9431 4.08453 14.9099 4.03484 14.868 3.993L12.507 1.632C12.4227 1.54758 12.3083 1.50011 12.189 1.5H3.45C3.33065 1.5 3.21619 1.54741 3.1318 1.6318C3.04741 1.71619 3 1.83065 3 1.95V16.05C3 16.1693 3.04741 16.2838 3.1318 16.3682C3.21619 16.4526 3.33065 16.5 3.45 16.5H10.5"
               stroke="black"
               stroke-opacity="0.42"
               stroke-linecap="round"
               stroke-linejoin="round"
            />
            <path
               d="M12 1.5V4.05C12 4.16935 12.0474 4.28381 12.1318 4.3682C12.2162 4.45259 12.3307 4.5 12.45 4.5H15M12 14.25H16.5M16.5 14.25L14.25 12M16.5 14.25L14.25 16.5"
               stroke="black"
               stroke-opacity="0.42"
               stroke-linecap="round"
               stroke-linejoin="round"
            />
         </svg>
      ),
      href: "/accounts/user/dashboard/course-registration",
   },
   {
      title: "Support",
      icon: (
         <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               fill-rule="evenodd"
               clip-rule="evenodd"
               d="M14.85 7.63501C14.6175 5.25001 13.2075 1.5 8.85003 1.5C4.49252 1.5 3.08251 5.25001 2.85002 7.63501C2.03439 7.94456 1.4964 8.72763 1.50002 9.6V10.65C1.50002 11.8098 2.44024 12.75 3.60001 12.75C4.75981 12.75 5.70003 11.8098 5.70003 10.65V9.6C5.69623 8.74644 5.17803 7.97947 4.38751 7.65751C4.53752 6.27749 5.27253 3.00001 8.85003 3.00001C12.4275 3.00001 13.155 6.27749 13.305 7.65751C12.5161 7.98018 12.0005 8.74767 12 9.6V10.65C12.0016 11.0452 12.1143 11.4319 12.3252 11.7661C12.536 12.1003 12.8366 12.3684 13.1925 12.54C12.8775 13.1325 12.075 13.935 10.1025 14.175C9.70823 13.5763 8.94537 13.3402 8.28183 13.6117C7.61833 13.8831 7.23959 14.5861 7.37797 15.2895C7.51634 15.9929 8.13312 16.5 8.85003 16.5C9.12781 16.4985 9.39971 16.4198 9.63542 16.2728C9.87113 16.1258 10.0614 15.9163 10.185 15.6675C13.4025 15.3 14.43 13.6425 14.7525 12.6675C15.625 12.3849 16.2118 11.5671 16.2 10.65V9.6C16.2036 8.72763 15.6656 7.94456 14.85 7.63501ZM4.20002 10.65C4.20002 10.9814 3.93139 11.25 3.60001 11.25C3.26862 11.25 3.00003 10.9814 3.00003 10.65V9.6C2.99942 9.52082 3.0145 9.44231 3.04438 9.36898C3.07426 9.29565 3.11836 9.22897 3.17413 9.17276C3.22991 9.11656 3.29625 9.07195 3.36935 9.04151C3.44244 9.01107 3.52084 8.9954 3.60002 8.9954C3.67921 8.9954 3.7576 9.01107 3.8307 9.04151C3.90379 9.07195 3.97014 9.11656 4.02592 9.17276C4.08169 9.22897 4.12579 9.29565 4.15567 9.36898C4.18555 9.44231 4.20062 9.52082 4.20002 9.6V10.65ZM13.5 9.6C13.5 9.26862 13.7686 8.99999 14.1 8.99999C14.4314 8.99999 14.7 9.26862 14.7 9.6V10.65C14.7 10.9814 14.4314 11.25 14.1 11.25C13.7686 11.25 13.5 10.9814 13.5 10.65V9.6Z"
               fill="black"
               fill-opacity="0.42"
            />
         </svg>
      ),
      href: "/library",
   },

   {
      title: "Admission",
      icon: (
         <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M14.6666 6.00016L7.99998 3.3335L1.33331 6.00016L7.99998 8.66683L14.6666 6.00016ZM14.6666 6.00016V10.0002"
               stroke="black"
               stroke-opacity="0.42"
               stroke-linecap="round"
               stroke-linejoin="round"
            />
            <path
               d="M4 7.06689V10.6669C4 11.1973 4.42143 11.706 5.17157 12.0811C5.92172 12.4562 6.93913 12.6669 8 12.6669C9.06087 12.6669 10.0783 12.4562 10.8284 12.0811C11.5786 11.706 12 11.1973 12 10.6669V7.06689"
               stroke="black"
               stroke-opacity="0.42"
               stroke-linecap="round"
               stroke-linejoin="round"
            />
         </svg>
      ),
      href: "/accounts/user/dashboard/profile",
   },
   {
      title: "Results",
      icon: (
         <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M2.66669 2.66683V13.3335C2.66669 13.6871 2.80716 14.0263 3.05721 14.2763C3.30726 14.5264 3.6464 14.6668 4.00002 14.6668H12C12.3536 14.6668 12.6928 14.5264 12.9428 14.2763C13.1929 14.0263 13.3334 13.6871 13.3334 13.3335V5.5615C13.3333 5.38387 13.2978 5.20804 13.2289 5.04433C13.16 4.88061 13.059 4.73232 12.932 4.60816L9.97202 1.7135C9.72293 1.46993 9.3884 1.33354 9.04002 1.3335H4.00002C3.6464 1.3335 3.30726 1.47397 3.05721 1.72402C2.80716 1.97407 2.66669 2.31321 2.66669 2.66683Z"
               stroke="black"
               stroke-opacity="0.42"
               stroke-linecap="round"
               stroke-linejoin="round"
            />
            <path
               d="M9.33337 1.3335V4.00016C9.33337 4.35378 9.47385 4.69292 9.7239 4.94297C9.97395 5.19302 10.3131 5.3335 10.6667 5.3335H13.3334"
               stroke="black"
               stroke-opacity="0.42"
               stroke-linejoin="round"
            />
         </svg>
      ),
      href: "/settings",
   },
   {
      title: "Disciplinary Board",
      icon: (
         <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M6 2H2.66667C2.48986 2 2.32029 2.07024 2.19526 2.19526C2.07024 2.32029 2 2.48986 2 2.66667V6C2 6.17681 2.07024 6.34638 2.19526 6.4714C2.32029 6.59643 2.48986 6.66667 2.66667 6.66667H6C6.17681 6.66667 6.34638 6.59643 6.4714 6.4714C6.59643 6.34638 6.66667 6.17681 6.66667 6V2.66667C6.66667 2.48986 6.59643 2.32029 6.4714 2.19526C6.34638 2.07024 6.17681 2 6 2ZM6 9.33333H2.66667C2.48986 9.33333 2.32029 9.40357 2.19526 9.5286C2.07024 9.65362 2 9.82319 2 10V13.3333C2 13.5101 2.07024 13.6797 2.19526 13.8047C2.32029 13.9298 2.48986 14 2.66667 14H6C6.17681 14 6.34638 13.9298 6.4714 13.8047C6.59643 13.6797 6.66667 13.5101 6.66667 13.3333V10C6.66667 9.82319 6.59643 9.65362 6.4714 9.5286C6.34638 9.40357 6.17681 9.33333 6 9.33333ZM11.6667 6.66667C11.9731 6.66667 12.2765 6.60631 12.5596 6.48905C12.8427 6.37179 13.0999 6.19992 13.3166 5.98325C13.5333 5.76658 13.7051 5.50935 13.8224 5.22626C13.9396 4.94317 14 4.63975 14 4.33333C14 4.02692 13.9396 3.7235 13.8224 3.44041C13.7051 3.15731 13.5333 2.90009 13.3166 2.68342C13.0999 2.46675 12.8427 2.29488 12.5596 2.17761C12.2765 2.06035 11.9731 2 11.6667 2C11.0478 2 10.4543 2.24583 10.0168 2.68342C9.57917 3.121 9.33333 3.71449 9.33333 4.33333C9.33333 4.95217 9.57917 5.54566 10.0168 5.98325C10.4543 6.42083 11.0478 6.66667 11.6667 6.66667ZM13.3333 9.33333H10C9.82319 9.33333 9.65362 9.40357 9.5286 9.5286C9.40357 9.65362 9.33333 9.82319 9.33333 10V13.3333C9.33333 13.5101 9.40357 13.6797 9.5286 13.8047C9.65362 13.9298 9.82319 14 10 14H13.3333C13.5101 14 13.6797 13.9298 13.8047 13.8047C13.9298 13.6797 14 13.5101 14 13.3333V10C14 9.82319 13.9298 9.65362 13.8047 9.5286C13.6797 9.40357 13.5101 9.33333 13.3333 9.33333Z"
               stroke="black"
               stroke-opacity="0.42"
               stroke-linejoin="round"
            />
         </svg>
      ),
      href: "/support",
   },
   {
      title: "Announcement",
      icon: (
         <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               fill-rule="evenodd"
               clip-rule="evenodd"
               d="M12.6667 3.16061V5.33328C12.9293 5.33328 13.1894 5.38501 13.432 5.48552C13.6747 5.58603 13.8952 5.73335 14.0809 5.91906C14.2666 6.10478 14.4139 6.32526 14.5144 6.56791C14.6149 6.81056 14.6667 7.07063 14.6667 7.33328C14.6667 7.59592 14.6149 7.85599 14.5144 8.09865C14.4139 8.3413 14.2666 8.56177 14.0809 8.74749C13.8952 8.93321 13.6747 9.08053 13.432 9.18104C13.1894 9.28155 12.9293 9.33328 12.6667 9.33328V11.3333C12.6667 12.4319 11.4127 13.0593 10.5333 12.3999L9.15999 11.3693C8.42587 10.8189 7.57115 10.4514 6.66666 10.2973V12.1933C6.66673 12.6291 6.50926 13.0503 6.22326 13.3791C5.93726 13.708 5.54203 13.9224 5.11041 13.9828C4.67878 14.0432 4.23987 13.9456 3.87458 13.7078C3.50929 13.4701 3.24224 13.1084 3.12266 12.6893L2.07599 9.02528C1.69934 8.58047 1.45422 8.03942 1.36819 7.46295C1.28215 6.88648 1.35862 6.29744 1.58898 5.76204C1.81935 5.22664 2.19449 4.76611 2.67223 4.43221C3.14997 4.09831 3.71137 3.90429 4.29333 3.87194L6.30533 3.75994C7.28976 3.70526 8.24713 3.4176 9.09866 2.92061L10.6613 2.00861C11.5507 1.49061 12.6667 2.13128 12.6667 3.16061ZM3.75599 10.0519L4.40466 12.3233C4.43588 12.4332 4.50582 12.5282 4.60158 12.5906C4.69733 12.653 4.81243 12.6786 4.92561 12.6628C5.0388 12.6469 5.14243 12.5906 5.21737 12.5044C5.29231 12.4181 5.3335 12.3076 5.33333 12.1933V10.1866L4.29333 10.1286C4.11243 10.1177 3.93272 10.0921 3.75599 10.0519ZM11.3333 3.16061L9.76999 4.07328C8.82062 4.62775 7.76139 4.96771 6.66666 5.06928V8.94861C7.85799 9.11261 8.99199 9.57728 9.95999 10.3026L11.3333 11.3333V3.16061ZM5.33333 5.14928L4.36666 5.20261C3.91696 5.22744 3.4929 5.41996 3.1782 5.74216C2.86351 6.06436 2.68103 6.49283 2.6668 6.94299C2.65256 7.39316 2.80761 7.8323 3.10133 8.17373C3.39505 8.51517 3.80609 8.73409 4.25333 8.78728L4.36666 8.79728L5.33333 8.85061V5.14928ZM12.6667 6.66661V7.99994C12.8366 7.99976 13 7.93469 13.1236 7.81805C13.2471 7.7014 13.3215 7.54198 13.3314 7.37235C13.3414 7.20272 13.2862 7.03569 13.1772 6.90539C13.0681 6.77509 12.9134 6.69135 12.7447 6.67128L12.6667 6.66661Z"
               fill="black"
               fill-opacity="0.42"
            />
         </svg>
      ),
      href: "/announcement",
   },
];
