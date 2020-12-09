// importamos la funcion "Router" desde "express"
import { Router } from "express";
// importamos el metodo "CategoriaController" desde el archivo "categorias.controllers"
import {CategoriaController} from "../controllers/categoria.controller"
//importamos el metodo de que valida los tokens
import { validarToken } from "../libs/verificarToken";
//instacia que permite tener todas las funciones de la clase "categoriaController"
let categoriaController = new CategoriaController();

// creamos una variable constante llamada "enrutadorCategoria", se guardan las funciones del Router 
const enrutadorCategoria = Router();

// creamos una ruta que realiza la peticion listar
enrutadorCategoria.route('/categoria').get(validarToken, categoriaController.listarCategoria);
// creamos una ruta que guarda los datos en la db
enrutadorCategoria.route('/categoria').post(categoriaController.guardarCategoria);
// creamos una ruta que elimina datos de la db
enrutadorCategoria.route('/categoria/:id_categoria').delete(categoriaController.eliminarCategoria);
// creamos una ruta que permite actualizar datos en la db
enrutadorCategoria.route('/categoria/:id_categoria').put(categoriaController.actualizarCategoria);
// creamos una ruta que obtiene una categoria en especifico desde la db
enrutadorCategoria.route('/categoria/:id_categoria').get(categoriaController.obtenerCategoria);
// exportamos
export default enrutadorCategoria;

