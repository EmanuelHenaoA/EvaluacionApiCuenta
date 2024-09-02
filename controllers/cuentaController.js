const bcrypt = require('bcryptjs')
const Cuenta = require('../models/cuenta')
const cuenta = require('../models/cuenta')

const getCuenta = async (req, res) => {
    const cuentas = await Cuenta.find()
    res.json(cuentas)
}

const postCuenta = async (req, res) => {
    const body = req.body
    try{
        const cuenta = new Cuenta(body)
        cuenta.claveAcceso = await bcrypt.hash(body.claveAcceso, 10)
        await cuenta.save()
        res.status(200).json({msg: 'Cuenta Creada'})
    }catch(error){
        res.status(500).json({msg: 'No se pudo crear la cuenta'})
    }
}

const consignarDinero = async (req, res) => {
    const {numeroCuenta, dinero} = req.body
    if(dinero<=0){
        res.status(500).json({msg: 'No se pueden consignar valores negativos'})
    }
    try{
        const cuenta = await Cuenta.findOne({numeroCuenta})
        if(cuenta){
            cuenta.saldo += dinero
            await cuenta.save()
            return res.status(200).json({msg: 'Consignacion Exitosa'})
        }
        else{
            res.status(404).json({msg: 'Cuenta Incorrecta'})
        }
    }catch(error){
        res.status(500).json({msg: 'No se pudo consignar el dinero'})
    }
}

const retirarDinero = async (req, res) => {
    const {numeroCuenta, dinero} = req.body
    if(dinero<=0){
        res.json(500).json({msg: 'No se pueden retirar valores negativos'})
    }
    try{
        const cuenta = await Cuenta.findOne({numeroCuenta})
        if(cuenta.saldo >= dinero){
            cuenta.saldo -= dinero
            await cuenta.save()
            return res.status(200).json({msg: 'Retiro Exitoso'})
        }
        else{
            res.status(404).json({msg: 'El saldo a retirar no puede ser mayor al que tienes en la cuenta'})
        }
    }catch(error){
        res.status(500).json({msg: 'No se pudo retirar el dinero'})
    }
}



const deleteCuenta = async (req, res) => {
    const id = req.params.id
    try{
        const cuenta = await Cuenta.findById({_id: id})
        if(cuenta){
            if(cuenta.saldo === 0){
                await Cuenta.findByIdAndDelete({_id: id})
                return res.status(200).json('Cuenta Eliminada')
            }
            else{
                res.status(500).json({msg: 'La cuenta no puede ser eliminada porque tiene dinero'})
            }
        }
    }catch(error){
        res.status(404).json({msg: 'Cuenta no encontrada'})
    }
}




module.exports = {
    getCuenta,
    postCuenta,
    consignarDinero,
    retirarDinero,
    deleteCuenta
}