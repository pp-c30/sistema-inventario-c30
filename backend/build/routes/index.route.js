"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = require("../controllers/index.controller");
let enrutadorIndex = express_1.Router();
enrutadorIndex.route('/').get(index_controller_1.mensaje_bienvenida);
exports.default = enrutadorIndex;
