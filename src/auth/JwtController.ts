import UsuarioRepository from "../dao/usuarioRespository"
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const dotenv = require("dotenv");

dotenv.config();

export class JwtController {
    public static async login(req: Request, res: Response) {
        const { username, password } = req.body;

        const user = await UsuarioRepository.findByUsernameAndPassword(username, password);

        if (user) {
            const token = jwt.sign({ id: user.id}, process.env.SECRET!);

            res.status(200).send({ auth: true, token, user });
        } else {
            res.status(403).send('Login inválido!');
        }
    }

    public static verifyJWT(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];
    
            jwt.verify(token, process.env.SECRET!, (err: any, user: any) => {
                if (err) {
                    return res.sendStatus(403);
                }
                
                res.locals.id = user.id;
                console.log(req.headers);
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }

}