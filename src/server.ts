import express from 'express';
import { Usuario } from './models/usuario';
import { knex } from './connection';
import { Router } from './routes';


// Create a new express app instance
const app: express.Application = express();

app.use(express.json());
app.use(new Router().routes())


app.listen(4300, () => {
    console.log('Escutando na porta 4200');
    
})