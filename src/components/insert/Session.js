import React, { useState } from "react";

const InsertSession = () => {
  const [session, setSession] = useState("");

  const handleSessionChange = (event) => {
    setSession(event.target.value);
  };
  async function insertData() {
    try {
      await window.database.createData("Jornada",["Nombre"],[session]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="max-w-sm mx-auto flex flex-col items-center">
        <div className="w-full">
          <label className="text-sm font-medium text-gray-900">Jornada:</label>
          <input
            id="session"
            type="text"
            name="session"
            value={session}
            placeholder="ejemplo: Mañana/Tarde"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
            onChange={handleSessionChange}
          />
        </div>
        <button
          id="menu-item-3"
          role="menuitem"
          className="flex px-4 my-2 py-2 text-left text-xl text-gray-700 border-2 rounded-md"
          onClick={insertData}
        >
          Insertar Jornada
        </button>
      </div>
    </div>
  );
};

export default InsertSession;
