تعمل ملف اسمه:

API.md

أو

API_DOCUMENTATION.md

وتكتب فيه كل الـ endpoints بشكل منظم.

مثال احترافي

# Fullstack Store API

Base URL

http://localhost:3000/api

---

# Authentication

## Register User

POST /auth/register

Body

```json
{
  "name": "Mohamed Ali",
  "email": "mohamed@example.com",
  "password": "123456",
  "confirmPassword": "123456"
}
Login

POST /auth/login

Body

{
  "email": "mohamed@example.com",
  "password": "123456"
}
Categories
Get All Categories

GET /category

Header

Authorization: Bearer TOKEN
Create Category

POST /category

Body

{
  "name": "Phones",
  "description": "Mobile phones category"
}
Products
Get All Products

GET /products

Query Params

?page=1
&limit=10
&search=iphone
Create Product

POST /products

Body

{
  "name": "iPhone 14",
  "description": "Apple iPhone 14",
  "price": 1200,
  "categoryId": "CATEGORY_ID"
}
Upload Product Image

POST /products/:productId/upload-image

Form Data

image : file

الميزة هنا:

✅ سهل القراءة
✅ بيتعرض كويس على GitHub
✅ الشركات تستخدمه

---

# 2️⃣ الطريقة الاحترافية جدًا: **Swagger**

ده يعمل **API Documentation تلقائي**.

هيعمل صفحة زي:


http://localhost:3000/api-docs


وفيها:

- كل endpoints
- تجربة request
- body
- response

زي كده:


GET /products
POST /products
PUT /products/:id
DELETE /products/:id


دي الطريقة اللي الشركات الكبيرة تستخدمها.

---

# 3️⃣ الطريقة البسيطة: **Excel أو Google Sheets**

جدول فيه:

| Method | Endpoint | Description | Auth |
|------|------|------|------|
| POST | /auth/register | Register user | ❌ |
| POST | /auth/login | Login user | ❌ |
| GET | /category | Get all categories | ✅ |
| POST | /category | Create category | Admin |
| GET | /products | Get products | ✅ |
| POST | /products | Create product | Admin |

---

# أنا أنصحك تعمل الآتي

اعمل ملفين:

### 1️⃣


API_DOCUMENTATION.md


### 2️⃣

Postman Collection

---

# نصيحة مهمة جدا لمستوى الشركات

اعمل Structure كده في المشروع:


docs/

API.md
postman_collection.json


---

# لو حابب أعمل لك حاجة أقوى 🔥

أقدر أكتب لك **API Documentation كامل لمشروعك** يشمل:

- Auth
- Categories
- Products
- Upload Image
- Pagination
- Filtering
- Search
- Error Responses

ويطلع ملف **احترافي جدًا تحطه على GitHub يخلي أي شركة تنبهر بالمشروع**.
```
