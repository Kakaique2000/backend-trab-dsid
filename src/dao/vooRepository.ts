import { knex } from "../connection";
import { Voo } from "../models/voo";
import moment from "moment";

export default class VooRepository {

    public static async findAll(exitDate, backDate): Promise<Voo[]> {
        let query = knex<Voo>('voo')
            .innerJoin('aeroporto as origem', 'voo.aeroportoOrigemId', 'origem.id')
            .innerJoin('aeroporto as destino', 'voo.aeroportoDestinoId', 'destino.id')
            .column(
                {origin: 'origem.nome'}, 
                {destiny: 'destino.nome'}, 
                {originAddress: 'origem.endereco'},
                {destinyAddress: 'destino.endereco'},
                {originCity: 'origem.cidade'},
                {destinyCity: 'destino.cidade'},
                {maxPassengers: 'limitePassageiros'},
                {previstDate: 'dataPrevista' },
                {imgUrl: 'imgUrl' },
                {cost: 'custoPassagem'}
            );

            if (exitDate && backDate) {
                query.where('dataPrevista', '>=', moment(exitDate).startOf('day').toDate().toISOString())
                query.where('dataPrevista', '<', moment(backDate).endOf('day').toDate().toISOString())
            }

            return query;
    }

    public static async findById(id: number): Promise<Voo | undefined> {
        const voo = await knex<Voo>('voo')
            .where('voo.id', '=', id)
            .innerJoin('aeroporto as origem', 'voo.aeroportoOrigemId', 'origem.id')
            .innerJoin('aeroporto as destino', 'voo.aeroportoDestinoId', 'destino.id')
            .column(
                {origin: 'origem.nome'}, 
                {destiny: 'destino.nome'}, 
                {originAddress: 'origem.endereco'},
                {destinyAddress: 'destino.endereco'},
                {originCity: 'origem.cidade'},
                {destinyCity: 'destino.cidade'},
                {maxPassengers: 'limitePassageiros'},
                { imgName: 'imgName' },
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