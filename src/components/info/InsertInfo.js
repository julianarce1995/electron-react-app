import React, { useState } from "react";

const InsertInfo = ({}) => {
  const [label, setLabel] = useState("Entidad");

  const [table, setTable] = useState("");

  const handleTableChange = (event) => {
    setTable(event.target.value);
  };
  async function insertData() {
    console.log("hola");
    setLabel("");
  }

  return (
    <div className="max-w-sm mx-auto flex flex-col items-center">
      <div className="w-full">
        <label className="text-sm font-medium text-gray-900">{label}</label>
        <input
          type="text"
          name="entidad"
          id="entidad"
          value={table}
          onChange={handleTableChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
          placeholder="ejemplo: confama"
        />
      </div>
      <button
        onClick={() => insertData()}
        className="flex px-4 my-2 py-2 text-left text-xl text-gray-700 border-2 rounded-md"
        role="menuitem"
        id="menu-item-3"
      >
        Insertar Entidad
      </button>
    </div>
  );
};

export default InsertInfo;
