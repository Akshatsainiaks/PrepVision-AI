import { Outlet } from "react-router-dom";
import AppLayout from "./AppLayout";
import React from "react";

export default function ProtectedLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
