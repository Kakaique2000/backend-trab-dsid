import { Usuario } from "../models/usuario";
import { knex } from "../connection";
import axios from 'axios'
import { UsuarioDto } from "../models/dtos/usuarioDto";
import { AeroportoDto, AeroportoDetalhadoDto } from "../models/dtos/aeroportoDto";
import { Cidade } from "../models/locacao";

export default class LocacaoRepository {

    public static async findById(id: number): Promise<Cidade> {

        const cidadeResponse = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${id}`)
            .catch(e => { throw e });
        if (!cidadeResponse) {
            throw new Error(`Não foi encontrada nenhuma cidade com id ${id}`);
            
        }
        return cidadeResponse.data;
    }


}

