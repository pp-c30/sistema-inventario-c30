
import  express, { Application }  from "express";

import enrutadorIndex from "./routes/index.route";

import enrutadorMovimiento from "./routes/movimiento.route"

export class Server {
    
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
    }

    middleware(){
     
        this.app.use(express.json());
    }

    listen(){
        this.app.listen(this.app.get('port'));
        console.log('Servidor corriendo');
    }
}
