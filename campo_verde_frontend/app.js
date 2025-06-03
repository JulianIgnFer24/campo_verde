const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// === Estas líneas deben estar una sola vez al inicio del archivo ===
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

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
        console.log("Intentando conectar con backend Spring Boot...");
        
        const response = await axios.get('http://localhost:8080/api/empleados', {
            timeout: 10000 // 10 segundos máximo para evitar abortos por timeout
        });

        console.log("Datos recibidos del backend:", response.data); // Muestra el JSON que llega

        const empleados = Array.isArray(response.data) ? response.data : [];

        res.render('empleados', { empleados }); // Pasamos los datos a la vista EJS
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error("Error: Conexión abortada - Timeout");
            return res.status(504).send('No se pudo conectar con el backend. Asegúrate de que Spring Boot esté corriendo.');
        }

        if (error.response) {
            console.error("Respuesta de error del backend:", error.response.status, error.response.data);
            return res.status(error.response.status || 500).send('Error al obtener empleados desde el backend');
        }

        console.error("Error de red u otro:", error.message);
        res.status(500).send('Error al conectarse al backend - Inténtalo más tarde');
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
    console.log("Datos recibidos - Alta Producto:", req.body);

    const producto = {
        cod: req.body.cod ? parseInt(req.body.cod) : null,
        descripcion: req.body.descripcion || '',
        precio: req.body.precio ? parseFloat(req.body.precio) : null,
        cantidad: req.body.cantidad ? parseInt(req.body.cantidad) : null
    };

    try {
        await axios.post('http://localhost:8080/api/productos', producto);
        res.redirect('/productos');
    } catch (error) {
        console.error("Error al guardar producto:", error.message);
        res.status(500).send('Error al guardar producto');
    }
});

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
        descripcion: req.body.descripcion || '',
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

app.get('/productos/eliminar/:id', async (req, res) => {
    try {
        await axios.delete(`http://localhost:8080/api/productos/${req.params.id}`);
        res.redirect('/productos');
    } catch (error) {
        console.error("Error al eliminar producto:", error.message);
        res.status(500).send('Error al eliminar producto');
    }
});




// Ruta /empleados/descargar-pdf
app.get('/empleados/descargar-pdf', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/api/empleados');
        const empleados = Array.isArray(response.data) ? response.data : [];

        if (empleados.length === 0) {
            return res.status(404).send('No hay empleados para generar el PDF');
        }

        let filas = '';
        empleados.forEach(emp => {
            const supervisor = emp.dniSupervisor && emp.dniEmpleado !== emp.dniSupervisor
                ? emp.dniSupervisor
                : 'Ninguno';

            filas += `
                <tr>
                    <td>${emp.dniEmpleado}</td>
                    <td>${emp.nombre || ''}</td>
                    <td>${emp.apellido || ''}</td>
                    <td>${emp.tipo || ''}</td>
                    <td>$${emp.sueldo || 0}</td>
                    <td>${emp.direccion || ''}</td>
                    <td>${supervisor}</td>
                </tr>`;
        });

        const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Lista de Empleados</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 30px; }
        h1 { text-align: center; margin-bottom: 20px; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #555;
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>
    <h1>Lista de Empleados - Campo Verde</h1>
    <table>
        <thead>
            <tr>
                <th>DNI</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Tipo</th>
                <th>Sueldo</th>
                <th>Dirección</th>
                <th>DNI Supervisor</th>
            </tr>
        </thead>
        <tbody>
            ${filas}
        </tbody>
    </table>
</body>
</html>
        `;

        const pdfPath = path.join(__dirname, 'lista_empleados.pdf');

        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            }
        });

        await browser.close();

        // Forzar descarga del PDF generado
        res.header('Content-Type', 'application/pdf');
        res.header('Content-Disposition', 'attachment; filename=lista_empleados.pdf');

        const pdfStream = fs.createReadStream(pdfPath);
        pdfStream.pipe(res);

        // Opcional: eliminar el archivo temporal después de enviarlo
        pdfStream.on('end', () => {
            fs.unlinkSync(pdfPath); // Borrar el PDF temporal
        });

    } catch (error) {
        console.error("Error al generar PDF:", error.message);
        res.status(500).send('Error al generar el PDF - Revisa los logs');
    }
});



// === DESCARGAR LISTA DE PRODUCTOS COMO PDF ===
app.get('/productos/descargar-pdf', async (req, res) => {
    try {
        console.log("Descargando lista de productos desde Spring Boot...");
        const response = await axios.get('http://localhost:8080/api/productos');
        const productos = Array.isArray(response.data) ? response.data : [];

        if (productos.length === 0) {
            return res.status(404).send('No hay productos para generar el PDF');
        }

        // Genera filas dinámicas
        let filas = '';
        productos.forEach(prod => {
            filas += `
                <tr>
                    <td>${prod.cod}</td>
                    <td>${prod.descripcion || ''}</td>
                    <td>$${prod.precio || 0}</td>
                    <td>${prod.cantidad || 0}</td>
                </tr>`;
        });

        const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Lista de Productos</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 30px; }
        h1 { text-align: center; margin-bottom: 20px; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #555;
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>
    <h1>Lista de Productos - Campo Verde</h1>
    <table>
        <thead>
            <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Cantidad</th>
            </tr>
        </thead>
        <tbody>
            ${filas}
        </tbody>
    </table>
</body>
</html>
        `;

        const pdfPath = path.join(__dirname, 'lista_productos.pdf');

        console.log("Generando PDF...");
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: "new"
        });
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            }
        });

        await browser.close();

        // Forzar descarga del PDF
        res.header('Content-Type', 'application/pdf');
        res.header('Content-Disposition', 'attachment; filename=lista_productos.pdf');

        const pdfStream = fs.createReadStream(pdfPath);
        pdfStream.pipe(res);

        pdfStream.on('end', () => {
            fs.unlinkSync(pdfPath); // Borrar archivo temporal después de enviarlo
        });

    } catch (error) {
        console.error("Error al generar PDF:", error.message);
        res.status(500).send('Error al generar el PDF - Inténtalo nuevamente');
    }
});



// Iniciar servidor
app.listen(port, () => {
    console.log(`Frontend corriendo en http://localhost:${port}`);
});