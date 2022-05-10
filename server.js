//requerir express
const express = require('express');
const app = express();
const chalk = require('chalk')
const db = require ('./db.js');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Levantar servidor
app.listen(3000, () => {
    console.log(chalk.green.bold('Servidor iniciado en el puerto 3000'));
});

//enviar index a la ruta principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 1. Crear una ruta POST /cancion que reciba los datos correspondientes a una canción y realice a través de una función asíncrona la inserción en la tabla repertorio.
app.post('/cancion', async (req, res) => {
    try {
        const respuesta = await db.agregarCancion(req.body)
        res.send(respuesta).status(201)
    } catch (error) {
        res.send(error).status(500)
        console.log(chalk.red.bold('Error al agregar cancion'))
    }
});
    
//2. Crear una ruta GET /canciones que devuelva un JSON con los registros de la tabla repertorio.
app.get('/canciones', async (req, res) => {
    try {
        const respuesta = await db.obtenerCanciones()
        res.send(respuesta).status(200)
    } catch (error) {
        res.send(error).status(500)
    }
});

//3. Crear una ruta PUT /cancion que reciba los datos de una canción que se desea editar, ejecuta una función asíncrona para hacer la consulta SQL correspondiente y actualice ese registro de la tabla repertorio.
app.put('/cancion/:id', async (req, res) => {
    try {
        const {id} = req.params
        const respuesta = await db.editarCancion(req.body, id)
        res.send(respuesta).status(201)
    } catch (error) {
        res.send(error).status(500)
    }
});

//4. Crear una ruta DELETE /cancion que reciba por queryString el id de una canción y realiza una consulta SQL a través de una función asíncrona para eliminarla de la base de datos.
app.delete('/cancion', async (req, res) => {
    try {
        const {id} = req.query
        const respuesta = await db.eliminarCancion(id);
        res.send(respuesta)
    } catch (error) {
        res.send(error).status(500)
    }
});