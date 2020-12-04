"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articulo_controller_1 = require("../controllers/articulo.controller");
const multer_1 = __importDefault(require("../libs/multer"));
let articuloController = new articulo_controller_1.ArticuloController();
const enrutadorArticulo = express_1.Router();
enrutadorArticulo.route('/articulo').get(/*validarToken, */ articuloController.listarArticulo);
enrutadorArticulo.route('/articulo').post(multer_1.default.single('img'), articuloController.guardarArticulo);
enrutadorArticulo.route('/articulo/:id_articulo/:public_id').delete(articuloController.eliminarArticulo);
enrutadorArticulo.route('/articulo/:id_articulo').put(multer_1.default.single('img'), articuloController.actualizarArticulo);
enrutadorArticulo.route('/articulo/:id_articulo').get(articuloController.obtenerArticulo);
exports.default = enrutadorArticulo;
