require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config');


// * Crear el servidor express
const app = express();

// * Configurar cors
app.use(cors());

// * Carpeta pública
app.use(express.static('public'));

// * Lectura y parseo del body
app.use(express.json());

// * Base de datos
dbConection();


// MEAN_USER
// UaH$mQ4Q.QEwmpf

// * Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.use('/api/hospitales', require('./routes/hospitales'));

app.use('/api/medicos', require('./routes/medicos'));

app.use('/api/todo', require('./routes/busquedas'));

app.use('/api/upload', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto '+process.env.PORT);
})