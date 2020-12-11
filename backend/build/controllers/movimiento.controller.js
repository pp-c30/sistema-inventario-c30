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
exports.MovimientoController = void 0;
const database_1 = require("../database");
class MovimientoController {
    listarMovimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let mov = yield db.query('select * from movimiento');
            return res.json(mov);
        });
    }
    guardarMovimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            const mov = {
                id_articulo: req.body.id_articulo,
                destino_seccion: req.body.destino_seccion,
                fecha_hora: new Date(),
                cantidad: req.body.cantidad,
                estado: req.body.estado
            };
            yield db.query("insert into movimiento set ?", [mov]);
            const art = {
                cant: req.body.cantidad_total - req.body.cantidad
            };
            yield db.query("update articulo set ? where id_articulo = ?", [art, req.body.id_articulo]);
            return res.json('El movimiento fue archivado exitosamente');
        });
    }
    eliminarMovimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id_movimiento = req.params.id_movimiento;
            yield db.query("delete from movimiento where id_movimiento = ?", [id_movimiento]);
            return res.json('El movimiento se eliminó con exito');
        });
    }
    actualizarMovimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id_movimiento = req.params.id_movimiento;
            let new_movimiento = req.body;
            yield db.query("update movimiento set ? where id_movimiento = ?", [new_movimiento, id_movimiento]);
            return res.json('El movimiento se actualizó con exito');
        });
    }
    obtenerMovimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id_movimiento = req.params.id_movimiento;
            let unMovimiento = yield db.query("select * from movimiento where id_movimiento = ?", [id_movimiento]);
            return res.json(unMovimiento[0]);
        });
    }
}
exports.MovimientoController = MovimientoController;
