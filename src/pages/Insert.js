import React, { useEffect, useRef, useState } from "react";
import InsertInfo from "../components/info/InsertInfo.js";

const Insert = () => {
  const [selectedTables, setSelectedTables] = useState([]);
  const [tables, setTables] = useState([
    "entidad",
    "sede",
    "grupo",
    "jornada",
    "brigada",
    "sexo",
  ]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCheckboxChange = (table) => {
    setSelectedTables(
      (prev) =>
        prev.includes(table)
          ? prev.filter((t) => t !== table) // Quitar si ya está seleccionado
          : [...prev, table] // Agregar si no está seleccionado
    );
  };



  return (
    <div>
      <div className="w-full flex justify-between px-8">
        <div className="flex flex-col w-1/5 h-fit p-4 bg-white border-2 border-gray-500 rounded-xl shadow-xl">
          <div className="flex w-full flex-col items-center">
            <div className="flex w-full rounded-xl py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500">
              <div className="flex flex-col w-full">
                {tables.map((table, index) => (
                  <div
                    key={index}
                    class="flex justify-between items-center hover:bg-gray-200 p-2.5 cursor-pointer"
                    onClick={() => handleCheckboxChange(table)}
                  >
                    <label class="px-4 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                      {table.toUpperCase()}
                    </label>
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      checked={selectedTables.includes(table)} // Determinar si está seleccionado
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                    />
                  </div>
                ))}
                <div class="flex justify-between items-center hover:bg-gray-200 p-2.5 cursor-pointer">
                  <label class="px-1 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                    Selecionar todos
                  </label>
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    // checked={selectedTables.includes(table)} // Determinar si está seleccionado
                    // onChange={() => handleCheckboxChange(table)}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={toggleMenu}
            className="flex w-fit self-end mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          >
            Selecionar
          </button>
        </div>
        <div className="ml-20 flex-1">
          <InsertInfo></InsertInfo>
        </div>
      </div>
      <div className="mt-4">
        <h3>Tablas seleccionadas:</h3>
        <ul>
          {selectedTables.map((table, index) => (
            <li key={index}>{table}</li>
          ))}
        </ul>
      </div>
      {/*
        <div className="max-w-sm mx-auto flex flex-col items-center">
          <div className="w-full flex flex-col items-center">
            <button
              onClick={toggleMenu}
              className="z-30 flex justify-between bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
            >
              Seleciona las opciones
              <svg
                className={`-mr-1 ml-2 h-5 w-5 ${isMenuOpen ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="false"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute top-44 left-100 z-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 flex w-[17%]">
                <div className="flex flex-col w-full">
                  {tables.map((table, index) => (
                    <div
                      key={index}
                      class="flex justify-between items-center hover:bg-gray-200 p-2.5"
                    >
                      <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {table.toUpperCase()}
                      </label>
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        checked={selectedTables.includes(table)} // Determinar si está seleccionado
                        onChange={() => handleCheckboxChange(table)}
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <h3>Tablas seleccionadas:</h3>
          <ul>
            {selectedTables.map((table, index) => (
              <li key={index}>{table}</li>
            ))}
          </ul>
        </div>
      */}
      {/*
        <div className="w-full">
          <label className="mb-2 text-sm font-medium text-gray-900">
            Select table
          </label>
          <select
            id="countries"
            value={tables}
            onChange={handleTableChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
          >
            <option value="Entidad">Entidad</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      {tables.map(() => (
        <InsertInfo insertData={insertData}></InsertInfo>
      ))}
      */}
    </div>
  );
};

export default Insert;
