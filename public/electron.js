import { app, BrowserWindow, dialog } from 'electron';
import isDev from "electron-is-dev";
import { join, dirname } from "path";
import xlsx from 'xlsx';
import { ipcMain } from 'electron/main';
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";

const { Database } = sqlite3
const { readFile, utils } = xlsx;

let mainWindow;
let db;

function createMainWindow() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  mainWindow = new BrowserWindow({
    title: 'Electron React App',
    width: 1920,
    height: 1080,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: join(__dirname, 'preload.cjs'),
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${join(__dirname, "../build/index.html")}`
  );
  
  mainWindow.on("closed", () => (mainWindow = null));
}


app.whenReady().then(async () => {
  try {
    createMainWindow();
    await connection();
  } catch (error) {
    console.error('Error durante la inicialización:', error);
  }
});

function createTable() {
  const tableName = "Entidad"
  db.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name=?",
    [tableName],
    (err, row) => {
      if (err) {
        console.error('Error:', err.message);
      } else {
        if (!row) {        
          console.log(`La tabla "${tableName}" no existe. Creando tablas...`);
          const createTables = `
            CREATE TABLE IF NOT EXISTS Entidad (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Nombre TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Sede (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Nombre TEXT NOT NULL,
              IdEntidad INTEGER NOT NULL,
              FOREIGN KEY (IdEntidad) REFERENCES Entidad(ID)
            );

            CREATE TABLE IF NOT EXISTS Grupo (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Nombre TEXT NOT NULL,
              IdSede INTEGER NOT NULL,
              IdJornada INTEGER NOT NULL,
              IdProfesor INTEGER NOT NULL,
              FOREIGN KEY (IdSede) REFERENCES Sede(ID),
              FOREIGN KEY (IdJornada) REFERENCES Jornada(ID),
              FOREIGN KEY (IdProfesor) REFERENCES Profesor(ID)
            );

            CREATE TABLE IF NOT EXISTS Profesor (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Nombre TEXT NOT NULL,
              Telefono TEXT NOT NULL UNIQUE,
              Email TEXT NOT NULL UNIQUE
            );

            CREATE TABLE IF NOT EXISTS Brigada (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Nombre TEXT NOT NULL,
              Fecha TEXT NOT NULL,
              IdJornada INTEGER NOT NULL,
              FOREIGN KEY (IdJornada) REFERENCES Jornada(ID)
            );

            CREATE TABLE IF NOT EXISTS Jornada (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Nombre TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Sexo (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Tipo TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Estudiante (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Nombre TEXT NOT NULL,
              Edad INTEGER NOT NULL,
              DocumentoIdentidad TEXT NOT NULL UNIQUE,
              Telefono TEXT NOT NULL UNIQUE,
              IdSexo INTEGER NOT NULL,
              FOREIGN KEY (IdSexo) REFERENCES Sexo(ID)
            );

            CREATE TABLE IF NOT EXISTS Info (
              IdEstudiante INTEGER NOT NULL,
              IdGrupo INTEGER NOT NULL,
              IdBrigada INTEGER NOT NULL,
              Tarifa REAL NOT NULL,
              Despiojado TEXT CHECK(Despiojado IN ('Si', 'No')) NOT NULL,
              TienePiojos TEXT CHECK(TienePiojos IN ('Si', 'No')) NOT NULL,
              Razon TEXT CHECK(Razon IN ('Ausente', 'No Autorizado', 'Retirado')),
              PRIMARY KEY (IdEstudiante, IdGrupo, IdBrigada),
              FOREIGN KEY (IdEstudiante) REFERENCES Estudiante(ID),
              FOREIGN KEY (IdGrupo) REFERENCES Grupo(ID),
              FOREIGN KEY (IdBrigada) REFERENCES Brigada(ID)
            );
          `;

          db.exec(createTables, (err) => {
            if (err) {
              console.error('Error al crear las tablas:', err.message);
            } else {
              console.log('Tablas creadas correctamente.');
            }
          });
        } else {
          console.log(`La tabla "${tableName}" ya existe.`);
        }
      }
    }
  );
}

async function connection() {
  try {
    const dbPath = join(process.cwd(), 'app.db');

    db = new Database(dbPath, (err) => {
      if (err) {
        console.error('Error al conectar a la base de datos', err.message);
      } else {
        console.log('Conectado a la base de datos existente.');
      }
    });

    createTable();

    return db;
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error.message);
    throw error;
  }
}


async function insertData(tableName, fields, values) {
  // Construimos el string de campos y placeholders dinámicamente
  const placeholders = fields.map(() => "?").join(", "); // Ejemplo: "?, ?, ?"
  const query = `INSERT INTO ${tableName} (${fields.join(
    ", "
  )}) VALUES (${placeholders});`;

  // Ejecutamos el query con los valores
  return new Promise((resolve, reject) => {
    db.run(query, values, function (err) {
      if (err) {
        console.error("Error ejecutando la consulta:", err.message);
        reject(err);
      } else {
        console.log("Consulta ejecutada correctamente");
        resolve(this.lastID); // Retorna el ID del último registro insertado
      }
    });
  });
}

ipcMain.handle('get-data', async (event, table) => {
  const query = `SELECT * FROM ${table}`;
  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err.message);
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
});

ipcMain.handle("create-data", async (event, tableName, fields, values) => {
  try {
    await insertData(tableName, fields, values);
  } catch (error) {
    console.error("Error al crear info:", error);
    throw error;
  }
});

ipcMain.handle('read-excel', async (event, filePath) => {
  try {
    const workbook = readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = utils.sheet_to_json(sheet);

    return data;
  } catch (error) {
    console.error('Error al leer el archivo Excel:', error);
  }
});

ipcMain.handle("select-file", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Excel Files", extensions: ["xls", "xlsx"] }],
  });

  if (result.canceled) {
    return null;
  }
  return result.filePaths[0];
});