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
exports.CategoriaController = void 0;
// importamos la funcion "conexion" desde data base 
const database_1 = require("../database");
// clase que nos permitira almacenar metodos
class CategoriaController {
    // metodo que nos permite listar consolas
    listarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // guardamos la funcion "conexion" en las constante "db", para conectarnos con la db
            const db = yield database_1.conexion();
            // realizamos la consulta para mostrar los datos en la consola
            let cat = yield db.query('select * from categoria');
            // retorna una respuesta en formato json de cat
            return res.json(cat);
        });
    }
    // metodo que guardara datos en la DB
    guardarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // conexion con la db
            const db = yield database_1.conexion();
            // guardamos los datos ingresados en el body en una variable 
            const cat = req.body;
            // inserta los datos en la DB
            yield db.query("insert into categoria set ?", [cat]);
            // retorna un mensaje 
            return res.json('La categoria fue creada exitosamente');
        });
    }
    // metodo que permite eliminar datos
    eliminarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // conexion con la base de datos 
            const db = yield database_1.conexion();
            // recibe el codigo por parte de la categoria
            let id_categoria = req.params.id_categoria;
            // realiza la eliminacion de la categoria 
            yield db.query("delete from categoria where id_categoria = ?", [id_categoria]);
            // retorna un mensaje 
            return res.json('La categoria se eliminó con exito');
        });
    }
    // permite actualizar datos
    actualizarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // conexion con la db
            const db = yield database_1.conexion();
            // recibimos el codigo en la categoria
            let id_categoria = req.params.id_categoria;
            // nuevos datos de la categoria 
            let new_categoria = req.body;
            // realiza la actualizacion 
            yield db.query("update categoria set ? where id_categoria = ?", [new_categoria, id_categoria]);
            // retorna un mensaje 
            return res.json('La categoria se actualizó con exito');
        });
    }
    // lista
    obtenerCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // conexion con la db
            const db = yield database_1.conexion();
            // recibimos el codigo de la categoria
            let id_categoria = req.params.id_categoria;
            // realiza la seleccion de una categoria y guarda en una variable 
            let unCategoria = yield db.query("select * from categoria where id_categoria = ?", [id_categoria]);
            // retorna un mensaje 
            return res.json(unCategoria[0]);
        });
    }
}
exports.CategoriaController = CategoriaController;
