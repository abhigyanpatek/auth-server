# [Authentication Microservice](https://auth-server-5dh4.onrender.com) 🔐
A standalone authentication service providing secure token management with access and refresh token handling. Built for seamless integration with e-commerce and other applications requiring robust user authentication.

## 🌟 Features

### Token Management
- JWT-based access tokens with configurable expiry
- Secure refresh token generation and validation
- Token blacklisting for revoked sessions
- Automatic token refresh mechanism

### Security
- Cryptographically secure token generation
- Database-backed refresh token storage
- Token validation and verification
- Protection against token reuse

### API Integration
- RESTful endpoints for token operations
- Easy integration with client applications
- Scalable microservice architecture

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL/MySQL (configurable)
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)

## 🏗 Architecture

The service is designed as a standalone authentication component:

- **Token Management**: Handles access and refresh token lifecycle
- **Database Integration**: Secure storage of refresh tokens
- **API Layer**: RESTful endpoints for token operations

## 🚀 Getting Started

### Prerequisites
- Node.js [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
- PostgreSQL/MySQL database [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/) [![MySQL](https://img.shields.io/badge/MySQL-005C84?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)
- npm [![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=flat&logo=npm&logoColor=white)](https://www.npmjs.com/) or yarn [![Yarn](https://img.shields.io/badge/Yarn-%232C8EBB.svg?style=flat&logo=yarn&logoColor=white)](https://yarnpkg.com/)

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/abhigyanpatek/auth-server.git
cd auth-server
```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables in a .env file:
```bash
   DB_URI=<database-host>  # Database connection URI
   DB_USER=<database-user> # Database user
   DB_PASSWORD=<database-password> # Set to empty string if no password
   DB_NAME=<database-name> # Database name
   DB_DIALECT=postgres # Set to mysql if using MySQL
   DB_SSL=true # Set to false if not using SSL
   HOST=localhost # Server host
   PORT=3001 # Server port
   ACCESS_TOKEN_SECRET=your_jwt_secret # Access token secret key
```

4. Start the server:
```bash
npm start
```

## 📚 API Documentation

### Token Management APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/getUserToken` | Generate access & refresh tokens |
| POST | `/auth/refresh` | Refresh access token |
| GET | `/auth/validate` | Validate access token |
| GET | `/auth/deleteUserToken` | Revoke tokens |

## 🔒 Security Features

- Cryptographic token generation 
- Token expiration management
- Refresh token rotation
- Token blacklisting
- Database-backed token storage

## 📧 Contact  
For questions, email [abhigyanpatek@email.com](mailto:abhigyanpatek@email.com) or open an issue.

---
Made with ❤️ by Abhigyan Patek