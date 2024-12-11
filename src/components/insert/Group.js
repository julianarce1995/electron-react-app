import React, { useEffect, useState } from "react";

const InsertGroup = () => {
  const [groupName, setGroupName] = useState("");
  
  const [idHeadquarters, setIdHeadquarters] = useState("");
  const [idSession, setIdSession] = useState("");
  const [idProfessor, setIdProfessor] = useState("");
  
  const [dataHeadquarters, setDataHeadquarters] = useState("");
  const [dataSession, setDataSession] = useState("");
  const [dataProfessor, setDataProfessor] = useState("");

  const handleHeadquartersChange = (event) => {
    setIdHeadquarters(event.target.value);
  };

  const handleSessionChange = (event) => {
    setIdSession(event.target.value);
  };

  const handleProfessorChange = (event) => {
    setIdProfessor(event.target.value);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  async function insertData() {
    try {
      await window.database.createData(
        "Grupo",
        ["Nombre", "IdSede", "IdJornada", "IdProfesor"],
        [groupName, idHeadquarters, idSession, idProfessor]
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function getData() {
    try {
      const headquartersInfo = await window.database.getData("Sede");
      const sessionInfo = await window.database.getData("Jornada");
      const professorInfo = await window.database.getData("Profesor");
      setDataHeadquarters(headquartersInfo);
      setDataSession(sessionInfo);
      setDataProfessor(professorInfo);
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
            Selecciona Sede
          </label>
          <select
            id="headquarters"
            value={idHeadquarters}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
            onChange={handleHeadquartersChange}
          >
            <option value=""></option>
            {dataHeadquarters.length
              ? dataHeadquarters.map((headquarters) => (
                  <option key={headquarters.ID} value={headquarters.ID}>
                    {headquarters.Nombre}
                  </option>
                ))
              : null}
          </select>
        </div>
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
          <label className="mb-2 text-sm font-medium text-gray-900">
            Selecciona Profesor
          </label>
          <select
            id="professors"
            value={idProfessor}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
            onChange={handleProfessorChange}
          >
            <option value=""></option>
            {dataProfessor.length
              ? dataProfessor.map((professor) => (
                  <option key={professor.ID} value={professor.ID}>
                    {professor.Nombre}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="w-full">
          <label className="text-sm font-medium text-gray-900">Grupo:</label>
          <input
            id="groupName"
            type="text"
            name="groupName"
            value={groupName}
            placeholder="ejemplo: jardin/prejardin"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
            onChange={handleGroupNameChange}
          />
        </div>
        <button
          id="menu-item-3"
          role="menuitem"
          className="flex px-4 my-2 py-2 text-left text-xl text-gray-700 border-2 rounded-md"
          onClick={insertData}
        >
          Insertar Grupo
        </button>
      </div>
    </div>
  );
};

export default InsertGroup;
