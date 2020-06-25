import { Response, Request } from "express"
import UsuarioRepository from "../dao/usuarioRespository"
import { Usuario } from "../models/usuario";

export class UsuarioController {
    public static async index(req: Request, res: Response) {
        res.send(await UsuarioRepository.findAll())
    }

    public static async findByUsername(req: Request, res: Response) {
        const { username } = req.body;

        res.send(await UsuarioRepository.findByUsername(username));
    }

    public static async store(req: Request, res: Response) {
        const usuario = req.body as Usuario;
        res.send(await UsuarioRepository.store(usuario))
    }

    public static async remove(req: Request, res: Response) {
        const { id } = req.params;
        res.send(await UsuarioRepository.remove(parseInt(id)));
    }
}