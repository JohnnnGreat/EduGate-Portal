"use client";

import useAdminAuthState from "@/hooks/useAdminAuthState";
import React from "react";

const AdminAuthLayout = ({ children }) => {
   useAdminAuthState();

   return <div>{children}</div>;
};

export default AdminAuthLayout;
