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
      .join('voo as v', 'v.id', 'vp.vooId')
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