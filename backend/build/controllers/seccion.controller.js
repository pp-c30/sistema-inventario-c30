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
class SeccionController {
    listarSeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let sec = yield db.query('select * from seccion');
            return res.json(sec);
        });
    }
    guardarSeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            const sec = req.body;
            yield db.query("insert into seccion set ?", [sec]);
            return res.json('La seccion fue creada exitosamente');
        });
    }
    eliminarSeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id_seccion = req.params.id_seccion;
            yield db.query("delete from seccion where id_seccion = ?", [id_seccion]);
            return res.json('La seccion se eliminó con exito');
        });
    }
    actualizarSeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id_seccion = req.params.id_seccion;
            let new_seccion = req.body;
            yield db.query("update seccion set ? where id_seccion = ?", [new_seccion, id_seccion]);
            return res.json('La seccion se actualizó con exito');
        });
    }
    obtenerSeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id_seccion = req.params.id_seccion;
            let unSeccion = yield db.query("select * from seccion where id_seccion = ?", [id_seccion]);
            return res.json(unSeccion[0]);
        });
    }
}
exports.SeccionController = SeccionController;
