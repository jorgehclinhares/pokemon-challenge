# Pokemon Challenge | Pokedex

Este repositório foi criado para o desafio da Pokedex da SoftPlan.

## Visão Geral

O objetivo deste projeto é criar uma interface front-end moderna que simula uma pokedex, utilizando os recursos mais recentes do @angular dentre outras tecnologias.

## O desafio/objetivo

Criar uma página web para:

- Listar os Pokémons utilizando uma API RESTful para isso. Sugerimos a seguinte API: https://pokeapi.co/docs/v2
- Filtrar os pokémons que você deseja visualizar
- Favoritar pokémons
- Adicionar comentários sobre os pokémons
- Poder visualizar detalhes do pokémon selecionado em uma modal com outra rota

## Requisitos

- [x] Utilizar a última versão do framework Angular
- [x] Services
- [x] Lazy loading
- [x] Diretivas
- [x] FormControls
- [x] Utilizar o Bootstrap, versão 3 ou 4, como folha de estilo base
- [x] Aplicar conhecimento de RxJS no desenvolvimento
- [x] As informações de favoritos e comentários adicionados por um usuário devem ser salvas no estado. Utilizar o ngRx para esse controle
- [x] Deve fazer a paginação da listagem (máximo 10 itens por página)
- [x] Fazer teste unitários (com Jest) para todos ou componentes, services, entre outros

## Estrutura do Projeto

```
|-- .husky
|-- src
|   |-- app
|   |   |-- components
|   |   |-- directives
|   |   |-- mocks
|   |   |-- pages
|   |   |-- pipes
|   |   |-- services
|   |   |-- state
|   |   |-- app.routes.ts
|   |   |-- app.config.ts
|   |   |-- app.component.ts
|   |   |-- ...
|   |-- assets
|   |-- environments
|   |-- ...
|-- ...
|-- bootstrap.styles.scss
|-- setupJest.ts
|-- angular.json
|-- prettierrc
|-- tslint.json
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.spec.json
|-- README.md
```

## Tecnologias e recursos aplicados

- [x] @angular
- [x] Standalone components
- [x] Lazyload component
- [x] @ngrx/store
- [x] bootstrap
- [x] ngx-bootstrap
- [x] rxjs
- [x] husky
- [x] jest
- [x] jest-html-reporter
- [x] codelyzer
- [x] prettier
- [x] tslint
- [x] typescript
- [x] SCSS
- [x] jQuery

## Testes

- 12 suites de teste
- 43 testes
- 77.66% Statements
- 82.14% Branches
- 78% Functions
- 76.55% Lines

## Ambiente

- node.js `v20.5.0`.
- npm `9.8.0`.
- angular/cli `17.0.10`.

## Como executar o projeto

1. Instale as dependências: `npm install`.
2. Inicie o servidor de desenvolvimento: `npm start`.
3. Abra o navegador e acesse `http://localhost:4200`.

## Como executar os testes

`npm test` ou `npm run test`

## Como executar lint

`npm run lint` ou `npm run lint:fix`

## Melhorias ⌛

- [] Aumentar cobertura de teste para page/component > home.component
- [] Implementar fallbacks para requests
- [] Implementar loading e placeholders components
- [] Exibir comentário na tela de detalhamento do pokémon
- [] Revisar acessibilidade do projeto com leitor de tela
- [] Utilizar ngrx/effects
- [] Manter objeto `pokemon` em um estado global da aplicação
- [] Armazenar estado no localstorage com ngrx-store-localstorage ou outro
