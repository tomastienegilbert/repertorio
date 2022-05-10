const { Pool } = require("pg");

//conexión a bbdd
const config = {
  user: "postgres",
  host: "localhost",
  password: "postgresql",
  database: "repertorio",
  port: 5432,
};

const pool = new Pool(config);

//Función de agregar canción
const agregarCancion = async ({ titulo, artista, tono }) => {
  const SQLQuery = {
    text: "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING *;",
    values: [titulo, artista, tono]
  };
  const result = await pool.query(SQLQuery);
  return result.rows[0];
};

//función obtener canciones
const obtenerCanciones = async () => {
  const SQLQuery = {
    text: "SELECT * FROM canciones",
  };
  const result = await pool.query(SQLQuery);

  return result.rows;
};

//funcion editar cancion
const editarCancion = async ({ titulo, artista, tono }, id) => {
  try {
    const SQLQuery = {
      text: "UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4",
      values: [titulo, artista, tono, id],
    };
    const result = await pool.query(SQLQuery);
    return result.rows[0];
  } catch (error) {
    if (rowCount == 0) throw "No existe ningúna canción con este ID";
  }
};

//función eliminar cancion
const eliminarCancion = async (id) => {
  const SQLQuery = {
    text: "DELETE FROM canciones WHERE id = $1 RETURNING *;",
    values: [id]
  };
  const result = await pool.query(SQLQuery);

  const { rowCount } = result;
  if (rowCount == 0) {
    throw "No existe ninguna canción con este ID";
  }
};

//exportar módulos
module.exports = {
  insertarCancion,
  obtenerCanciones,
  editarCancion,
  eliminarCancion,
};
