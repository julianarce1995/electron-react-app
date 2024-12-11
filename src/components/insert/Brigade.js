import React, { useEffect, useState } from "react";

const InsertBrigade = () => {
  const [brigadeName, setBrigadeName] = useState("");
  const [brigadeDate, setBrigadeDate] = useState("");
  const [idSession, setIdSession] = useState("");
  const [dataSession, setDataSession] = useState([]);

  const handleSessionChange = (event) => {
    setIdSession(event.target.value);
  };

  const handleBrigadeNameChange = (event) => {
    setBrigadeName(event.target.value);
  };

  const handleBrigadeDateChange = (event) => {
    setBrigadeDate(event.target.value);
  };
  async function insertData() {
    try {
      await window.database.createData(
        "Brigada",
        ["Nombre", "Fecha", "IdJornada"],
        [brigadeName, brigadeDate, idSession]
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function getData() {
    try {
      const sessionInfo = await window.database.getData("Jornada");
      setDataSession(sessionInfo);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="max-w-sm mx-auto flex flex-col items-center">
        <div className="w-full">
          <label className="mb-2 text-sm font-medium text-gray-900">
            Selecciona Jornada
          </label>
          <select
            id="sessions"
            value={idSession}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
            onChange={handleSessionChange}
          >
            <option value=""></option>
            {dataSession.length
              ? dataSession.map((session) => (
                  <option key={session.ID} value={session.ID}>
                    {session.Nombre}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="w-full">
          <label className="text-sm font-medium text-gray-900">Nombre:</label>
          <input
            id="brigadeName"
            type="text"
            name="brigadeName"
            value={brigadeName}
            placeholder="ejemplo: 1er"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
            onChange={handleBrigadeNameChange}
          />
        </div>
        <div className="w-full">
          <label className="text-sm font-medium text-gray-900">Fecha:</label>
          <input
            id="brigadeDate"
            type="text"
            name="brigadeDate"
            value={brigadeDate}
            placeholder="ejemplo: 12/24/2024"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
            onChange={handleBrigadeDateChange}
          />
        </div>
        <button
          id="menu-item-3"
          role="menuitem"
          className="flex px-4 my-2 py-2 text-left text-xl text-gray-700 border-2 rounded-md"
          onClick={insertData}
        >
          Insertar Brigada
        </button>
      </div>
    </div>
  );
};

export default InsertBrigade;
