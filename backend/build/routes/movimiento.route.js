"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movimiento_controller_1 = require("../controllers/movimiento.controller");
const verificarToken_1 = require("../libs/verificarToken");
let movimientoController = new movimiento_controller_1.MovimientoController();
const enrutadorMovimiento = express_1.Router();
enrutadorMovimiento.route('/movimiento/:id_articulo').get(verificarToken_1.validarToken, movimientoController.listarMovimiento);
enrutadorMovimiento.route('/mov_disponible/:id_art').get(verificarToken_1.validarToken, movimientoController.listarMovDisponible);
enrutadorMovimiento.route('/movimiento').post(movimientoController.guardarMovimiento);
enrutadorMovimiento.route('/mov_disponible').post(movimientoController.guardarMovDisponible);
enrutadorMovimiento.route('/movimiento/:id_movimiento').delete(movimientoController.eliminarMovimiento);
enrutadorMovimiento.route('/movimiento/:id_movimiento').put(movimientoController.actualizarMovimiento);
enrutadorMovimiento.route('/movimiento/:id_movimiento').get(movimientoController.obtenerMovimiento);
exports.default = enrutadorMovimiento;
