<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<p align="center">

<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Alquipo/Desafio-Calindra-BackEnd
">

<img alt="Repository size" src="https://img.shields.io/github/repo-size/Alquipo/Desafio-Calindra-BackEnd
">

<a href="https://www.linkedin.com/in/alquiponeto/">
    <img alt="Made by Alquipo" src="https://img.shields.io/badge/made%20by-AlquipoNeto-blue">
</a>

<a href="https://github.com/Alquipo/Desafio-Calindra-BackEnd/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Alquipo/Desafio-Calindra-BackEnd
?color=blue">
</a>

<img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?color=blue">
</p>

<p align="center">

<a target="_blank" href="https://nodejs.org/">
    <img alt="ReactNative" src="https://img.shields.io/static/v1?color=brightgreen&label=Node&message=JS&?style=plastic&logo=Node.js">
  </a>

</p>
<h2 align="center">
  Desafio 05: Primeiro projeto Node.js
</h2>

## 🚀 Sobre o desafio

Nesse desafio, foi criado uma aplicação para treinar o que aprendi até agora no Node.js junto ao TypeScript, utilizando o conceito de models, repositories e services!

Essa será uma aplicação para armazenar transações financeiras de entrada e saída, que deve permitir o cadastro e a listagem dessas transações.

<p align="center">

  <img  alt="Test" title="Test" src=".github/teste.png"  />
</p>

## 🔨 Tecnologias:

- [NodeJs][nodejs]
- [Express][express]
- [uuidv4][uuidv4]

## 🚀 Como rodar este projeto

Para clonar e executar este aplicativo, você precisará de [Git](https://git-scm.com), [NodeJs][nodejs] Instalado em seu computador.

### 🌀 Clonando o repositório

```bash
# Clone este repositório
$ git clone https://github.com/Alquipo/GoStack12-desafio-05

# Acesse a pasta do projeto no terminal/cmd
$ cd GoStack12-desafio-05
```

### 🎲 Rodando a API

```bash
# Instale as dependências
$ yarn

# Execute a Aplicação
$ yarn dev:server

# Execute o teste da Aplicação
$ yarn test

# O servidor inciará na porta:3333 - acesse http://localhost:3333
```

## 🔑 Rotas da aplicação

- **`POST /transactions`**: A rota deve receber `title`, `value` e `type` dentro do corpo da requisição, sendo `type` o tipo da transação, que deve ser `income` para entradas (depósitos) e `outcome` para saídas (retiradas). Ao cadastrar uma nova transação, ela deve ser armazenada dentro de um objeto com o seguinte formato :

```json
{
  "id": "uuid",
  "title": "Salário",
  "value": 3000,
  "type": "income"
}
```

- **`GET /transactions`**: Essa rota deve retornar uma listagem com todas as transações que você cadastrou até agora, junto com o valor de soma de entradas, retiradas e total de crédito. Essa rota deve retornar um objeto com o formato a seguir:

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Salário",
      "value": 4000,
      "type": "income"
    },
    {
      "id": "uuid",
      "title": "Freela",
      "value": 2000,
      "type": "income"
    },
    {
      "id": "uuid",
      "title": "Pagamento da fatura",
      "value": 4000,
      "type": "outcome"
    },
    {
      "id": "uuid",
      "title": "Cadeira Gamer",
      "value": 1200,
      "type": "outcome"
    }
  ],
  "balance": {
    "income": 6000,
    "outcome": 5200,
    "total": 800
  }
}
```

## 🤔 Como contribuir para o projeto

- Faça um **fork** do projeto;
- Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
- Salve as alterações e crie uma mensagem de commit contando o que você fez:`git commit -m "feature: My new feature"`
- Envie as suas alterações: `git push origin my-feature`

> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://github.com/firstcontributions/first-contributions)

## 📝 Licença

Este projeto esta sobe a licença MIT. Veja a [LICENÇA][license] para saber mais.

Feito com ❤️ por Alquipo Neto 👋🏽 [Entre em contato!](https://www.linkedin.com/in/alquiponeto/)

[nodejs]: https://nodejs.org/
[express]: https://expressjs.com/
[uuidv4]: https://www.npmjs.com/package/uuidv4
[nodemon]: https://www.npmjs.com/package/nodemon
[rs]: https://rocketseat.com.br
[license]: https://opensource.org/licenses/MIT

<!-- # Teste Calindra Backend
Aplicação em nodeJS que consome a API Geocoding do Google e calcula a distância euclidiana entre dois pontos dados como endereços em linguagem natural.

### Desafio
A ideia do desafio é simples, entender como você pensa na hora de abordar os
problemas. Nas linguagens e tecnologias que se sentir mais confortável.
Criar uma API Rest que:
1) Receba dois ou mais endereços (ex: Av. Rio Branco, 1 Centro, Rio de Janeiro RJ,
20090003; Praça Mal. Âncora, 122 Centro, Rio de Janeiro RJ, 20021200; Rua 19 de
Fevereiro, 34 Botafogo, Rio de Janeiro RJ, 22280030 ) como parâmetros de entrada
2) Resolva a geolocalização entre os endereços utilizando a API do Google
https://developers.google.com/maps/documentation/geocoding/start
3) Após isso, com a latitude e longitude em mãos dos endereços, implementar o algoritmo de
cálculo de distância Euclidiana e aplicar em todas as combinações de endereços.
4) Retorne as distâncias calculadas entre os todos os endereços e indique os endereços
mais próximos e também os endereços mais distantes.

### Requisitos
Para que possamos fazer requisições existe uma chave da API de Geocoding do Google que pode ser obtida por meio de uma conta teste, você pode obter a sua usando as seguintes instruções:

>   Para obter uma chave de API: Visite o [Google Cloud Platform Console](https://console.cloud.google.com/).
    Clique no menu suspenso do projeto e selecione ou crie o projeto ao qual deseja adicionar uma chave de API.
    Clique no botão de menu e selecione APIs e serviços> Credenciais.
    Na página Credenciais, clique em Criar credenciais> Chave da API.
    O diálogo de chave de API criada exibe sua chave de API recém-criada. Clique em Fechar.
    A nova chave da API está listada na página Credenciais, em Chaves da API.


- Node instalado
- Npm instalado
- Uma chave do Google Maps

Coloque sua chave em um arquivo *.env* como o *._env.example_* contido nesse repositório.


### Rodando localmente

Clone o repositório e entre na pasta:

    $ git clone git@github.com:ana-biscalchin/calindra-test-backend.git
    $ cd calindra-test-backend/


Instale as dependências:

    $ pip3 install python-decouple googlemaps

Execute o programa:

    $ python3 app.py

### Roadmap

 - Implementar o cálculo de distância euclidiana para mais de dois endereços;
 - Implementar a tecnologia Docker para executar a aplicação com mais facilidade. -->
