import ProductosMongo from "./productos_mongo.js";
import ProductosFile from "./productos_file.js";

const opcion = process.argv[3] || "mongo";
let dao;

switch (opcion) {
    case "file":
        dao = new ProductosFile()
        break;

    default:
        ProductosMongo.init()
        dao = new ProductosMongo()
        break
}

// export default class ProductosDaoFactory {
//     static getDao() {
//         return dao;
//     }
// }

export default dao;