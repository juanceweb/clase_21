import fs from 'fs';
import ProductosDao from "./productos_dao.js"
import {uuid} from "uuidv4"

export default class ProductosFile extends ProductosDao {

    constructor() {
        super()
        this.productos = []
        this.archivo = "./src/archivos/productos.json"
    }

    async createData(data) {
        data.id = uuid()
        data.createdAt= Date.now()
        await this.readAllData()
        this.productos.push(data)
        fs.writeFileSync(this.archivo, JSON.stringify({ productos: this.productos }))
        return data
    }

    async readAllData() {
        try {
            if (fs.existsSync(this.archivo)) {
                const productos = JSON.parse(fs.readFileSync(this.archivo, "utf8"))
                this.productos = productos.productos
            } else {
                fs.writeFileSync(this.archivo, JSON.stringify({ productos: [] }))
            }
            return this.productos
        } 
        catch(error) {
            throw new Error(error)
        }
    }

    async readOneData(data) {
        await this.readAllData()
        const producto = this.productos.find(element => element.id === data)
        return producto
    }

    async deleteOneData(data) {
        try {
            const resultado = await this.readAllData()
            const found = resultado.find(element => element._id == data._id)
            if (found == undefined) {
                return null
            }
            else{
                const new_array = resultado.filter(element => element._id != found._id)
                try {
                    await fs.promises.writeFile(this.archivo, JSON.stringify(new_array))
                    return "producto borrado!"
                }
                catch (error){
                    throw new Error(error)
                }
            }
        }
        catch (error){
            throw new Error(error)
        }
    }


    async  updateOneData(data, new_data) {
        try {

            const resultado = await this.readAllData()
            
            this.productos = []
            
            const found = resultado.find(element => element._id == data._id)

            if (found == undefined) {
                return {error: "producto no encontrado"}
            }
            else{
                found = new_data
                this.productos = resultado
                try {
                    await fs.promises.writeFile(this.archivo, JSON.stringify(this.productos))
                    return this.productos
                }
                catch (error){
                    throw new Error(error)
                }
            }
        }
        catch (error){
            throw new Error(error)
        }
    }

    async open(){
        console.log('File no necesita open');
        
    }

    async exit(){
        console.log('File no necesita exit');
    }    

}