
# Auth API

A simple and secure authentication API built with TypeScript, Express, JWT, Cookie-Parser, and Prisma. The API supports user registration, login, and logout functionalities, using Object-Oriented Programming (OOP) principles for better code structure and maintainability.

## Technologies

- **TypeScript**: A superset of JavaScript that provides static types.
- **Express**: A fast, unopinionated web framework for Node.js.
- **JWT (JSON Web Tokens)**: Secure authentication mechanism for stateless authentication.
- **Cookie-Parser**: Middleware for handling cookies.
- **Prisma**: ORM for database management.

## Features

- **User Registration**: Allows users to create a new account.
- **User Login**: Authenticates users and provides a JWT for secure access.
- **Logout**: Destroys the user's session by clearing the authentication cookie.

## Setup

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- TypeScript
- A Mongo database.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/auth-api.git
   cd auth-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Prisma by setting up your database connection in the `.env` file:

   ```env
   DATABASE_URL="your_database_connection_url"
   ```

4. Run Prisma migration:

   ```bash
   npx prisma migrate dev
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

The server will now be running at `http://localhost:3000`.

## Endpoints

- **POST /user/signup**: Register a new user.
- **POST /user/login**: Login a user and return a JWT.
- **POST /user/logout**: Logout a user and clear the authentication cookie.

## Usage

### Register User

```bash
POST /user/signup
Content-Type: application/json

{
  "name": "name",
  "lastname": "lastname",
  "email": "email",
  "password": "password"
}
```

### Login User

```bash
POST /user/login
Content-Type: application/json

{
  "email": "email",
  "password": "password"
}
```

### Logout User

```bash
POST /user/logout
```

## Code Structure

- **src/**: The main source code folder.
  - **controllers/**: Contains the logic for handling requests.
  - **repositories/**: Handle database request and response.
  - **services/**: Business logic and helper functions.
  - **routes/**: Express routes for handling requests.

## License

This project is licensed under the MIT License.
