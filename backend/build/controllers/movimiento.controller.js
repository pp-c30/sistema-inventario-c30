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
            let id_articulo = req.params.id_articulo;
            let mov = yield db.query('select *,DATE_FORMAT(fecha_hora, "%d-%m-%Y %h:%m") as fecha_hora from movimiento where id_articulo = ?', [id_articulo]);
            return res.json(mov);
        });
    }
    listarMovDisponible(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id_articulo = req.params.id_art;
            let mov = yield db.query('select *,DATE_FORMAT(fecha_hora, "%d-%m-%Y %h:%m") as fecha_hora from mov_disponible where id_art = ?', [id_articulo]);
            return res.json(mov);
        });
    }
    guardarMovDisponible(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            const cant = req.body.cant;
            const cantMov = req.body.cantMov;
            if (cant == cantMov) {
                const id_md = req.body.id_md;
                const disp = {
                    fecha_hora: new Date(),
                    destino_seccion: req.body.destino_seccion
                };
                yield db.query("update mov_disponible set ? where id_md = ?", [disp, id_md]);
                const mov = {
                    id_articulo: req.body.id_articulo,
                    destino_seccion: req.body.destino_seccion,
                    fecha_hora: new Date(),
                    cantidad: req.body.cant,
                    estado: req.body.estado
                };
                yield db.query("insert into movimiento set ?", [mov]);
            }
            else {
                if (cantMov < cant) {
                    const id_md = req.body.id_md;
                    const disp = {
                        fecha_hora: new Date(),
                        cant: req.body.cant - req.body.cantMov
                    };
                    yield db.query("update mov_disponible set ? where id_md = ?", [disp, id_md]);
                    const dispNew = {
                        fecha_hora: new Date(),
                        destino_seccion: req.body.destino_seccion,
                        cant: req.body.cantMov,
                        id_art: req.body.id_articulo
                    };
                    yield db.query("insert into mov_disponible set ?", [dispNew]);
                    //aca se guarda el historial
                    const mov = {
                        id_articulo: req.body.id_articulo,
                        destino_seccion: req.body.destino_seccion,
                        fecha_hora: new Date(),
                        cantidad: req.body.cant - req.body.cantMov,
                        estado: req.body.estado
                    };
                    const mov2 = {
                        id_articulo: req.body.id_articulo,
                        destino_seccion: req.body.destino_seccion,
                        fecha_hora: new Date(),
                        cantidad: req.body.cantMov
                    };
                    yield db.query("insert into movimiento set ?", [mov]);
                    yield db.query("insert into movimiento set ?", [mov2]);
                }
            }
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
            const disp = yield db.query("select * from mov_disponible where destino_seccion = ? and id_art = ?", [req.body.destino_seccion, req.body.id_articulo]);
            if (disp[0]) {
                const movDisp = {
                    fecha_hora: new Date(),
                    cant: Number(req.body.cantidad) + Number(disp[0].cant),
                };
                yield db.query("update mov_disponible set ? where id_md = ?", [movDisp, disp[0].id_md]);
            }
            else {
                const movDisp = {
                    id_art: req.body.id_articulo,
                    estado: req.body.estado,
                    destino_seccion: req.body.destino_seccion,
                    fecha_hora: new Date(),
                    cant: req.body.cantidad,
                };
                yield db.query("insert into mov_disponible set ?", [movDisp]);
            }
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
