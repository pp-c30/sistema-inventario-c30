"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importamos la clase server desde server.ts
const server_1 = require("./server");
// construimos la funcion
function principal() {
    // se crea la instancia de la clase, que accede a todas sus funciones y ejecuta el constructor en server 
    const servidor = new server_1.Server();
    //   se ejecuta la funcion
    servidor.listen();
}
// ejecucion de la funcion 
principal();
