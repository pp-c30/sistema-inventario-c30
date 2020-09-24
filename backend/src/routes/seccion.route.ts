import { Router } from "express";
import {SeccionController} from "../controllers/seccion.controller"

let seccionController = new SeccionController();

const enrutadorSeccion = Router();


enrutadorSeccion.route('/seccion').get(seccionController.listarSeccion);

enrutadorSeccion.route('/seccion').post(seccionController.guardarSeccion);

enrutadorSeccion.route('/seccion/:id_seccion').delete(seccionController.eliminarSeccion);

enrutadorSeccion.route('/seccion/:id_seccion').put(seccionController.actualizarSeccion);

enrutadorSeccion.route('/seccion/:id_seccion').get(seccionController.obtenerSeccion);

export default enrutadorSeccion;

