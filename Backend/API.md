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
* **URL:** `/auth/register`
* **Method:** `POST`
* **Auth Required:** ❌
* **Body:**
  ```json
  {
    "name": "Mohamed Ali",
    "email": "mohamed@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
2. Login User
Authenticate a user and receive a JWT token.

URL: /auth/login

Method: POST

Auth Required: ❌

Body:

JSON
{
  "email": "mohamed@example.com",
  "password": "password123"
}
Success Response: Returns user data and token.

3. Google OAuth Login
Login or register using a Google Account.

URL: /auth/google

Method: GET

Auth Required: ❌

Note: Redirects to Google Consent Screen. Callback URL is /auth/google/callback.

🗂️ Categories
1. Get All Categories
Retrieve all main categories along with their subcategories.

URL: /categories

Method: GET

Auth Required: ✅ (Logged In User)

2. Get Category By ID
URL: /categories/:categoryId

Method: GET

Auth Required: ✅ (Logged In User)

3. Create Category
URL: /categories

Method: POST

Auth Required: ✅ (Admin Only)

Body (Main Category):

JSON
{
  "name": "Electronics",
  "description": "All electronic devices",
  "level": "main"
}
Body (Sub Category):

JSON
{
  "name": "Smartphones",
  "description": "Mobile phones",
  "level": "sub",
  "parent": "MAIN_CATEGORY_OBJECT_ID"
}
4. Update Category
URL: /categories/:categoryId

Method: PUT

Auth Required: ✅ (Admin Only)

5. Delete Category
URL: /categories/:categoryId

Method: DELETE

Auth Required: ✅ (Admin Only)

📦 Products
1. Get All Products
Retrieve products with optional filtering, searching, and pagination.

URL: /products

Method: GET

Auth Required: ❌

Query Parameters:

page (default: 1)

limit (default: 10)

search (Search by name or description)

category (Filter by Main Category ID)

subcategory (Filter by Sub Category ID)

2. Get Product By ID
URL: /products/:productId

Method: GET

Auth Required: ❌

3. Create Product
URL: /products

Method: POST

Auth Required: ✅ (Admin Only)

Headers: Content-Type: multipart/form-data

Form Data:

name: Product Name

description: Product Description

price: 1200

categoryId: SUBCATEGORY_OBJECT_ID

image: (File upload)

4. Update Product
URL: /products/:productId

Method: PUT

Auth Required: ✅ (Admin Only)

Body: JSON object with fields to update.

5. Delete Product
URL: /products/:productId

Method: DELETE

Auth Required: ✅ (Admin Only)

6. Upload/Update Product Image
URL: /products/:id/upload-image

Method: POST

Auth Required: ✅ (Admin Only)

Headers: Content-Type: multipart/form-data

Form Data:

image: (File upload)

🛒 Cart
1. Get User Cart
URL: /cart

Method: GET

Auth Required: ✅ (Logged In User)

2. Add Product To Cart
URL: /cart

Method: POST

Auth Required: ✅ (Logged In User)

Body:

JSON
{
  "productId": "PRODUCT_OBJECT_ID",
  "quantity": 2
}
3. Remove Product From Cart
URL: /cart/:productId

Method: DELETE

Auth Required: ✅ (Logged In User)

4. Clear Cart
URL: /cart

Method: DELETE

Auth Required: ✅ (Logged In User)

🎧 Support (Customer Service)
1. Submit Support Ticket
Allows users or guests to send a message to support. An automated confirmation email is sent to the provided email address.

URL: /support

Method: POST

Auth Required: ❌

Body:

JSON
{
  "name": "Ahmed",
  "email": "ahmed@example.com",
  "subject": "Payment Issue",
  "message": "I am facing an issue while checking out."
}
🚫 Standard Error Responses
The API uses standardized error responses:

400 Bad Request / 404 Not Found / 401 Unauthorized

JSON
{
  "success": false,
  "message": "Error description message here",
  "stack": "..." // Only visible in development mode
}
