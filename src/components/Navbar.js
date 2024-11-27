import React from "react";

export const NavBar = () => {
  return (
    <div className="flex flex-col navbar bg-base-100">
      <div className="w-full flex flex-col justify-center items-center border-b-2">
        <a className="btn btn-ghost normal-case text-xl text-4xl" href="/">
          Electron app
        </a>
      </div>
    </div>
  );
};
