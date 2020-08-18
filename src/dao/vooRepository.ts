import { Voo, VooSkyscanner } from "../models/voo";
import Knex from 'knex';
import moment from 'moment';
const knexVoo: Knex = require("../connection");

export default class VooRepository {

    public static async findAll(exitDate, backDate): Promise<Voo[]> {
        let query = knexVoo<Voo>('voo')
            .innerJoin('aeroporto as origem', 'voo.aeroportoOrigemId', 'origem.id')
            .innerJoin('aeroporto as destino', 'voo.aeroportoDestinoId', 'destino.id')
            .column(
                {id: 'voo.id'},
                {origin: 'origem.nome'}, 
                {destiny: 'destino.nome'}, 
                {originAddress: 'origem.endereco'},
                {destinyAddress: 'destino.endereco'},
                {originCity: 'origem.cidade'},
                {destinyCity: 'destino.cidade'},
                {maxPassengers: 'limitePassageiros'},
                {previstDate: 'dataPrevista' },
                {imgUrl: 'imgUrl' },
                { cost: 'custoPassagem' },
            );

            if (exitDate && backDate) {
                query.where('dataPrevista', '>=', moment(exitDate).startOf('day').toDate().toISOString())
                query.where('dataPrevista', '<', moment(backDate).endOf('day').toDate().toISOString())
            }

            return query;
    }

    public static async findById(id: number): Promise<Voo | undefined> {
        const voo = await knexVoo<Voo>('voo')
            .where('voo.id', '=', id)
            .innerJoin('aeroporto as origem', 'voo.aeroportoOrigemId', 'origem.id')
            .innerJoin('aeroporto as destino', 'voo.aeroportoDestinoId', 'destino.id')
            .column(
                {id: 'voo.id'},
                {origin: 'origem.nome'}, 
                {destiny: 'destino.nome'}, 
                {originAddress: 'origem.endereco'},
                {destinyAddress: 'destino.endereco'},
                {originCity: 'origem.cidade'},
                {destinyCity: 'destino.cidade'},
                {maxPassengers: 'limitePassageiros'},
                { previstDate: 'dataPrevista' },
                { imgUrl: 'imgUrl' },
                { cost: 'custoPassagem'}
            )
            .first()
            .catch(e => {
                return Promise.reject({error: `Não foi possível encontrar voo de id ${id}`, description: e})}
        );
                
        if (!voo) return Promise.reject({ error: `Não foi possível encontrar voo de id ${id}` });
        
        return voo;
    }
}

export class VooSkyscannerRepository {
    public static async findByUserId(id: number): Promise<VooSkyscanner[] | undefined> {
        const voo = await knexVoo<VooSkyscanner>('voo')
            .where({usuarioId: id})
            .catch(e => {
                return Promise.reject({error: `Não foi possível encontrar voo de usuario de id ${id}`, description: e})}
        );
                
        if (!voo) return Promise.reject({ error: `Não foi possível encontrar voo de usuario de id ${id}` });
        
        return voo;
    }

    public static async findById(id: number): Promise<VooSkyscanner | undefined> {
        const voo = await knexVoo<VooSkyscanner>('voo')
            .where({ id })
            .first()
            .catch(e => {
                return Promise.reject({error: `Não foi possível encontrar voo de id ${id}`, description: e})}
        );
                
        if (!voo) return Promise.reject({ error: `Não foi possível encontrar voo de id ${id}` });
        
        return voo;
    }


    public static async insert(vooForm: VooSkyscanner): Promise<VooSkyscanner> {
        const id = await knexVoo<VooSkyscanner>('voo')
            .insert(vooForm)
            .returning("id")
            .catch(e => {
                return Promise.reject({error: `Não foi possível inserir voo`, description: e})}
        );
                
        if (!id) return Promise.reject({ error: `Não foi possível inserir` });
        
        return await VooSkyscannerRepository.findById(id[0]!) as VooSkyscanner;
    }

}