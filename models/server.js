const express = require('express')
const dbConnect = require('../database/config')
require('../database/config')
const cuentaRouter = require ('../router/cuentaRouter')

class Server{
    constructor(){
        this.app = express()
        this.listen()
        this.dbConnection()
        this.route()
    }
    async dbConnection(){
        await dbConnect()
    }
    route(){
        this.app.use(express.json())
        this.app.use('/api/cuentas', cuentaRouter)
    }
    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log('Servidor corriendo')
        })
    }
}

module.exports = Server