import { Usuario } from "../models/usuario";
import { UsuarioDto } from "../models/dtos/usuarioDto";
import Knex from "knex";
const knexUser: Knex = require("../connection");

export default class UsuarioRepository {

    public static async findAll(): Promise<Usuario[]> {
        return knexUser<Usuario>('usuario');
    }

    public static async findById(id: number): Promise<UsuarioDto | undefined> {
        return knexUser<Usuario>('usuario')
            .column('username', 'email', 'id', 'credits', 'born_date', 'name')
            .where({id})
            .first();
    }

    public static async findByUsername(username: string): Promise<UsuarioDto | undefined> {
        return knexUser<Usuario>('usuario')
        .column('username', 'email', 'id', 'credits', 'born_date', 'name')
            .where({username})
            .first();
    }

    public static async update(user: Usuario, id: number): Promise<UsuarioDto | undefined> {
        await knexUser<Usuario>('usuario')
            .update(user)
            .where({ id })
        
        return this.findById(id);
    }

    public static async findByUsernameAndPassword(username: string, password: string): Promise<UsuarioDto | undefined> {
        return knexUser<Usuario>('usuario')
        .column('username', 'email', 'id', 'credits', 'born_date', 'name')
            .where({username, password})
            .first();
    }

    public static async store(usuario: Usuario): Promise<UsuarioDto> {
        const [ id ]: number[] = 
            await knexUser<Usuario>('usuario').insert(usuario).returning("id")
    
        const [ userFound ]: UsuarioDto[] = 
            await knexUser<Usuario>('usuario')
            .column('username', 'email', 'id', 'credits', 'born_date', 'name').where({id})
    
        return userFound;
    }

    public static async remove(id: number): Promise<void> {
        await knexUser<Usuario>('usuario').delete().where({id})
    }


}

