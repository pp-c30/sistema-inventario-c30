import { Router } from "express";
import {MovimientoController} from "../controllers/movimiento.controller"
import { validarToken } from "../libs/verificarToken";

let movimientoController = new MovimientoController();

const enrutadorMovimiento = Router();


enrutadorMovimiento.route('/movimiento/:id_articulo').get(validarToken, movimientoController.listarMovimiento);

enrutadorMovimiento.route('/mov_disponible/:id_art').get(validarToken, movimientoController.listarMovDisponible);

enrutadorMovimiento.route('/movimiento').post(movimientoController.guardarMovimiento);

enrutadorMovimiento.route('/mov_disponible').post(movimientoController.guardarMovDisponible);

enrutadorMovimiento.route('/movimiento/:id_movimiento').delete(movimientoController.eliminarMovimiento);

enrutadorMovimiento.route('/movimiento/:id_movimiento').put(movimientoController.actualizarMovimiento);

enrutadorMovimiento.route('/movimiento/:id_movimiento').get(movimientoController.obtenerMovimiento);

export default enrutadorMovimiento;

