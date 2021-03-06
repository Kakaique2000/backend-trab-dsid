import { Request, Response } from "express";
import VooRepository from "../dao/vooRepository";

export class VooController {
    public static async index(req: Request, res: Response) {
        const { exitDate, backDate } = req.query;

        res.json(await VooRepository.findAll(exitDate, backDate))
  }

    public static async findById(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        await VooRepository.findById(id)
            .then(e => res.json(e))
            .catch(e => res.status(404).json(e))    
    }
}