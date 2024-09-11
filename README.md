# Simples Carrinho de Compras

Este projeto é uma API simples construída com Node.js e Express que permite adicionar, remover, exibir e limpar produtos em um carrinho de compras e em uma lista de favoritos (whitelist). Os dados são armazenados localmente em arquivos JSON.

## Estrutura do Projeto

- `src/index.js`: Ponto de entrada da aplicação. Configura o servidor Express e define as rotas.
- `src/route.js`: Define as rotas da API para o carrinho de compras e whitelist.
- `src/service/cart.js`: Contém a lógica para manipular o carrinho de compras.
- `src/service/whitelist.js`: Contém a lógica para manipular a whitelist.
- `src/db/db.js`: Contém funções para buscar e atualizar dados do carrinho, whitelist e produtos.

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/IgorCoutoOli/simple-api-cart.git
   cd simple-api-cart
    ```
2. Instale as dependências
    ```
    npm install
    ```
3. Inice o servidor
    ```
    npm start
    ```
- O servidor será iniciado na porta 4001.

## Rotas da API

#### Carrinho de Compras

- Adicionar Produto ao Carrinho
    ```http
    POST /cart-add/:id/:qtd
    ```
    Adiciona a quantidade especificada de um produto ao carrinho.

- Remover/Alterar Produto no Carrinho
    ```http
    PATCH /cart-update/:id/:qtd
    ```
    Remove ou altera a quantidade de um produto no carrinho. Se qtd for 0, o produto será removido.

- Exibir Carrinho
    ```http
    GET /cart-show
    ```
    Exibe todos os produtos no carrinho e o total acumulado.

- Limpar Carrinho
    ```http
    DELETE /cart-clean
    ```
    Remove todos os produtos do carrinho.

#### Lista de Desejo

- Adicionar Produto à Whitelist
    ```http
    POST /whitelist-add/:id
    ```
    Adiciona um produto à whitelist.

- Remover Produto da Whitelist
    ```http
    DELETE /whitelist-del/:id
    ```
    Remove um produto da whitelist.

- Exibir Whitelist
    ```http
    GET /whitelist-show
    ```
    Exibe todos os produtos na whitelist.

## Estrutura de Dados

- cart.json: Armazena o carrinho de compras, incluindo produtos e total acumulado.
- whitelist.json: Armazena os IDs dos produtos na whitelist.
- products.json: Contém detalhes sobre todos os produtos disponíveis, como nome e preço.

#### Exemplo de cart.json

```json
{
  "products": [
    { "id": "1", "qtd": 2 },
    { "id": "10", "qtd": 1 }
  ],
  "total": 300.00
}
```

#### Exemplo de whitelist.json

```json
{
  "products": ["1", "10", "3"]
}
```

## Conclusão
Este projeto é uma prática de programação que envolve a criação de um carrinho de compras utilizando Node.js e Express. Ele introduz conceitos básicos de manipulação de dados e rotas em uma API RESTful. Este desafio faz parte de um curso na DIO, administrado pelo Professor Felipe Bittencourt, focado em aprimorar as habilidades dos alunos em desenvolvimento backend.