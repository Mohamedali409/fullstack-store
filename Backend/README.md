# 🛒 Fullstack Store API

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-Framework-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

A scalable **RESTful API** for an online store built with **Node.js, Express, and MongoDB**.

This backend provides secure authentication, product management, category management, image uploads, filtering, search, and pagination.

The project follows **clean backend architecture** with proper error handling, middleware structure, and scalable module organization.

---

# 🚀 Features

### 🔐 Authentication & Authorization

- User Registration
- User Login
- JWT Authentication
- Role-based Access Control (Admin / User)

### 📦 Product Management

- Create Product
- Update Product
- Delete Product
- Get Product by ID
- Get All Products
- Upload Product Image

### 🗂 Category Management

- Create Category
- Update Category
- Delete Category
- Get Category by ID
- Get All Categories

### 🔎 Advanced API Features

- Pagination
- Search
- Filtering

### 🛡 Security

- JWT Authentication
- Protected Routes
- Role-based Authorization
- Global Error Handler
- Validation Middleware

---

# 🧰 Tech Stack

| Technology | Usage               |
| ---------- | ------------------- |
| Node.js    | Runtime Environment |
| Express.js | Web Framework       |
| MongoDB    | Database            |
| Mongoose   | ODM                 |
| JWT        | Authentication      |
| Multer     | Image Upload        |
| Joi        | Request Validation  |
| Postman    | API Testing         |

---

# 🏗 Architecture

The project follows a **modular backend architecture**.

```text
Client (Frontend)
        │
        ▼
   Express Routes
        │
        ▼
   Controllers
        │
        ▼
   Services / Business Logic
        │
        ▼
      Models
        │
        ▼
     MongoDB
```

---

# 📁 Project Structure

```text
src
│
├── modules
│   ├── auth
│   │   ├── auth.controller.js
│   │   ├── auth.routes.js
│   │   └── auth.service.js
│   │
│   ├── categories
│   │   ├── category.controller.js
│   │   ├── category.routes.js
│   │   └── category.model.js
│   │
│   └── products
│       ├── product.controller.js
│       ├── product.routes.js
│       └── product.model.js
│
├── middlewares
│   ├── auth.middleware.js
│   ├── role.middleware.js
│   ├── error.middleware.js
│   └── logger.middleware.js
│
├── utils
│   ├── AppError.js
│   └── asyncHandler.js
│
├── config
│   └── database.js
│
└── app.js
```

---

# ⚙️ Installation

Clone the repository

```
git clone https://github.com/your-username/fullstack-store.git
```

Navigate to the project folder

```
cd fullstack-store
```

Install dependencies

```
npm install
```

Create `.env` file

```
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
```

Start the server

```
npm run dev
```

Server will run at

```
http://localhost:3000
```

---

# 📡 API Base URL

```
http://localhost:3000/api
```

---

# 🔑 Authentication

Protected routes require a JWT token.

Example header:

```
Authorization: Bearer YOUR_TOKEN
```

---

# 📚 API Endpoints

## Auth

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | /auth/register | Register new user |
| POST   | /auth/login    | Login user        |

---

## Categories

| Method | Endpoint      | Description             |
| ------ | ------------- | ----------------------- |
| GET    | /category     | Get all categories      |
| GET    | /category/:id | Get category by ID      |
| POST   | /category     | Create category (Admin) |
| PUT    | /category/:id | Update category (Admin) |
| DELETE | /category/:id | Delete category (Admin) |

---

## Products

| Method | Endpoint                   | Description          |
| ------ | -------------------------- | -------------------- |
| GET    | /products                  | Get all products     |
| GET    | /products/:id              | Get product by ID    |
| POST   | /products                  | Create product       |
| PUT    | /products/:id              | Update product       |
| DELETE | /products/:id              | Delete product       |
| POST   | /products/:id/upload-image | Upload product image |

---

# 📊 Query Parameters

Example request

```
/products?page=1&limit=10&search=iphone
```

| Parameter | Description              |
| --------- | ------------------------ |
| page      | Page number              |
| limit     | Number of items per page |
| search    | Search by product name   |

---

# 🧪 Testing

The API can be tested using **Postman**.

A Postman Collection is included in the repository.

---

# 🚧 Future Improvements

- Add **Order System**
- Add **Shopping Cart**
- Add **Payment Integration**
- Add **Product Reviews**
- Add **Admin Dashboard**

---

# 👨‍💻 Author

**Mohamed Ali**

Backend Developer
Node.js | Express | MongoDB | REST APIs

📧 Email
[engmohamedali409@gmail.com](mailto:engmohamedali409@gmail.com)

---

# ⭐ Support

If you like this project, consider giving it a **star ⭐ on GitHub**.
