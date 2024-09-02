const {model, Schema} = require('mongoose')
const autoIncrement = require('mongoose-sequence')(require('mongoose'))

const cuentaSchema = new Schema ({
    numeroCuenta: {
        type: Number,
        unique: true
    },
    documentoCliente: {
        type: Number,
        required: true,
    },
    fechaApertura: {
        type: Date,
        default: Date.now
    },
    saldo: {
        type: Number,
        required: true,
        default: 0
    },
    claveAcceso: {
        type: String,
        required: [true, 'La clave de acceso es obligatoria'],
        minlength: [3, 'Minimo 4 caracteres']
    },
},
{
    versionKey: false
}
)

cuentaSchema.plugin(autoIncrement, {inc_field: 'numeroCuenta'})

module.exports = model('cuenta', cuentaSchema)