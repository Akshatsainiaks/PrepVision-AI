import { Outlet } from "react-router-dom";
// import AppLayout from "./AppLayout";
import Layout from "./Layout";
import React from "react";

export default function ProtectedLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
