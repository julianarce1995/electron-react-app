import React, { useState } from "react";

const EcelList = () => {
  const [data, setData] = useState([]);
  const [filePath, setFilePath] = useState(null);

  async function handleFileChange() {
    const path = await window.electron.selectFile();

    if (path) {
      setFilePath(path);
      try {
        const resultado = await window.electron.readExcel(path);
        console.log(resultado);
        setData(resultado);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <div className="w-full">
        <label className="flex mb-2 text-sm font-medium text-gray-900 w-auto">
          Upload file
        </label>
        <button
          className="px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          onClick={() => handleFileChange()}
        >
          Subir Excel
        </button>
      </div>

      {filePath && <p>Archivo seleccionado: {filePath}</p>}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        {data.length > 0 && (
          <table className="w-full text-sm text-gray-500 text-gray-200">
            <thead className="text-xs text-gray-100 uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-2">EDAD</th>
                <th scope="col" className="px-3 py-2">IDENTIFICACION</th>
                <th scope="col" className="px-3 py-2">NOMBRE</th>
                <th scope="col" className="px-3 py-2">PROFESOR</th>
                <th scope="col" className="px-3 py-2">SEDE</th>
                <th scope="col" className="px-3 py-2">SEXO</th>
                <th scope="col" className="px-3 py-2">TARIFA</th>
                <th scope="col" className="px-3 py-2">TELEFONO</th>
                <th scope="col" className="px-3 py-2">SI/NO</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  className="odd:bg-gray-400 odd:dark:bg-gray-900"
                  key={index}
                >
                  <th className="px-3 py-2 font-medium">{item.EDAD}</th>
                  <th className="px-3 py-2">{item.IDENTIFICACION}</th>
                  <th className="px-3 py-2">{item.NOMBRE}</th>
                  <th className="px-3 py-2">{item["PROFESOR/A"]}</th>
                  <th className="px-3 py-2">{item.SEDE}</th>
                  <th className="px-3 py-2">{item["SEXO (M/F)"]}</th>
                  <th className="px-3 py-2">{item.TARIFA}</th>
                  <th className="px-3 py-2">{item.TELEFONO}</th>
                  <th className="px-3 py-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer"/>
                      <div className="relative w-11 h-6 bg-green-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-gray-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EcelList;
