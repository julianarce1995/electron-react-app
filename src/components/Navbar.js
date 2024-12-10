import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  const [activeButton, setActiveButton] = useState("1");

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };
  return (
    <div className="w-full fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="flex justify-between bg-white border-t-2">
        <div className="flex items-center justify-between w-full p-4">
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
            onClick={() => handleButtonClick("1")}
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Electron App
            </span>
          </NavLink>
          <div className="items-center justify-between">
            <ul className="flex border border-gray-300 rounded-lg bg-gray-50">
              <li
                className={`border-r-2 border-gray-300 ${
                  activeButton === "1"
                    ? "bg-gray-400 text-white rounded-l-lg"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleButtonClick("1")}
              >
                <NavLink to="/" className="flex py-2 px-8">
                  Home
                </NavLink>
              </li>
              <li
                className={`hover:bg-gray-200 ${
                  activeButton === "2"
                    ? "bg-gray-400 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleButtonClick("2")}
              >
                <NavLink to="/upload" className="flex py-2 px-8">
                  Upload
                </NavLink>
              </li>
              <li
                className={`border-l-2 border-gray-300 ${
                  activeButton === "3"
                    ? "bg-gray-400 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleButtonClick("3")}
              >
                <NavLink to="/insert" className="flex py-2 px-8">
                  Insert
                </NavLink>
              </li>
              <li
                className={`border-l-2 border-gray-300 ${
                  activeButton === "4"
                    ? "bg-gray-400 text-white rounded-r-lg"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleButtonClick("4")}
              >
                <NavLink to="/info" className="flex py-2 px-8">
                  Datos x Tabla
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
