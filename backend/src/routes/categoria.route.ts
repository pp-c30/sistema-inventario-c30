import { Router } from "express";
import {CategoriaController} from "../controllers/categoria.controller"

let categoriaController = new CategoriaController();

const enrutadorCategoria = Router();


enrutadorCategoria.route('/categoria').get(categoriaController.listarCategoria);

enrutadorCategoria.route('/categoria').post(categoriaController.guardarCategoria);

enrutadorCategoria.route('/categoria/:id_categoria').delete(categoriaController.eliminarCategoria);

enrutadorCategoria.route('/categoria/:id_categoria').put(categoriaController.actualizarCategoria);

enrutadorCategoria.route('/categoria/:id_categoria').get(categoriaController.obtenerCategoria);

export default enrutadorCategoria;

