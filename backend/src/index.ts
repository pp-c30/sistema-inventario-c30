// importamos la clase server desde server.ts
import { Server } from "./server";
// construimos la funcion
function principal(){

    // se crea la instancia de la clase, que accede a todas sus funciones y ejecuta el constructor en server 
    const servidor = new Server();

//   se ejecuta la funcion
    servidor.listen();
}
// ejecucion de la funcion 
principal();
