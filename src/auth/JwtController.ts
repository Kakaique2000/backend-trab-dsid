import UsuarioRepository from "../dao/usuarioRespository"
import { Request, Response, NextFunction } from "express";

const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');

dotenv.config();

export class JwtController {
    public static async login(req: Request, res: Response) {
        const { username, password } = req.body;

        const user = await UsuarioRepository.findByUsernameAndPassword(username, password);

        if (user[0]) {
            const token = jwt.sign({ id: user[0].id}, process.env.SECRET);

            res.status(200).send({ auth: true, token, user });
        } else {
            res.status(403).send('Login inválido!');
        }
    }

    public static verifyJWT(req: Request, res: Response, next: any) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];
    
            jwt.verify(token, process.env.SECRET, (err: any, user: any) => {
                if (err) {
                    return res.sendStatus(403);
                }
    
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }
}