"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function validarToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        res.json('Acceso denegado');
    }
    else {
        const datosToken = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'fdsagdfg654');
        console.log(datosToken);
        next();
    }
}
exports.validarToken = validarToken;
