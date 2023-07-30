# Backend Challenge

I built this API with TypeScript and Prisma, it provides the essential functionalities to manage the client data and health problems. I got this challenge from: https://github.com/olisaude/teste-dev-backend

Features

```bash
Get all clients.
Get a specific client by ID.
Create a new client.
Edit an existing client.
Delete an existing client.
Sort clients by score of their health problems.
```

### Technologies!

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![VSCode](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

#### Installation

```bash
$ npm install
```

### Running the app

```bash
$npx prisma migrate dev

$npx prisma studio

# development
$ npm run serve

# tests
$ npm run test
```

## API Endpoints

| Method | Endpoint        | Responsibility       |
| ------ | --------------- | -------------------- |
| POST   | /client         | Create client        |
| GET    | /clients        | Get all clients      |
| GET    | /clients/sorted | Sort clients by risk |
| GET    | /client/:id     | Find client by id    |
| PATCH  | /client/:id     | Update client by id  |
| DELETE | /client/:id     | Delete client by id  |

### Examples

| **POST /client**  |
| ----------------- |
| **Request Body:** |

```json
{
  "name": "Client",
  "dob": "1990-06-05T00:00:00Z",
  "sex": "Male",
  "healthProblem": [
    { "name": "Problem 1", "degree": 1 },
    { "name": "Problem 2", "degree": 2 }
  ]
}
```

| **PATCH /client/:id** |
| --------------------- |
| **Request Body:**     |

```json
{
  "name": "Updated Client",
  "dob": "1990-06-05T00:00:00Z",
  "sex": "Female",
  "healthProblem": [
    {
      "name": "Problem 3",
      "degree": 3
    }
  ]
}
```

### Enviroment

```bash
PORT=3000
DATABASE_URL=
```
