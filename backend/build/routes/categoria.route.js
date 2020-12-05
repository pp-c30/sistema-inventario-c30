"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importamos la funcion "Router" desde "express"
const express_1 = require("express");
// importamos el metodo "CategoriaController" desde el archivo "categorias.controllers"
const categoria_controller_1 = require("../controllers/categoria.controller");
//instacia que permite tener todas las funciones de la clase "categoriaController"
let categoriaController = new categoria_controller_1.CategoriaController();
// creamos una variable constante llamada "enrutadorCategoria", se guardan las funciones del Router 
const enrutadorCategoria = express_1.Router();
// creamos una ruta que realiza la peticion listar
enrutadorCategoria.route('/categoria').get(/*validarToken, */ categoriaController.listarCategoria);
// creamos una ruta que guarda los datos en la db
enrutadorCategoria.route('/categoria').post(categoriaController.guardarCategoria);
// creamos una ruta que elimina datos de la db
enrutadorCategoria.route('/categoria/:id_categoria').delete(categoriaController.eliminarCategoria);
// creamos una ruta que permite actualizar datos en la db
enrutadorCategoria.route('/categoria/:id_categoria').put(categoriaController.actualizarCategoria);
// creamos una ruta que obtiene una categoria en especifico desde la db
enrutadorCategoria.route('/categoria/:id_categoria').get(categoriaController.obtenerCategoria);
// exportamos
exports.default = enrutadorCategoria;
