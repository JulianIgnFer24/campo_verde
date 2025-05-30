const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Motor de plantillas
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// === EMPLEADOS ===
app.get('/', (req, res) => {
    res.redirect('/empleados');
});

app.get('/empleados', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/api/empleados');
        res.render('empleados', { empleados: response.data });
    } catch (error) {
        res.status(500).send('Error al obtener empleados');
    }
});

app.get('/empleados/nuevo', (req, res) => {
    res.render('nuevo-empleado');
});

app.post('/empleados', async (req, res) => {
    try {
        await axios.post('http://localhost:8080/api/empleados', req.body);
        res.redirect('/empleados');
    } catch (error) {
        res.status(500).send('Error al guardar empleado');
    }
});

// === CLIENTES ===
app.get('/clientes', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/api/clientes');
        res.render('clientes', { clientes: response.data });
    } catch (error) {
        res.status(500).send('Error al obtener clientes');
    }
});

app.get('/clientes/nuevo', (req, res) => {
    res.render('nuevo-cliente');
});

app.post('/clientes', async (req, res) => {
    try {
        await axios.post('http://localhost:8080/api/clientes', req.body);
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).send('Error al guardar cliente');
    }
});

// === PRODUCTOS ===
app.get('/productos', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/api/productos');
        res.render('productos', { productos: response.data });
    } catch (error) {
        res.status(500).send('Error al obtener productos');
    }
});

app.get('/productos/nuevo', (req, res) => {
    res.render('nuevo-producto');
});

app.post('/productos', async (req, res) => {
    try {
        await axios.post('http://localhost:8080/api/productos', req.body);
        res.redirect('/productos');
    } catch (error) {
        res.status(500).send('Error al guardar producto');
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Frontend corriendo en http://localhost:${port}`);
});