import { Router } from "express";
import { AutenticacionController } from "../controllers/autenticacion.controller";

const autContoller = new AutenticacionController();

const enrrutadorAut = Router();

enrrutadorAut.route('/registro').post(autContoller.registrar);

enrrutadorAut.route('/ingreso').post(autContoller.ingresar);

export default enrrutadorAut;