import { Voo, VooSkyscanner } from "../models/voo";
import Knex from 'knex';
import moment from 'moment';
import { vooPassageiro } from "../models/vooPassageiro";

const soap = require('strong-soap').soap;
const knexVooPassageiro: Knex = require("../connection");

export default class VooPassageiroRepository {

  public static async findVooPassageiro(id: number) {
    return knexVooPassageiro<vooPassageiro>('vooPassageiro')
      .where({ id })
      .first()
  }

  public static async findVooByPassageiroId(id: number) {
    return new Promise((resolve, reject) => {
      const url = "http://localhost:8080/flightws?wsdl";
      const options = {};
      const requestArgs = {
        userId: id
      };
  
      soap.createClient(url, options, (err, client) => {
        var method = client['getFlightsByUserId'];
        method(requestArgs, async (err, result, envelope, soapHeader) => {
          if (err) {
            reject(err)
          }

          let tickets = Array();

          console.log(result.return);

          for (let ticket of result.return) {
            const voo = await knexVooPassageiro<VooSkyscanner>('voo')
            .where({id: ticket.id});

            console.log(voo, "voo");


            let item = {
              ...ticket,
              ...voo[0]
            };
            
            tickets.push(item);
          } 

          resolve(tickets);
        })
      })
    })
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