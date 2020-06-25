import { Usuario } from "../models/usuario";
import { knex } from "../connection";

export default class UsuarioRepository {

    public static async findAll(): Promise<Usuario[]> {
        return knex<Usuario>('usuario');
    }

    public static async findByUsername(username: String): Promise<Usuario[]> {
        return knex('usuario').where({username});
    }

    public static async findByUsernameAndPassword(username: String, password: String): Promise<Usuario[]> {
        return knex('usuario').where({username, password});
    }

    public static async store(usuario: Usuario): Promise<Usuario> {
        const [ id ]: number[] = 
            await knex<Usuario>('usuario').insert(usuario).returning("id")
    
        const [ userFound ]: Usuario[] = 
            await knex('usuario').where({id})
    
        return userFound;
    }

    public static async remove(id: number): Promise<void> {
        await knex('usuario').delete().where({id})
    }


}

