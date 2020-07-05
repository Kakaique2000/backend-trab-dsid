import { Usuario } from './models/usuario';
import { Router } from './routes';
import { JwtController } from './auth/JwtController';

import express from 'express';
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
var cors = require('cors');

// Create a new express app instance
const app = express();

app.use(cors());

app.use(express.json());
app.use(new Router().routes())
app.use(bodyParser.json());

app.listen(4300, () => {
    console.log('Escutando na porta 4300');
    
})