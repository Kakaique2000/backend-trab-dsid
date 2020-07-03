import { Aeroporto } from "../models/aeroporto";
import Knex from "knex";
const knexFile = require('../../knexfile')
const knex = Knex(knexFile[process.env['ENVIRONMENT'] || 'development']);

export default class aeroportoRepository {

    public static async findAll(): Promise<Aeroporto[]> {
        return knex<Aeroporto>('aeroporto');
    }

    public static async findById(id: number): Promise<Aeroporto | undefined> {
        const aeroporto = await knex<Aeroporto>('aeroporto')
            .where({id})
            .first()
            .catch(e =>{
                return Promise.reject({error: `Não foi possível selecionar aeroporto de id ${id}`, description: e})}
            
        );
                
        if (!aeroporto) return Promise.reject({ error: `Não foi possível selecionar aeroporto de id ${id}` });
        
        return aeroporto;
    }

    // private static async anexaCidade(aeroporto: Aeroporto): Promise<AeroportoDetalhadoDto | undefined> {
    //     try {
    //         const cidade: Cidade = await LocacaoRepository.findById(aeroporto.id)
    //             .catch(e => {
    //                 throw e
    //             });
            
        
    //         const aeroportoResponse: AeroportoDetalhadoDto = {
    //             ...aeroporto,
    //             nome_cidade: cidade.nome,
    //             codigo_uf: cidade.microrregiao.mesorregiao.UF.id,
    //             nome_uf: cidade.microrregiao.mesorregiao.UF.nome,
    //         }
            
    //         return aeroportoResponse;
    //     } catch (error) {
    //         return Promise.reject(error)
    //     }
       
    // }

    public static async store(aeroporto: Aeroporto): Promise<Aeroporto | undefined> {
        let id: number = 0;
        try {
            const [ id ]: number[] = await knex<Aeroporto>('aeroporto').insert(aeroporto).returning("id");
            
            const [ aeroportoFound ]: Aeroporto[] = await knex<Aeroporto>('aeroporto').where({id});
            return aeroportoFound;
       } catch (err) {
           return Promise.reject({error: 'não foi possíver inserir aeroporto', description: err})
       }
    }

    public static async remove(id: number): Promise<void> {
        await knex<Aeroporto>('aeroporto').delete().where({id})
    }


}

