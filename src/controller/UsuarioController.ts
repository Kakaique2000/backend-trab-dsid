import { Response, Request, NextFunction } from "express"
import UsuarioRepository from "../dao/usuarioRespository"
import { Usuario } from "../models/usuario";
import { body, validationResult, checkSchema, matchedData } from 'express-validator'
import jwt from "jsonwebtoken"

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

    /**
     * static async update
     */
    public static async update(req: Request, res: Response) {

        try {
            validationResult(req).throw()
            const user: Usuario = req.body;
            return res.json(await UsuarioRepository.update(user, parseInt(req.params.id)));
        } catch (err) {
            return res.status(422).json(err)
        }
        


    }

    public static UserValidators() {
        return [
            body('born_date').isISO8601().optional(),
            body('username').not().isEmpty().optional(),
            body('email').isEmail().optional(),
            body('name').not().isEmpty().optional(),
            body('password').not().isEmpty().optional(),
        ]
    }

    public static ObjectValidator<T>(keys: (keyof T)[]) {
        return body().custom((value, { req }) => {
                
            let arrErrors: {message: string}[] = [];
            (Object.keys(value) as (keyof T)[]).forEach((e: keyof T) => {
                if (!keys.includes(e)) arrErrors.push(
                    {message: 'propriedade ' + e + ' não existente no tipo Usuario'}
                )
            })

            if (arrErrors.length) {
                throw (arrErrors);
            }
            return true;
         })
    }

    public static verifyLoggedUserId(req: Request, res: Response, next: NextFunction) {
        const  id =  parseInt(req.params.id);
        

        if (res.locals.id !== id) {
            return res.status(401).json({message: 'Voce não está autorizado para modificar o usuário com este ID'})
        }
        next();
    }
}