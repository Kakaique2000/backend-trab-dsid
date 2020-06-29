import { Response, Request } from "express"
import AeroportoRepository from "../dao/aeroportoRepository"
import { Usuario } from "../models/usuario";
import { Aeroporto } from "../models/aeroporto";

export class AeroportoController {

    public static async index(req: Request, res: Response) {
        res.json(await AeroportoRepository.findAll())
  } 
  
    public static async findById(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        await AeroportoRepository.findById(id)
            .then(e => res.json(e))
            .catch(e => res.status(404).json(e))

            
        
    }

    public static async store(req: Request, res: Response) {
        const aeroporto = req.body as Aeroporto;
        const aeroportoResponse = await AeroportoRepository.store(aeroporto)
            .catch(
                e => {
                    res.status(400).json(e)
                    return
                }
        )

        res.json(aeroportoResponse)
    }

    public static async remove(req: Request, res: Response) {
        const { id } = req.params;
        res.json(await AeroportoRepository.remove(parseInt(id)));
    }
}