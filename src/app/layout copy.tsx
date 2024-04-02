import React, { useState, useEffect } from "react";
import { AuthContextProvider } from "./context/authContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <AuthContextProvider>{children}</AuthContextProvider>
    </div>
  );
};

export default Layout;
