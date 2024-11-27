import React from "react";
import { NavBar } from "./Navbar.js";

const Layout = ({children}) => {
  return (
    <div className="w-full">
      <NavBar />
      <div>
        {children}
      </div>
    </div>
  );
};

export default Layout;