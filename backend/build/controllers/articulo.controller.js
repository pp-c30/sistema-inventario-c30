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
exports.ArticuloController = void 0;
const database_1 = require("../database");
class ArticuloController {
    listarArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let mov = yield db.query('select * from articulo');
            return res.json(mov);
        });
    }
    guardarArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            const mov = req.body;
            const url_img = req.file.path;
            const guardarArticulo = {
                categoria: req.body.categoria,
                cant_total: req.body.cant_total,
                cant: req.body.cant,
                fecha_alta: req.body.fecha_alta,
                descripcion: req.body.descripcion,
                seccion: req.body.seccion,
                estado: req.body.estado,
                valor: req.body.valor,
                img: url_img,
                origen: req.body.origen
            };
            yield db.query("insert into articulo set ?", [guardarArticulo, mov]);
            return res.json('El articulo fue archivado exitosamente');
        });
    }
    eliminarArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id_articulo = req.params.id_articulo;
            yield db.query("delete from articulo where id_articulo = ?", [id_articulo]);
            return res.json('El articulo se eliminó con exito');
        });
    }
    actualizarArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id_articulo = req.params.id_articulo;
            let new_articulo = req.body;
            yield db.query("update articulo set ? where id_articulo = ?", [new_articulo, id_articulo]);
            return res.json('El articulo se actualizó con exito');
        });
    }
    obtenerArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id_articulo = req.params.id_articulo;
            let unArticulo = yield db.query("select * from articulo where id_articulo = ?", [id_articulo]);
            return res.json(unArticulo[0]);
        });
    }
}
exports.ArticuloController = ArticuloController;
