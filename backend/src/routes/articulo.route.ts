import { Router } from "express";
import {ArticuloController} from "../controllers/articulo.controller"
import multer from "../libs/multer";

let articuloController = new ArticuloController();

const enrutadorArticulo = Router();


enrutadorArticulo.route('/articulo').get(articuloController.listarArticulo);

enrutadorArticulo.route('/articulo').post(multer.single('img'),articuloController.guardarArticulo);

enrutadorArticulo.route('/articulo/:id_articulo/:public_id').delete(articuloController.eliminarArticulo);

enrutadorArticulo.route('/articulo/:id_articulo').put(multer.single('img'),articuloController.actualizarArticulo);

enrutadorArticulo.route('/articulo/:id_articulo').get(articuloController.obtenerArticulo);

export default enrutadorArticulo;

