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

### 2. Login User

Authenticate a user and receive a JWT token.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Auth Required:** ❌
- **Body:**
  ```json
  {
    "email": "mohamed@example.com",
    "password": "password123"
  }
  ```
- **Success Response:** Returns user data and `token`.

### 3. Google OAuth Login

Login or register using a Google Account.

- **URL:** `/auth/google`
- **Method:** `GET`
- **Auth Required:** ❌
- **Note:** Redirects to Google Consent Screen. Callback URL is `/auth/google/callback`.

---

## 🗂️ Categories

### 1. Get All Categories

Retrieve all main categories along with their subcategories.

- **URL:** `/categories`
- **Method:** `GET`
- **Auth Required:** ✅ (Logged In User)

### 2. Get Category By ID

Retrieve a specific category by ID.

- **URL:** `/categories/:categoryId`
- **Method:** `GET`
- **Auth Required:** ✅ (Logged In User)

### 3. Create Category

Create a new category.

- **URL:** `/categories`
- **Method:** `POST`
- **Auth Required:** ✅ (Admin Only)
- **Body (Main Category):**
  ```json
  {
    "name": "Electronics",
    "description": "All electronic devices",
    "level": "main"
  }
  ```
- **Body (Sub Category):**
  ```json
  {
    "name": "Smartphones",
    "description": "Mobile phones",
    "level": "sub",
    "parent": "MAIN_CATEGORY_OBJECT_ID"
  }
  ```

### 4. Update Category

Update an existing category.

- **URL:** `/categories/:categoryId`
- **Method:** `PUT`
- **Auth Required:** ✅ (Admin Only)

### 5. Delete Category

Delete a category.

- **URL:** `/categories/:categoryId`
- **Method:** `DELETE`
- **Auth Required:** ✅ (Admin Only)

---

## 📦 Products

### 1. Get All Products

Retrieve products with optional filtering, searching, and pagination.

- **URL:** `/products`
- **Method:** `GET`
- **Auth Required:** ❌
- **Query Parameters:**
  - `page` (default: 1)
  - `limit` (default: 10)
  - `search` (Search by name or description)
  - `category` (Filter by Main Category ID)
  - `subcategory` (Filter by Sub Category ID)

### 2. Get Product By ID

Retrieve a specific product.

- **URL:** `/products/:productId`
- **Method:** `GET`
- **Auth Required:** ❌

### 3. Create Product

Add a new product to the store.

- **URL:** `/products`
- **Method:** `POST`
- **Auth Required:** ✅ (Admin Only)
- **Headers:** `Content-Type: multipart/form-data`
- **Form Data:**
  - `name`: Product Name
  - `description`: Product Description
  - `price`: 1200
  - `categoryId`: SUBCATEGORY_OBJECT_ID
  - `image`: (File upload)

### 4. Update Product

Update an existing product.

- **URL:** `/products/:productId`
- **Method:** `PUT`
- **Auth Required:** ✅ (Admin Only)
- **Body:** JSON object with fields to update.

### 5. Delete Product

Remove a product.

- **URL:** `/products/:productId`
- **Method:** `DELETE`
- **Auth Required:** ✅ (Admin Only)

### 6. Upload/Update Product Image

Upload an image for a product.

- **URL:** `/products/:id/upload-image`
- **Method:** `POST`
- **Auth Required:** ✅ (Admin Only)
- **Headers:** `Content-Type: multipart/form-data`
- **Form Data:**
  - `image`: (File upload)

---

## 🛒 Cart

### 1. Get User Cart

Retrieve the current user's cart.

- **URL:** `/cart`
- **Method:** `GET`
- **Auth Required:** ✅ (Logged In User)

### 2. Add Product To Cart

Add an item to the cart.

- **URL:** `/cart`
- **Method:** `POST`
- **Auth Required:** ✅ (Logged In User)
- **Body:**
  ```json
  {
    "productId": "PRODUCT_OBJECT_ID",
    "quantity": 2
  }
  ```

### 3. Remove Product From Cart

Remove a specific item from the cart.

- **URL:** `/cart/:productId`
- **Method:** `DELETE`
- **Auth Required:** ✅ (Logged In User)

### 4. Clear Cart

Empty the entire cart.

- **URL:** `/cart`
- **Method:** `DELETE`
- **Auth Required:** ✅ (Logged In User)

---

## 🎧 Support (Customer Service)

### 1. Submit Support Ticket

Allows users or guests to send a message to support. An automated confirmation email is sent to the provided email address.

- **URL:** `/support`
- **Method:** `POST`
- **Auth Required:** ❌
- **Body:**
  ```json
  {
    "name": "Ahmed",
    "email": "ahmed@example.com",
    "subject": "Payment Issue",
    "message": "I am facing an issue while checking out."
  }
  ```

---

## 🚫 Standard Error Responses

The API uses standardized error responses:

**400 Bad Request / 401 Unauthorized / 404 Not Found / 500 Server Error**

```json
{
  "success": false,
  "message": "Error description message here"
}
```
