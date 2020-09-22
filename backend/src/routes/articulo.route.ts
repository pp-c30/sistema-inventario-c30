import { Router } from "express";
import {ArticuloController} from "../controllers/articulo.controller"

let articuloController = new ArticuloController();

const enrutadorArticulo = Router();


enrutadorArticulo.route('/articulo').get(articuloController.listarArticulo);

enrutadorArticulo.route('/articulo').post(articuloController.guardarArticulo);

enrutadorArticulo.route('/articulo/:id_articulo').delete(articuloController.eliminarArticulo);

enrutadorArticulo.route('/articulo/:id_articulo').put(articuloController.actualizarArticulo);

enrutadorArticulo.route('/articulo/:id_articulo').get(articuloController.obtenerArticulo);

export default enrutadorArticulo;

