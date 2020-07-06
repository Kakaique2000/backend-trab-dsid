import { Voo } from "../models/voo";
import Knex from 'knex';
import moment from 'moment';
import { vooPassageiro } from "../models/vooPassageiro";
const knexVooPassageiro: Knex = require("../connection");

export default class VooPassageiroRepository {

  public static async findVooPassageiro(id: number) {
    return knexVooPassageiro<vooPassageiro>('vooPassageiro')
      .where({ id })
      .first()
  }

  public static async findVooByPassageiroId(id: number) {
    const vooPassageiro = await knexVooPassageiro<vooPassageiro>('vooPassageiro as vp')
      .leftJoin('voo', 'voo.id', 'vp.vooId')
      .leftJoin('aeroporto as origem', 'voo.aeroportoOrigemId', 'origem.id')
      .leftJoin('aeroporto as destino', 'voo.aeroportoDestinoId', 'destino.id')
      .column(
      {id: 'voo.id' },
      {origin: 'origem.nome'}, 
      {destiny: 'destino.nome'}, 
      {originAddress: 'origem.endereco'},
      {destinyAddress: 'destino.endereco'},
      {originCity: 'origem.cidade'},
      {destinyCity: 'destino.cidade'},
      {maxPassengers: 'voo.limitePassageiros'},
      { previstDate: 'dataPrevista' },
      { created_at: 'vp.created_at'},
      {imgUrl: 'imgUrl' },
      {poltrona: 'poltrona'},
      {cost: 'custoPassagem'})
      .where({ usuarioId: id })
    return vooPassageiro;
  }

  public static async bindPassenger(usuarioId: number, vooId: number, poltrona: number, criancas: number, adultos: number): Promise<vooPassageiro> {
      const [id] = await knexVooPassageiro<vooPassageiro>('vooPassageiro')
        .insert({
          adultos,
          criancas,
          poltrona,
          usuarioId,
          vooId
        })
      .returning("id")
    
    return await VooPassageiroRepository.findVooPassageiro(id!) as vooPassageiro;
    

    }

}