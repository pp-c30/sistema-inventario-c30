"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const movimiento_route_1 = __importDefault(require("./routes/movimiento.route"));
const articulo_route_1 = __importDefault(require("./routes/articulo.route"));
const categoria_route_1 = __importDefault(require("./routes/categoria.route"));
const seccion_route_1 = __importDefault(require("./routes/seccion.route"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.configuracion();
        this.middleware();
        this.routes();
    }
    configuracion() {
        this.app.set('port', process.env.port || 3000);
    }
    routes() {
        this.app.use(index_route_1.default);
        this.app.use(movimiento_route_1.default);
        this.app.use(articulo_route_1.default);
        this.app.use(categoria_route_1.default);
        this.app.use(seccion_route_1.default);
    }
    middleware() {
        this.app.use(express_1.default.json());
    }
    listen() {
        this.app.listen(this.app.get('port'));
        console.log('Servidor corriendo');
    }
}
exports.Server = Server;
