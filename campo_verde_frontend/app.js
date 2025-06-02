const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Motor de plantillas y middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// === PÁGINA PRINCIPAL ===
app.get('/', (req, res) => {
    res.render('index');
});

// === EMPLEADOS ===
app.get('/empleados', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/api/empleados');
        res.render('empleados', { empleados: response.data });
    } catch (error) {
        console.error("Error al obtener empleados:", error.message);
        res.status(500).send('Error al obtener empleados');
    }
});

app.get('/empleados/nuevo', (req, res) => {
    res.render('nuevo-empleado', { empleado: null });
});

app.post('/empleados', async (req, res) => {
    console.log("Datos recibidos - Alta Empleado:", req.body);

    const empleado = {
        dniEmpleado: req.body.dniEmpleado ? parseInt(req.body.dniEmpleado) : null,
        nombre: req.body.nombre || '',
        apellido: req.body.apellido || '',
        tipo: req.body.tipo || '',
        sueldo: req.body.sueldo ? parseFloat(req.body.sueldo) : null,
        direccion: req.body.direccion || '',
        dniSupervisor: req.body.dniSupervisor ? parseInt(req.body.dniSupervisor) : null
    };

    try {
        await axios.post('http://localhost:8080/api/empleados', empleado);
        res.redirect('/empleados');
    } catch (error) {
        console.error("Error al guardar empleado:", error.message);
        res.status(500).send('Error al guardar empleado');
    }
});

app.get('/empleados/modificar/:id', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/empleados/${req.params.id}`);
        res.render('modificar-empleado', { empleado: response.data });
    } catch (error) {
        console.error("Error al obtener empleado:", error.message);
        res.status(500).send('Error al cargar datos del empleado');
    }
});

app.post('/empleados/actualizar/:id', async (req, res) => {
    console.log("Datos recibidos - Modificar Empleado:", req.body);

    const empleado = {
        nombre: req.body.nombre || '',
        apellido: req.body.apellido || '',
        tipo: req.body.tipo || '',
        sueldo: req.body.sueldo ? parseFloat(req.body.sueldo) : null,
        direccion: req.body.direccion || '',
        dniSupervisor: req.body.dniSupervisor ? parseInt(req.body.dniSupervisor) : null
    };

    try {
        await axios.put(`http://localhost:8080/api/empleados/${req.params.id}`, empleado);
        res.redirect('/empleados');
    } catch (error) {
        console.error("Error al actualizar empleado:", error.message);
        res.status(500).send('Error al actualizar empleado');
    }
});

app.get('/empleados/eliminar/:id', async (req, res) => {
    try {
        await axios.delete(`http://localhost:8080/api/empleados/${req.params.id}`);
        res.redirect('/empleados');
    } catch (error) {
        console.error("Error al eliminar empleado:", error.message);
        res.status(500).send('Error al eliminar empleado');
    }
});

// === BUSCAR EMPLEADO ===
app.get('/empleados/buscar', (req, res) => {
    res.render('buscar-empleado', { empleado: null });
});

app.post('/empleados/buscar', async (req, res) => {
    const id = req.body.dniEmpleado ? parseInt(req.body.dniEmpleado) : null;

    if (!id) {
        return res.render('buscar-empleado', { empleado: null });
    }

    try {
        const response = await axios.get(`http://localhost:8080/api/empleados/${id}`);
        res.render('buscar-empleado', { empleado: response.data });
    } catch (error) {
        console.error("Error al buscar empleado:", error.message);
        res.render('buscar-empleado', { empleado: null });
    }
});

// === PRODUCTOS ===
app.get('/productos', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/api/productos');
        const productos = Array.isArray(response.data) ? response.data : [];
        res.render('productos', { productos });
    } catch (error) {
        console.error("Error al obtener productos:", error.message);
        res.status(500).send('Error al obtener productos');
    }
});

app.get('/productos/nuevo', (req, res) => {
    res.render('nuevo-producto');
});

app.post('/productos', async (req, res) => {
    try {
        const producto = {
            codigo: req.body.codigo ? parseInt(req.body.codigo) : null,
            nombre: req.body.nombre || '',
            precio: req.body.precio ? parseFloat(req.body.precio) : null,
            cantidad: req.body.cantidad ? parseInt(req.body.cantidad) : null
        };

        await axios.post('http://localhost:8080/api/productos', producto);
        res.redirect('/productos');
    } catch (error) {
        console.error("Error al guardar producto:", error.message);
        res.status(500).send('Error al guardar producto');
    }
});

// === MODIFICAR PRODUCTO ===
app.get('/productos/modificar/:id', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/productos/${req.params.id}`);
        res.render('modificar-producto', { producto: response.data });
    } catch (error) {
        console.error("Error al obtener producto:", error.message);
        res.status(500).send('Error al cargar datos del producto');
    }
});

app.post('/productos/actualizar/:id', async (req, res) => {
    console.log("Datos recibidos - Actualizar Producto:", req.body);

    const producto = {
        nombre: req.body.nombre || '',
        precio: req.body.precio ? parseFloat(req.body.precio) : null,
        cantidad: req.body.cantidad ? parseInt(req.body.cantidad) : null
    };

    try {
        await axios.put(`http://localhost:8080/api/productos/${req.params.id}`, producto);
        res.redirect('/productos');
    } catch (error) {
        console.error("Error al actualizar producto:", error.message);
        res.status(500).send('Error al actualizar producto');
    }
});

// === ELIMINAR PRODUCTO ===
app.get('/productos/eliminar/:id', async (req, res) => {
    try {
        await axios.delete(`http://localhost:8080/api/productos/${req.params.id}`);
        res.redirect('/productos');
    } catch (error) {
        console.error("Error al eliminar producto:", error.message);
        res.status(500).send('Error al eliminar producto');
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Frontend corriendo en http://localhost:${port}`);
});