const {Router} = require ('express')
const {getCuenta, postCuenta, deleteCuenta, consignarDinero, retirarDinero} = require ('../controllers/cuentaController')

const cuentaRouter = Router()
cuentaRouter.get('/', getCuenta)
cuentaRouter.post('/', postCuenta)
cuentaRouter.put('/consignar', consignarDinero)
cuentaRouter.put('/retirar', retirarDinero)
cuentaRouter.delete('/:id', deleteCuenta)

module.exports = cuentaRouter