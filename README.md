# NG.CASH - Desafio

<p>O app financeiro da Nova Geração! Torne-se mais independente com relação ao seu dinheiro, estando preparado(a) para enfrentar todo e qualquer desafio que venha a aparecer!</p>

***

## :computer:	 Tecnologias e Conceitos

- Node.js
- Express.js
- TypeScript
- Jest
- API REST

***

## :rocket: Endpoints

```yml
POST /sign-up
    - Rota para cadastrar um novo usuário.
    - body: {
      "username": nome de usuário,
      "password": senha de acesso
    }
```

```yml
POST /sign-in
    - Rota para logar na aplicação.
    - body: {
      "username": nome de usuário,
      "password": senha de acesso
    }
```

```yml
GET /balance
    - Rota para obter o saldo da conta do usuário.
    - headers: {
      authorization: { Bearer $TOKEN$ } -> onde $TOKEN$ é o token jwt recebido como resposta da requisição POST /sign-in.
    } 
```

```yml
POST /transactions
    - Rota para realizar uma transação.
    - headers: {
      authorization: { Bearer $TOKEN$ } -> onde $TOKEN$ é o token jwt recebido como resposta da requisição POST /sign-in.
    } 
    - body: {
      "creditedUsername": nome do usuário que receberá o valor da transação,
      "value": valor da transação como string no formato "R$ 999,99"
    }
```

```yml
GET /transactions?dateFilter={VALUE}&typeFilter={VALUE}&limit={VALUE}&offset={VALUE}
    - Rota para obter lista de todas as transações do usuário. 
      É possível filtar por data utilizando o filtro 'dateFilter' no formato "99/99/9999". 
      Também é possível filtrar por tipo de transação utilizando o filtro 'typeFilter', que pode assumir os valores de "cash-in", caso deseje-se obter as transações feitas para o usuário, e "cash-out", caso deseje-se obter as transações feitas pelo o usuário. 
      O filtro 'limit' é utilizado para limitar o número de transações a serem enviadas como resposta, 10 por padrão. O filtra 'offset' é utlizado para controle de paginação, 0 por padrão.
    - headers: {
      authorization: { Bearer $TOKEN$ } -> onde $TOKEN$ é o token jwt recebido como resposta da requisição POST /sign-in.
    } 
    - query: {
      "limit": número de produtos que deseja receber na request,
      "offset": offset de paginação dos produtos
    }
```

***

## 🏁 Rodando a aplicação

Primeiramente, clone este repositório para sua máquina local.

```
git clone https://github.com/GuilhermeCRB/MBLabs_Challenge.git
```

### Ambiente de Produção

Para iniciar o servidor, rode o seguinte comando no terminal para instalar as dependências:

```
npm install
```

Em seguida, gere o modelo do banco de dados com o Prisma

```
npm run prod:migrate
```

Depois, faça o build do código TypeScript

```
npm run build
```

Por fim, basta iniciar o sevidor

```
npm start
```

Alternativamente, é possível subir a aplicação utilizando Docker. Para tanto, rode o comando abaixo na raiz do projeto

```
docker-compose up -d
```

Lembre-se de criar na raiz da aplicação o arquivo .env conforme o .env.example

### Ambiente de Desenvolvimento

Para iniciar o servidor, rode o seguinte comando no terminal para instalar as dependências:

```
npm install
```

Em seguida, gere o modelo do banco de dados com o Prisma

```
npm run dev:migrate
```

Por fim, basta iniciar o sevidor

```
npm run dev
```

Você pode acompanhar o banco de dados utilizando a interface Studio do Prisma. Para isso, rode o script

```
npm run dev:studio
```
