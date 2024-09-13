const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Configuración de multer para almacenar archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Carpeta donde se guardarán los PDFs
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);  // Cambiar el nombre del archivo
    }
});

const upload = multer({ storage: storage });

// Middleware para servir archivos estáticos (HTML)
app.use(express.static(__dirname));

// Ruta para manejar la subida de archivos
app.post('/upload', upload.array('pdfs', 10), (req, res) => {
    if (!req.files) {
        return res.status(400).send('No se subió ningún archivo.');
    }

    res.send('Archivos cargados y guardados exitosamente.');
});

// Iniciar el servidor
app.listen(4000, () => {
    console.log('Servidor escuchando en http://localhost:4000');
});
