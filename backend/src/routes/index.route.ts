
import { Router } from "express";

import { mensaje_bienvenida } from "../controllers/index.controller";

let enrutadorIndex = Router();

enrutadorIndex.route('/').get(mensaje_bienvenida);

export default enrutadorIndex;
