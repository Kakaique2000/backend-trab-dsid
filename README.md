# Rodando o projeto

### No diretório raiz do projeto:
```bash
npm i
npx knex migrate:latest
npm run dev
```

### Endpoints funcionais até o momento:
**url base: *http://localhost:4300***

* GET /usuarios - lista todos os usuarios (necessário adequar models)
* POST /usuarios -Adiciona um novo usuário
```json
{
	"username": "kakaique2000",
	"password": "xamaquenoisvem",
	"email": "kaique.lisboa@gmail.com"
}
```
* DELETE /usuarios - Deleta **TODOS** os usuários kkkkk

> Para fazer testes das chamadas, recomenta-se uso de um programa especializado em chamadas de API como [**Insomnia**](https://insomnia.rest/products/core/) ou o [**postman**](https://www.postman.com/downloads/)

## Para infos e lista de pendências, consulte o arquivo [resumo.md](https://github.com/Kakaique2000/backend-trab-dsid/blob/master/resumo.md)
