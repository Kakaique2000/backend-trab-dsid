import express from 'express';
import { UsuarioController } from './controller/UsuarioController';
import UsuarioRepository from "./dao/usuarioRespository"
import { JwtController } from './auth/JwtController';

export class Router {

    
    public routes() {

        const routes = express.Router()
        routes.get('/usuarios', JwtController.verifyJWT ,UsuarioController.index)
        routes.post('/usuarios', JwtController.verifyJWT, UsuarioController.store)
        routes.delete('/usuarios/:id', JwtController.verifyJWT, UsuarioController.remove)
        routes.post('/usuarios/login', JwtController.login)

        return routes
    }

}

