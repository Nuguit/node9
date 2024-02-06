const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fileUpload = require('express-fileupload')
const fs = require('fs')


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(fileUpload({ createParentPath: true, safeFileNames: true, preserveExtension: true }))
app.use(express.static('public'))
app.use('/foto', express.static('archivos') )



app.post ('/subir', (req, res) => {
    if (!req.files) {
        res.send({ mensaje: "No hay archivo para subir" })
    } else {
        let file = req.files.archivo
        let md5 = file.md5
        file.mv('./archivos/' + md5 + file.name )
        res.send({message: 'Imagen subida',
            data: {
            name: md5 + file.name,
            mimetype: file.mimetype,
            size: file.size,
            },
            })
    
    
    }}
    )


    app.get('/foto', (req, res) => {
    
    fs.readdir('./archivos/', (err, archivos) => {
    
    if (err) {
    res.send('Error leyendo los archivos', err);
    
    }else{
    const finalUrl = files.map(file => `http://localhost:3000/archivos/${archivos}`);
    res.send(finalUrl);
    }
    });
    });


    app.get('/descarga/:archivo', (req, res) => {
    res.download('./archivos/' + req.body.archivo)
    
    })




const port = process.env.PORT || 3000
app.listen(port, err => {
err
? console.error(err)
: console.log(`Servidor iniciado en http://localhost: ${port}`)
})