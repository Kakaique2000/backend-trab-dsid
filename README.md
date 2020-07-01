# Rodando o projeto

### No diretório raiz do projeto:
```bash
npm i
npx knex migrate:latest
npx knex seed:run usuarios_seed
npm run dev
```

# Somente neste commit (caso voce esteja com os knexfile e migrations em .js)
```bash
npm run migrate_reset
npx run knex seed:run usuarios_seed
```
## Para fazer Login:
- usuario: admin
- senha: admin1234

## Testando a API

> Para fazer testes das chamadas, é necessário o uso de um programa especializado em chamadas de API como [**Insomnia**](https://insomnia.rest/products/core/) ou o [**postman**](https://www.postman.com/downloads/)

> Collection do Insomnia presente na raiz do projeto, importe a collection para ter o workspace de teste dos endpoints preparado (lembrando que para fazer grande parte das chamadas será necessário fazer a chamada de autorization para gerar o token que será utilizado nas próximas chamadas)

## Para infos e lista de pendências, consulte este [link](https://www.notion.so/Trabalho-de-DSID-cf1018d0bbb24b3e9d4bea1d8df892ee)
