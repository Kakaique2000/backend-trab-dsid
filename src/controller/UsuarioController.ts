import { Response, Request, NextFunction } from "express"
import UsuarioRepository from "../dao/usuarioRespository"
import { Usuario } from "../models/usuario";
import { body, validationResult, checkSchema, matchedData } from 'express-validator'
import jwt from "jsonwebtoken"
import VooPassageiroRepository from "../dao/vooPassageiroRepository";
import { UsuarioDto } from "../models/dtos/usuarioDto";
import VooRepository from "../dao/vooRepository";
import { Voo } from "../models/voo";

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

    public static async vePassagens(req: Request, res: Response) {
        const { id } = req.params;
        const passagens = await VooPassageiroRepository.findVooByPassageiroId(parseInt(id));
        res.json(passagens)
    }

    public static async obtemCredito(req: Request, res: Response) {
        let { credits } = req.body;
        const { id } = req.params;
        const user = await UsuarioRepository.findById(parseInt(id));
        credits += user!.credits;
        res.json(await UsuarioRepository.update({ credits } as Usuario, parseInt(id))
            .catch(description => {
                res.status(422).json({message: "nao foi possivel adquirir creditos", description})
        }));
    }

    public static async compraPassagem(req: Request, res: Response) {
        const { adultos, criancas, vooId, usuarioId, poltrona } = req.body;

        const user = await UsuarioRepository.findById(usuarioId).catch(
            e => res.status(500).json({ message: `Erro ao encontrar usuario` })
        );
        if (!user) return res.status(422).json({ message: `Usuário com id ${usuarioId} não encontrado` })


        const voo = await VooRepository.findById(vooId).catch(
            e => res.status(500).json({ message: `Erro ao encontrar voo` })
        );
        if (!voo) return res.status(422).json({ message: `Voo com id ${usuarioId} não encontrado` })

        const proximoValor = (user as UsuarioDto).credits - (voo as Voo).cost * (adultos + criancas / 2)

        if (proximoValor < 0)
            return res.status(422).json({ message: `Saldo insuficiente, voce precisa de ${proximoValor * -1} para comprar esta passagem` })

        const usuario = await UsuarioRepository.update({ credits: proximoValor } as Usuario, (user as UsuarioDto).id)

        const compra = await VooPassageiroRepository.bindPassenger(
            (user as Usuario).id,
            vooId,
            poltrona,
            criancas,
            adultos
        ).catch(e => {
            console.log(e);
            return e => res.status(500).json({ message: `Erro ao realizar compra` })

        });

        res.json({ compra, usuario });


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

            let arrErrors: { message: string }[] = [];
            (Object.keys(value) as (keyof T)[]).forEach((e: keyof T) => {
                if (!keys.includes(e)) arrErrors.push(
                    { message: 'propriedade ' + e + ' não existente no tipo Usuario' }
                )
            })

            if (arrErrors.length) {
                throw (arrErrors);
            }
            return true;
        })
    }

    public static verifyLoggedUserId(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id);


        if (res.locals.id !== id) {
            return res.status(403).json({ message: 'Voce não está habilitado para modificar o usuário com id ' + id })
        }
        next();
    }
}