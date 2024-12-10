import React from "react";
import { NavBar } from "./Navbar.js";

const Layout = ({children}) => {
  return (
    <div className="w-full h-full scrollable-container">
      <NavBar />
      <div className="container w-full mx-auto my-32">{children}</div>
    </div>
  );
};

export default Layout;