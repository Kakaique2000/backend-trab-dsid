import express from 'express';
import { UsuarioController } from './controller/UsuarioController';
import UsuarioRepository from "./dao/usuarioRespository"
import { JwtController } from './auth/JwtController';

export class Router {

    
    public routes() {

        const routes = express.Router()
        routes.get('/usuarios', UsuarioController.index)
        routes.post('/usuarios', UsuarioController.store)
        routes.delete('/usuarios/:id', UsuarioController.remove)
        routes.post('/usuarios/login', JwtController.login)

        return routes
    }

}

