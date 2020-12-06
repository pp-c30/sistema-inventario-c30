"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const cloudinary_1 = __importDefault(require("cloudinary"));
const fs_extra_1 = __importDefault(require("fs-extra"));
cloudinary_1.default.v2.config({
    cloud_name: 'dcbnlcpb6',
    api_key: '188895581713543',
    api_secret: 'Gq1EHc8G4xzv7W-QZxPhYTSM75Q'
});
class ArticuloController {
    listarArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let mov = yield db.query('select *,DATE_FORMAT(fecha_alta, "%d/%m/%Y") as fecha_alta, DATE_FORMAT(fecha_alta, "%d") as day, DATE_FORMAT(fecha_alta, "%m") as month, DATE_FORMAT(fecha_alta, "%Y") as year,(select descripcion from categoria where id_categoria = a.categoria) as categoria, categoria as id_categoria, seccion as id_seccion,(select nombre_seccion from seccion where id_seccion = a.seccion) as seccion from articulo a');
            return res.json(mov);
        });
    }
    guardarArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                const url_img = req.file.path;
                //se busca la imagen en la carpeta upload para luego subirla a cloudinary
                const resultado_cloud = yield cloudinary_1.default.v2.uploader.upload(req.file.path);
                console.log(resultado_cloud);
                //se guarda datos en la base
                const guardarArticulo = {
                    categoria: Number(req.body.categoria),
                    cant_total: Number(req.body.cant_total),
                    cant: Number(req.body.cant),
                    fecha_alta: req.body.fecha_alta,
                    descripcion: req.body.descripcion,
                    seccion: Number(req.body.seccion),
                    estado: Number(req.body.estado),
                    valor: parseFloat(req.body.valor),
                    img: resultado_cloud.url,
                    public_id: resultado_cloud.public_id,
                    origen: req.body.origen
                };
                yield db.query("insert into articulo set ?", [guardarArticulo]);
                fs_extra_1.default.unlink(req.file.path);
                res.json('El articulo fue archivado exitosamente');
            }
            catch (error) {
                res.json('Error al guardar un artículo');
                console.log(error);
            }
        });
    }
    eliminarArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id_articulo = req.params.id_articulo;
            let public_id = req.params.public_id;
            yield cloudinary_1.default.v2.uploader.destroy(public_id);
            const db = yield database_1.conexion();
            yield db.query("delete from articulo where id_articulo = ?", [id_articulo]);
            return res.json('El articulo se eliminó con exito');
        });
    }
    actualizarArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let id_articulo = req.params.id_articulo;
                var updateArticulo;
                var public_id_anterior = req.body.public_id;
                if (req.file) {
                    const resultado_cloud = yield cloudinary_1.default.v2.uploader.upload(req.file.path);
                    updateArticulo = {
                        categoria: req.body.categoria,
                        seccion: req.body.seccion,
                        cant: req.body.cant,
                        cant_total: req.body.cant_total,
                        descripcion: req.body.descripcion,
                        estado: req.body.estado,
                        fecha_alta: req.body.fecha_alta,
                        valor: req.body.valor,
                        origen: req.body.origen,
                        fecha_baja: req.body.fecha_baja,
                        img: resultado_cloud.url,
                        public_id: resultado_cloud.public_id,
                    };
                    yield db.query('update articulo set ? where id_articulo = ?', [updateArticulo, id_articulo]);
                    fs_extra_1.default.unlink(req.file.path);
                    yield cloudinary_1.default.v2.uploader.destroy(public_id_anterior);
                    return res.json('El articulo se actualizó con exito');
                }
                else {
                    updateArticulo = {
                        categoria: req.body.categoria,
                        seccion: req.body.seccion,
                        cant: req.body.cant,
                        cant_total: req.body.cant_total,
                        descripcion: req.body.descripcion,
                        estado: req.body.estado,
                        fecha_alta: req.body.fecha_alta,
                        valor: req.body.valor,
                        origen: req.body.origen,
                        fecha_baja: req.body.fecha_baja
                    };
                    yield db.query('update articulo set ? where id_articulo = ?', [updateArticulo, id_articulo]);
                    return res.json('El articulo se actualizó con exito');
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    obtenerArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id_articulo = req.params.id_articulo;
            let unArticulo = yield db.query("select * from articulo where id_articulo = ?", [id_articulo]);
            return res.json(unArticulo[0]);
        });
    }
}
exports.ArticuloController = ArticuloController;
