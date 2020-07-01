import { Usuario } from "../models/usuario";
import { knex } from "../connection";
import { UsuarioDto } from "../models/dtos/usuarioDto";

export default class UsuarioRepository {

    public static async findAll(): Promise<Usuario[]> {
        return knex<Usuario>('usuario');
    }

    public static async findById(id: number): Promise<UsuarioDto | undefined> {
        return knex<Usuario>('usuario')
            .column('username', 'email', 'id', 'credits', 'born_date', 'name')
            .where({id})
            .first();
    }

    public static async findByUsername(username: string): Promise<UsuarioDto | undefined> {
        return knex<Usuario>('usuario')
        .column('username', 'email', 'id', 'credits', 'born_date', 'name')
            .where({username})
            .first();
    }

    public static async findByUsernameAndPassword(username: string, password: string): Promise<UsuarioDto | undefined> {
        return knex<Usuario>('usuario')
        .column('username', 'email', 'id', 'credits', 'born_date', 'name')
            .where({username, password})
            .first();
    }

    public static async store(usuario: Usuario): Promise<UsuarioDto> {
        const [ id ]: number[] = 
            await knex<Usuario>('usuario').insert(usuario).returning("id")
    
        const [ userFound ]: UsuarioDto[] = 
            await knex<Usuario>('usuario')
            .column('username', 'email', 'id', 'credits', 'born_date', 'name').where({id})
    
        return userFound;
    }

    public static async remove(id: number): Promise<void> {
        await knex<Usuario>('usuario').delete().where({id})
    }


}

