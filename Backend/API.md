# 🛒 Aly Shope Fullstack Store API Documentation

Welcome to the API documentation for the **Aly Shope** e-commerce platform. This documentation provides a detailed guide on how to interact with the various endpoints available in the system.

---

## 🌍 Base URL

All API requests should be prefixed with:
`http://localhost:3000/api`

---

## 🔐 Authentication

### 1. Register User

Register a new user in the system.

- **URL:** `/auth/register`
- **Method:** `POST`
- **Auth Required:** ❌
- **Body:**
  ```json
  {
    "name": "Mohamed Ali",
    "email": "mohamed@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```
