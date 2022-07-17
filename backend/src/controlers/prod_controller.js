import ProductosDao from "../services/daos/productos/productos_factory.js"

// ######################################################
function checkUsername(req) {
    const user = req.user;
    if (user === undefined ) {
        return null 
    } else {
        return user.username
    }
}

//######################################################

//######################################################
//               RENDER PAGINA DE INDEX
//######################################################
export function getIndex(req, res) {
    let username = checkUsername(req)
    res.render("index", {
        usuario: username,
        pid: process.pid,
        PORT: process.argv[2]
    })
}


//######################################################
//             API - LISTADO DE PRODUCTOS
//######################################################
export async function getAllProductos(req, res) {
    try {
        const all_productos = await ProductosDao.readAllData()
        if (all_productos) {
            res.status(200).json({ all_productos: all_productos })
        }
    } catch (error) {
        res.status(501).send(error.message)
    }
    // await productos.open()

    // await productos.exit()
    // let username = checkUsername(req)
    // res.render("productos", {
    //     lista_productos : all_productos,
    //     usuario: username,
    // })
}


//######################################################
//                API - CREAR 1 PRODUCTO
//######################################################
export async function createOneProducto(req, res) {
    try {
        const { body } = req
        const new_producto = await ProductosDao.createData(body)
        if (new_producto) {
            res.status(200).json({ new_producto: new_producto })
        }
    } catch (error) {
        res.status(501).send(error.message)
    }

}

//######################################################
//             API - DETALLE DE 1 PRODUCTO
//######################################################
export async function getOneProducto(req, res) {
    try {
        const { id } = req.params;
        const detail_producto = await ProductosDao.readOneData(id)
        if (detail_producto) {
            res.status(200).json({ detail_producto })
        }
    } catch (error) {
        res.status(501).send(error.message)
    }
    // await productos.open()
    // const { id } = req.params;
    // const producto_detalle = await ProductosDao.readOneData({_id:id})
    // await productos.exit()
    // let username = checkUsername(req)
    // res.render("producto_detalle", {
    //         producto: producto_detalle,
    //         usuario: username,
    // })
}

