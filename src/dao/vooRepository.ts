import { knex } from "../connection";
import { Voo } from "../models/voo";

export default class VooRepository {

    public static async findAll(): Promise<Voo[]> {
        return knex<Voo>('voo')
            .innerJoin('aeroporto as origem', 'voo.aeroportoOrigemId', 'origem.id')
            .innerJoin('aeroporto as destino', 'voo.aeroportoDestinoId', 'destino.id')
            .column(
                {origin: 'origem.nome'}, 
                {destiny: 'destino.nome'}, 
                {originAddress: 'origem.endereco'},
                {destinyAddress: 'destino.endereco'},
                {originStateCode: 'destino.codigo_cidade'},
                {destinyStateCode: 'destino.codigo_cidade'},
                {maxPassengers: 'limitePassageiros'}
            );
    }

    public static async findById(id: number): Promise<Voo | undefined> {
        const voo = await knex<Voo>('voo')
            .where({id})
            .first()
            .catch(e =>{
                return Promise.reject({error: `Não foi possível encontrar voo de id ${id}`, description: e})}
            
        );
                
        if (!voo) return Promise.reject({ error: `Não foi possível encontrar voo de id ${id}` });
        
        return voo;
    }
}