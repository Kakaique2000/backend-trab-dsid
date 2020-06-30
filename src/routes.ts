import express from 'express';
import { UsuarioController } from './controller/UsuarioController';
import UsuarioRepository from "./dao/usuarioRespository"
import { JwtController } from './auth/JwtController';
import { AeroportoController } from './controller/AeroportoController';

export class Router {

    
    public routes() {

        const routes = express.Router()
        // login
        routes.post('/usuarios/login', JwtController.login)

        // usuarios
        routes.post('/usuarios', UsuarioController.store)
        routes.get('/usuarios', JwtController.verifyJWT ,UsuarioController.index)
        routes.delete('/usuarios/:id', JwtController.verifyJWT, UsuarioController.remove)
        
        // aeroportos
        routes.get('/aeroportos', AeroportoController.index);
        routes.get('/aeroportos/:id', AeroportoController.findById);
        routes.post('/aeroportos', JwtController.verifyJWT, AeroportoController.store);
        routes.delete('/aeroportos/:id', JwtController.verifyJWT, AeroportoController.remove);

        return routes
    }

}

