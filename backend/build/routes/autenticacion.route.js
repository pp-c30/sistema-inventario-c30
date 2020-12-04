"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_controller_1 = require("../controllers/autenticacion.controller");
const autContoller = new autenticacion_controller_1.AutenticacionController();
const enrrutadorAut = express_1.Router();
enrrutadorAut.route('/registro').post(autContoller.registrar);
enrrutadorAut.route('/ingreso').post(autContoller.ingresar);
exports.default = enrrutadorAut;
