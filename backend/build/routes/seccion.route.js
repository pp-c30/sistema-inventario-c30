"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seccion_controller_1 = require("../controllers/seccion.controller");
const verificarToken_1 = require("../libs/verificarToken");
let seccionController = new seccion_controller_1.SeccionController();
const enrutadorSeccion = express_1.Router();
enrutadorSeccion.route('/seccion').get(verificarToken_1.validarToken, seccionController.listarSeccion);
enrutadorSeccion.route('/seccion').post(seccionController.guardarSeccion);
enrutadorSeccion.route('/seccion/:id_seccion').delete(seccionController.eliminarSeccion);
enrutadorSeccion.route('/seccion/:id_seccion').put(seccionController.actualizarSeccion);
enrutadorSeccion.route('/seccion/:id_seccion').get(seccionController.obtenerSeccion);
exports.default = enrutadorSeccion;
