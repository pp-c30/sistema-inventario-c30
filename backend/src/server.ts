// importamos la funcion express desde la carpeta express
import  express, { Application }  from "express";
// importamos el enrutadorIndex desde el archivo "index.route"
import  cors  from "cors";
// importamos los enrutadores 
import enrutadorIndex from "./routes/index.route";
import enrutadorMovimiento from "./routes/movimiento.route";
import enrutadorArticulo from "./routes/articulo.route";
import enrutadorCategoria from "./routes/categoria.route";
import enrutadorSeccion from "./routes/seccion.route";
import enrrutadorAut from "./routes/autenticacion.route";
import path from "path";

// clase donde estan creados los atributos, metodos y donde seran ejecutados
export class Server {
    //Es un atributo perteneciente a express
    app:Application;
    // es un metodo que se ejecuta por la instancia del servidor 
    constructor (){
        // guardamos "express"en el atributo "app"
        this.app = express();
        // ejecutamos el metodo "configuracion"
        this.configuracion();
        // ejecutamos el metodo "middleware"
        this.middleware();
        // ejecutamos el metodo "routes"
        this.routes();
    }
    // Metodo que permite realizar ajustes 
    configuracion(){
        
        // busca un puerto disponible para usar y en caso de no estar disponible se utiliza el puerto 3000
        this.app.set('port', process.env.port || 3000)
    }
    // metodo qe permite darle uso a las rutas 
    routes(){
        // le damos uso al enrutador index
        this.app.use(enrutadorIndex);
        this.app.use(enrutadorMovimiento);
        this.app.use(enrutadorArticulo);
        this.app.use(enrutadorCategoria);
        this.app.use(enrutadorSeccion);
        this.app.use(enrrutadorAut);
        this.app.use('/upload',express.static(path.resolve('uploads')));
    }

    middleware(){
        // especificamos que "app" use formato "json"
        this.app.use(express.json());
        this.app.use(cors());
    }
    // metodo encargado de correr el servidor bajo un puerto determinado
    listen(){

        // introducimos la funcion "listen" en el atributo y declaramos que corra en el puerto 3000
        this.app.listen(this.app.get('port'));

        // se muestra un mensaje si el servidor esta corriendo 
        console.log('Servidor corriendo');
    }
}