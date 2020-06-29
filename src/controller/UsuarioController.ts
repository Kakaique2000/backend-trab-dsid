import { Response, Request } from "express"
import UsuarioRepository from "../dao/usuarioRespository"
import { Usuario } from "../models/usuario";

export class UsuarioController {
    public static async index(req: Request, res: Response) {
        res.send(await UsuarioRepository.findAll())
    }

    /**
     * findById
     */
    public static async findById(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        res.send(await UsuarioRepository.findById(id));
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