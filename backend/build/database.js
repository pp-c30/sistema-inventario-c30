"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// importamos el metodo "createPool" que nos permite conectarnos a la db desde "promise-mysql"
const promise_mysql_1 = require("promise-mysql");
//funcion que se encarga de la conexion a la DB 
function conexion() {
    return __awaiter(this, void 0, void 0, function* () {
        // constante en la que se define las propiedades del "createPool" en la constante "connect",para poder conectar a la BD
        const con = yield promise_mysql_1.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'sistema_inventario'
        });
        // entrega una respuesta 
        return con;
    });
}
exports.conexion = conexion;
