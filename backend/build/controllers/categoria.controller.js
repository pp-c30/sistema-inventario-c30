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
const database_1 = require("../database");
class CategoriaController {
    listarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let cat = yield db.query('select * from categoria');
            return res.json(cat);
        });
    }
    guardarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            const cat = req.body;
            yield db.query("insert into categoria set ?", [cat]);
            return res.json('La categoria fue creada exitosamente');
        });
    }
    eliminarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id_categoria = req.params.id_categoria;
            yield db.query("delete from categoria where id_categoria = ?", [id_categoria]);
            return res.json('La categoria se eliminó con exito');
        });
    }
    actualizarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id_categoria = req.params.id_categoria;
            let new_categoria = req.body;
            yield db.query("update categoria set ? where id_categoria = ?", [new_categoria, id_categoria]);
            return res.json('La categoria se actualizó con exito');
        });
    }
    obtenerCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id_categoria = req.params.id_categoria;
            let unCategoria = yield db.query("select * from categoria where id_categoria = ?", [id_categoria]);
            return res.json(unCategoria[0]);
        });
    }
}
exports.CategoriaController = CategoriaController;
