import express from 'express';
import { UsuarioController } from './controller/UsuarioController';
import UsuarioRepository from "./dao/usuarioRespository"
import { JwtController } from './auth/JwtController';
import { AeroportoController } from './controller/AeroportoController';
import { VooController } from './controller/vooController';
import { Usuario } from './models/usuario';
export class Router {

    
    public routes() {

        const routes = express.Router()
        // login
        routes.post('/usuarios/login', JwtController.login)

        // usuarios
        routes.post('/usuarios',
            UsuarioController.store)
        
        routes.get('/usuarios',
            JwtController.verifyJWT,
            UsuarioController.index)
        
        routes.get('/usuarios/:id',
            JwtController.verifyJWT,
            UsuarioController.verifyLoggedUserId,
            UsuarioController.findById)
        
        routes.delete('/usuarios/:id',
            JwtController.verifyJWT,
            UsuarioController.verifyLoggedUserId,
            UsuarioController.remove)
        
        routes.put('/usuarios/:id',
            JwtController.verifyJWT,
            UsuarioController.verifyLoggedUserId,
            UsuarioController.UserValidators(),
            UsuarioController.ObjectValidator<Usuario>(['username', 'email', 'id', 'password', 'born_date', 'name']),
            UsuarioController.update)
        
        routes.post('/usuarios/:id/voos',
            JwtController.verifyJWT,
            UsuarioController.verifyLoggedUserId,
            UsuarioController.compraPassagem
        )

        routes.get('/usuarios/:id/voos',
            JwtController.verifyJWT,
            UsuarioController.verifyLoggedUserId,
            UsuarioController.vePassagens
        )
            
        routes.post('/usuarios/:id/creditos',
            JwtController.verifyJWT,
            UsuarioController.verifyLoggedUserId,
            UsuarioController.obtemCredito
        )
        // aeroportos
        routes.get('/aeroportos', AeroportoController.index);
        routes.get('/aeroportos/:id', AeroportoController.findById);
        routes.post('/aeroportos', JwtController.verifyJWT, AeroportoController.store);
        routes.delete('/aeroportos/:id', JwtController.verifyJWT, AeroportoController.remove);

        // Voo
        routes.get('/voos', VooController.index);
        routes.get('/voos/:id', VooController.findById);

        return routes
    }

}

