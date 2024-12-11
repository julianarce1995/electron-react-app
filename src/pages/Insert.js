import React, { useState } from "react";
import InsertEntity from "../components/insert/Entity.js";
import InsertGroup from "../components/insert/Group.js";
import InsertHeadquarters from "../components/insert/Headquarters.js";
import InsertBrigade from "../components/insert/Brigade.js";
import InsertSex from "../components/insert/Sex.js";
import InsertSession from "../components/insert/Session.js";
import InsertProfessor from "../components/insert/Professor.js";

const Insert = () => {
  const [selectedCheckBox, setSelectedCheckbox] = useState({});
  const [selectedTable, setSelectedTable] = useState({});
  const tables = [
    { name: "Entidad"},
    { name: "Sede"},
    { name: "Grupo"},
    { name: "Jornada"},
    { name: "Brigada"},
    { name: "Sexo"},
    { name: "Profesor"}
  ];

  
  const handleCheckboxChange = (table) => {
    setSelectedCheckbox((prev) => prev === table  ? prev : table);
  };

  const selectTables = () => {
    setSelectedTable((prev) =>
      prev === selectedCheckBox ? prev : selectedCheckBox
    );
  }
  
  return (
    <div>
      <div className="w-full flex justify-between px-8">
        <div className="flex flex-col w-1/5 h-fit ml-20 p-4 bg-white border-2 border-gray-500 rounded-xl shadow-xl">
          <div className="flex w-full flex-col items-center">
            <div className="flex w-full rounded-xl py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500">
              <div className="flex flex-col w-full">
                {tables.map((table, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center hover:bg-gray-200 p-2.5 cursor-pointer"
                    onClick={() => handleCheckboxChange(table)}
                  >
                    <label className="px-4 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                      {table.name.toUpperCase()}
                    </label>
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      checked={selectedCheckBox.name === table.name}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                      onChange={() => {}}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className="flex w-fit self-end mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            onClick={selectTables}
          >
            Selecionar
          </button>
        </div>
        <div className="mx-20 flex-1">
          <ul className="flex flex-wrap justify-around w-[100%]">
            {
              selectedTable.name === "Entidad"
                ? <InsertEntity />: selectedTable.name === "Sede"
                  ? <InsertHeadquarters /> : selectedTable.name === "Grupo"
                    ? <InsertGroup /> : selectedTable.name === "Jornada"
                      ? <InsertSession /> : selectedTable.name === "Brigada"
                        ? <InsertBrigade /> : selectedTable.name === "Sexo"
                          ? <InsertSex /> : selectedTable.name === "Profesor"
                            ? <InsertProfessor /> : null
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Insert;
