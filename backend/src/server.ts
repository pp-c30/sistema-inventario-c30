import  express, { Application }  from "express";
import  cors  from "cors";
import enrutadorIndex from "./routes/index.route";
import enrutadorMovimiento from "./routes/movimiento.route";
import enrutadorArticulo from "./routes/articulo.route";
import enrutadorCategoria from "./routes/categoria.route";
import enrutadorSeccion from "./routes/seccion.route";
import path from "path";

export class Server {
    //Es un atributo perteneciente a express
    app:Application;

    constructor (){
        
        this.app = express();
        this.configuracion();
        this.middleware();
        this.routes();
    }

    configuracion(){
        
        this.app.set('port', process.env.port || 3000)
    }

    routes(){
        
        this.app.use(enrutadorIndex);
        this.app.use(enrutadorMovimiento);
        this.app.use(enrutadorArticulo);
        this.app.use(enrutadorCategoria);
        this.app.use(enrutadorSeccion);
        this.app.use('/upload',express.static(path.resolve('uploads')));
    }

    middleware(){
     
        this.app.use(express.json());
        this.app.use(cors());
    }

    listen(){
        this.app.listen(this.app.get('port'));
        console.log('Servidor corriendo');
    }
}