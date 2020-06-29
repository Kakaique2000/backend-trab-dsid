import { Usuario } from "../models/usuario";
import { knex } from "../connection";
import { UsuarioDto } from "../models/dtos/usuarioDto";
import { AeroportoDto, AeroportoDetalhadoDto } from "../models/dtos/aeroportoDto";
import { Cidade } from "../models/locacao";
import LocacaoRepository from "./locacaoRepository";
import { Aeroporto } from "../models/aeroporto";
import Knex from "knex";

export default class aeroportoRepository {

    public static async findAll(): Promise<AeroportoDto[]> {
        return knex<AeroportoDto>('aeroporto');
    }

    public static async findById(id: number): Promise<AeroportoDetalhadoDto | undefined> {
        const aeroporto = await knex<Aeroporto>('aeroporto')
            .where({id})
            .first()
            .catch(e =>{
                return Promise.reject({error: `Não foi possível selecionar aeroporto de id ${id}`, description: e})}
            
        );
                
        if (!aeroporto) return Promise.reject({ error: `Não foi possível selecionar aeroporto de id ${id}` });
        
        return await this.anexaCidade(aeroporto);
        
    }

    private static async anexaCidade(aeroporto: Aeroporto): Promise<AeroportoDetalhadoDto | undefined> {
        try {
            const cidade: Cidade = await LocacaoRepository.findById(aeroporto.codigo_cidade)
                .catch(e => {
                    throw e
                });
            
        
            const aeroportoResponse: AeroportoDetalhadoDto = {
                ...aeroporto,
                nome_cidade: cidade.nome,
                codigo_uf: cidade.microrregiao.mesorregiao.UF.id,
                nome_uf: cidade.microrregiao.mesorregiao.UF.nome,
            }
            
            return aeroportoResponse;
        } catch (error) {
            return Promise.reject(error)
        }
       
    }

    public static async store(aeroporto: Aeroporto): Promise<AeroportoDetalhadoDto | undefined> {
        let id: number = 0;
        try {
           await knex<Aeroporto>('aeroporto').insert(aeroporto)
                .then(e => id = e[0])
                .catch(e => { throw e })
            
            try {
                const [ aeroportoFound ]: AeroportoDto[] = 
                await knex<Aeroporto>('aeroporto').where({id})            
                return await this.anexaCidade(aeroportoFound).
                    catch( e => {throw e}
                    );

            } catch (error) {
                return Promise.reject({error: 'não foi possíver encontrar cidade', description: error})
            }
            
       } catch (err) {
           return Promise.reject({error: 'não foi possíver inserir aeroporto', description: err})
       }
    
       
    }

    public static async remove(id: number): Promise<void> {
        await knex<Aeroporto>('aeroporto').delete().where({id})
    }


}

