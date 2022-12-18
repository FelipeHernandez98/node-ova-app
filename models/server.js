require('dotenv').config();

const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            calificaciones: '/api/calificaciones',
            temas: '/api/temas'
        }

        // Middlewares
        this.middlewares();

        //Rutas de mi app

        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        // Parse y lectura del body
        this.app.use(express.json());
        
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));     
        this.app.use(this.paths.usuarios, require('../routes/usuarios.routes'));
     
        this.app.use(this.paths.calificaciones, require('../routes/calificacion.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;