import React, { useState } from 'react';

const App = () => {
  // El estado ahora tiene un tipo específico: un arreglo de objetos DataItem
  const [data, setData] = useState([]);
  const [filePath, setFilePath] = useState(null);

  async function handleFileChange() {
    // const file: any = e.target.files?.[0];
    console.log("popopppopopopopopop");
    const path = await window.electron.selectFile();
    
    if (path) {
      setFilePath(path);
      // const filePath = (file.path;
      try {
        const resultado = await window.electron.readExcel(path);
        setData(resultado);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <button onClick={() => handleFileChange()}>Subir Archivo Excel</button>
      {filePath && <p>Archivo seleccionado: {filePath}</p>}
      <div>
        {data.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>EDAD</th>
                <th>IDENTIFICACION</th>
                <th>NOMBRE</th>
                <th>PROFESOR</th>
                <th>SEDE</th>
                <th>SEXO</th>
                <th>TARIFA</th>
                <th>TELEFONO</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.EDAD}</td>
                  <td>{item.IDENTIFICACION}</td>
                  <td>{item.NOMBRE}</td>
                  <td>{item.PROFESOR}</td>
                  <td>{item.SEDE}</td>
                  <td>{item.SEXO}</td>
                  <td>{item.TARIFA}</td>
                  <td>{item.TELEFONO}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default App;
