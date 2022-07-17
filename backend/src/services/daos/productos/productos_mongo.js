import ProductosModel from "../../../models/productos_models.js"
import ProductosDao from "./productos_dao.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export default class ProductosMongo extends ProductosDao {
    static init() {
        mongoose.connect(process.env.MONGO_URI, (error) =>{
            if (error) {
                console.log("Error", error) 
            } else {
                console.log("Conectado a la base de datos")
            }
        })
    }

    // constructor() {
    //     super()
        // this.client = new ConexionMongo()
        // this.model = ModelProductos
    // }

    async createData(data) {
        try {
            const response = await ProductosModel.create(data)
            console.log(response);
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async readAllData() {
        try {
            const response = await ProductosModel.find().lean()
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async readOneData(data) {
        try {
            const response = await ProductosModel.findById(data)
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async deleteOneData(data) {
        try {
            const response = await this.model.deleteOne(data)
            return response
        } catch (error) {
            console.log(error);
        }
    }


    async  updateOneData(data, new_data) {
        try {
            const response = await this.model.updateOne(data,new_data)
            return response
        } catch (error) {
            console.log(error);
        }
    }

    // async open(){
    //     return await this.client.connect()
    // }

    // async exit(){
    //     return await this.client.disconnect()
    // }    

}