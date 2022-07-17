import mongoose from "mongoose";

export const SchemaProductos = new mongoose.Schema({
    nombre: {type: String, required : true, max: 50},
    texto: {type: String, required : true, max: 100},
    foto: {type: String, max: 100},
    logo: {type: String, max: 100},
    reglas: {type: String, max: 100},
    precio: {type: Number, required : true},
    stock: {type: Number, required : true}
},{
    thimestamps:true
})

const ProductosModel = mongoose.model("Productos", SchemaProductos)

export default ProductosModel

