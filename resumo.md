# Trabalho de DSID

## Membros:

- Jow

    > *Outro rapaz humilde, mestre do futebol e basquete e manja dos sistemas distribuídos*

- Kaiquinho

    > *Disposto a sempre aprender mais, seu unico erro foi amar de mais o povo brasileiro*

- Matheus

    > *Humildade pura, trabalhou com Angular e Node, e é monstro no fut*

- Giovanni

    > *Rapaz prodígio, sabe programar em React e Django mas está disposto a aprender novas tecnologias*

## Stacks tecnológicas:

- Angular
    - [Typescript](https://www.typescriptlang.org/)
    - Html
    - [SCSS](https://sass-lang.com/documentation/syntax)
- Node
    - Typescript
    - [Knex](http://knexjs.org/)
    - [Sqlite3](https://www.sqlite.org/docs.html) para *Desenvolvimento*
    - [Postgres](https://www.postgresql.org/) para *Produção*

### Requisitos funcionais:

- [ ]  O usuário precisa ser capaz de realizar o logon com seu e-mail e senha
    - [ ]  O usuário precisa ser capaz de visualizar seu perfil
    - [ ]  O usuário precisa ser capaz de alterar informações do perfil
        - [ ]  O usuário deve conseguir alterar seu Nome
    - [ ]  O usuário precisa ser capaz de visualizar seus voos pendentes e cancelados
    - [ ]  O usuário precisa ser capaz de adquirir novas passagens com o crédito que possui em conta
    - [ ]  O usuário precisa ser capaz de cancelar um voo e ter o crédito da compra recuperado
    - [ ]  O usuário precisa ser capaz de adquirir mais créditos (dinheiro fake)

### Requisitos não-funcionais:

- [ ]  A API precisa cumprir os critérios de autenticação para chamadas aos endpoints

### Passos a se desenvolver:

- **Backend**

    **primeira parte: Fazer o que está pronto no Spring (com alguns incrementos)**

    - Endpoints
        - **/usuários**
            - [ ]  GET /usuarios
                - admin
            - [ ]  POST /usuarios
                - admin
            - [ ]  GET /usuarios/:id
                - admin e usuario do id = :id
            - [ ]  DELETE /usuarios/:id
                - admin
            - [ ]  PUT /usuarios/:id
                - admin e usuario do id = :id (Para algumas informações)
            - Ordens de voos do usuário
                - [ ]  GET /usuarios/:id/voos
                    - admin e usuario id = :id
                - [ ]  POST /usuarios/:id/voos
                    - admin e usuario id = :id (mediante a creditação da conta)
                - [ ]  DELETE /usuarios/:id/voos
                    - admin
                - [ ]  PUT /usuarios/:id/voos
                    - admin e usuario id = :id (usuario pode somente cancelar a passagem)
        - **/aeroportos**
            - [ ]  GET /aeroportos
                - admin, usuario, no-auth
            - [ ]  POST /aeroportos
                - admin
            - [ ]  GET /aeroportos/:id
                - admin, usuario, no-auth
            - [ ]  DELETE /aeroportos/:id
                - admin
        - **/login**
            - [ ]  POST /Login
                - retorna um Bearer com a autorização (se bem sucedido, claro)

    - Models
        - [ ]  Usuario

            ```tsx
            {
            	id: number,
            	username: string,
            	email: string,
            	password: string,
            	voos: Voo[],
            	creditos: number,
            	roles: [admin, usuario]
            }
            ```

        - [ ]  Voo

            ```tsx
            {
            	id: number,
            	destino: Aeroporto,
            	partida: Aeroporto,
            	usuarios: Usuario[],
            	data_hora_de_ida_partida: Date,
            	data_hora_de_chegada_partida: Date,
            	data_hora_de_ida_volta: Date,
            	data_hora_de_chegada_volta: Date
            }
            ```

        - [ ]  Aeroportos - implementação de cidades e UF baseada na [API do IBGE de cidades e estados](https://servicodados.ibge.gov.br/api/docs/localidades?versao=1)

            ```tsx
            {
            	id: number,
            	codigo_cidade: number,
            	nome_cidade: string,
            	codigo_uf: number,
            	nome_uf: string,
            	nome: string,
            }
            ```

- FrontEnd

    //ToDefine