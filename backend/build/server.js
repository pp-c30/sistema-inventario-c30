"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
// importamos la funcion express desde la carpeta express
const express_1 = __importDefault(require("express"));
// importamos el enrutadorIndex desde el archivo "index.route"
const cors_1 = __importDefault(require("cors"));
// importamos los enrutadores 
const index_route_1 = __importDefault(require("./routes/index.route"));
const movimiento_route_1 = __importDefault(require("./routes/movimiento.route"));
const articulo_route_1 = __importDefault(require("./routes/articulo.route"));
const categoria_route_1 = __importDefault(require("./routes/categoria.route"));
const seccion_route_1 = __importDefault(require("./routes/seccion.route"));
const autenticacion_route_1 = __importDefault(require("./routes/autenticacion.route"));
const path_1 = __importDefault(require("path"));
// clase donde estan creados los atributos, metodos y donde seran ejecutados
class Server {
    // es un metodo que se ejecuta por la instancia del servidor 
    constructor() {
        // guardamos "express"en el atributo "app"
        this.app = express_1.default();
        // ejecutamos el metodo "configuracion"
        this.configuracion();
        // ejecutamos el metodo "middleware"
        this.middleware();
        // ejecutamos el metodo "routes"
        this.routes();
    }
    // Metodo que permite realizar ajustes 
    configuracion() {
        // busca un puerto disponible para usar y en caso de no estar disponible se utiliza el puerto 3000
        this.app.set('port', process.env.port || 3000);
    }
    // metodo qe permite darle uso a las rutas 
    routes() {
        // le damos uso al enrutador index
        this.app.use(index_route_1.default);
        this.app.use(movimiento_route_1.default);
        this.app.use(articulo_route_1.default);
        this.app.use(categoria_route_1.default);
        this.app.use(seccion_route_1.default);
        this.app.use(autenticacion_route_1.default);
        this.app.use('/upload', express_1.default.static(path_1.default.resolve('uploads')));
    }
    middleware() {
        // especificamos que "app" use formato "json"
        this.app.use(express_1.default.json());
        this.app.use(cors_1.default());
    }
    // metodo encargado de correr el servidor bajo un puerto determinado
    listen() {
        // introducimos la funcion "listen" en el atributo y declaramos que corra en el puerto 3000
        this.app.listen(this.app.get('port'));
        // se muestra un mensaje si el servidor esta corriendo 
        console.log('Servidor corriendo');
    }
}
exports.Server = Server;
