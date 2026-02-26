# MERN Stack Backend - Full API Documentation

## Overview
Production-ready Node.js + Express + MongoDB backend for an online course platform with role-based access control, JWT authentication, and complete course/blog/order management.

---

## Quick Start

### 1. Setup Environment
```bash
cd server
cp .env.example .env
npm install
```

### 2. Configure `.env`
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/bin_aziz
JWT_SECRET=your-secret-key
ADMIN_EMAIL=admin@binaziz.com
ADMIN_PASSWORD=admin@12345
```

### 3. Start Backend
```bash
npm run dev    # Development with auto-reload
npm start      # Production
```

Server runs on: `http://localhost:5000`

---

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Auth**: JWT (JSON Web Tokens)
- **Security**: bcryptjs password hashing, CORS enabled
- **Env**: dotenv for configuration

---

## Database Schema

### User
- `name` (String, required)
- `email` (String, required, unique, lowercase)
- `password` (String, bcrypt hashed)
- `role` (String, enum: ["user", "admin"], default: "user")
- `timestamps` (createdAt, updatedAt)

### Course
- `title` (String, required)
- `description` (String, required)
- `price` (Number, required, min: 0)
- `image` (String, default: "")
- `createdBy` (ObjectId ref: User, required)
- `timestamps` (createdAt, updatedAt)

### Blog
- `title` (String, required)
- `content` (String, required)
- `image` (String, default: "")
- `author` (ObjectId ref: User, required)
- `timestamps` (createdAt, updatedAt)

### Order
- `user` (ObjectId ref: User, required)
- `course` (ObjectId ref: Course, required)
- `paymentStatus` (String, enum: ["pending", "paid", "failed"], default: "paid")
- `timestamps` (createdAt, updatedAt)
- **Unique Index**: user + course (prevent duplicate purchases)

---

## API Routes

### Authentication (`/api/auth`)

#### POST /api/auth/register
Register new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (201):**
```json
{
  "message": "registration successful",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### POST /api/auth/login
Login and get JWT token.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### GET /api/auth/me
Get current authenticated user profile.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-02-25T...",
    "updatedAt": "2026-02-25T..."
  }
}
```

---

### Courses (`/api/courses`)

#### GET /api/courses
Get all courses (public).

**Response (200):**
```json
{
  "courses": [
    {
      "_id": "...",
      "title": "Full-Stack Web Development",
      "description": "...",
      "price": 24999,
      "image": "",
      "createdBy": {
        "_id": "...",
        "name": "Admin",
        "email": "admin@..."
      },
      "createdAt": "2026-02-25T..."
    }
  ]
}
```

#### GET /api/courses/:id
Get specific course by ID.

**Response (200):**
```json
{
  "course": { ... }
}
```

#### POST /api/courses
Create new course (admin only).

**Headers:** `Authorization: Bearer <admin-token>`

**Request:**
```json
{
  "title": "Advanced React",
  "description": "Master React patterns and hooks",
  "price": 29999,
  "image": "https://..."
}
```

**Response (201):**
```json
{
  "course": { ... }
}
```

#### PUT /api/courses/:id
Update course (admin only).

**Headers:** `Authorization: Bearer <admin-token>`

**Request:**
```json
{
  "title": "Advanced React - Updated",
  "price": 34999
}
```

**Response (200):**
```json
{
  "course": { ... }
}
```

#### DELETE /api/courses/:id
Delete course (admin only).

**Headers:** `Authorization: Bearer <admin-token>`

**Response (200):**
```json
{
  "message": "course deleted"
}
```

---

### Blogs (`/api/blogs`)

#### GET /api/blogs
Get all blogs (public).

**Response (200):**
```json
{
  "blogs": [
    {
      "_id": "...",
      "title": "Getting Started with React",
      "content": "...",
      "image": "",
      "author": {
        "_id": "...",
        "name": "Admin",
        "email": "admin@..."
      },
      "createdAt": "2026-02-25T..."
    }
  ]
}
```

#### GET /api/blogs/:id
Get specific blog by ID.

**Response (200):**
```json
{
  "blog": { ... }
}
```

#### POST /api/blogs
Create new blog (admin only).

**Headers:** `Authorization: Bearer <admin-token>`

**Request:**
```json
{
  "title": "Building APIs with Express",
  "content": "# Introduction...",
  "image": "https://..."
}
```

**Response (201):**
```json
{
  "blog": { ... }
}
```

#### PUT /api/blogs/:id
Update blog (admin only).

**Headers:** `Authorization: Bearer <admin-token>`

**Request:**
```json
{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

**Response (200):**
```json
{
  "blog": { ... }
}
```

#### DELETE /api/blogs/:id
Delete blog (admin only).

**Headers:** `Authorization: Bearer <admin-token>`

**Response (200):**
```json
{
  "message": "blog deleted"
}
```

---

### Orders (`/api/orders`)

#### POST /api/orders
Purchase a course.

**Headers:** `Authorization: Bearer <user-token>`

**Request:**
```json
{
  "courseId": "...",
  "paymentStatus": "paid"
}
```

**Response (201):**
```json
{
  "order": {
    "_id": "...",
    "user": "...",
    "course": "...",
    "paymentStatus": "paid",
    "createdAt": "2026-02-25T..."
  }
}
```

#### GET /api/orders
Get user's orders (paginated with course details).

**Headers:** `Authorization: Bearer <user-token>`

**Response (200):**
```json
{
  "orders": [
    {
      "_id": "...",
      "user": "...",
      "course": {
        "_id": "...",
        "title": "Full-Stack Web Development",
        "description": "...",
        "price": 24999,
        "image": ""
      },
      "paymentStatus": "paid",
      "createdAt": "2026-02-25T..."
    }
  ]
}
```

#### GET /api/orders/purchased-courses
Get user's successfully purchased courses only.

**Headers:** `Authorization: Bearer <user-token>`

**Response (200):**
```json
{
  "purchasedCourses": [
    {
      "orderId": "...",
      "purchasedAt": "2026-02-25T...",
      "paymentStatus": "paid",
      "course": {
        "_id": "...",
        "title": "Full-Stack Web Development",
        "description": "...",
        "price": 24999,
        "image": ""
      }
    }
  ]
}
```

---

### Users (`/api/users`)

#### GET /api/users
Get all users (admin only).

**Headers:** `Authorization: Bearer <admin-token>`

**Response (200):**
```json
{
  "users": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2026-02-25T..."
    }
  ]
}
```

#### DELETE /api/users/:id
Delete user (admin only).

**Headers:** `Authorization: Bearer <admin-token>`

**Response (200):**
```json
{
  "message": "user deleted"
}
```

---

### Admin (`/api/admin`)

#### GET /api/admin/users
Get all users (admin only, same as /api/users).

**Headers:** `Authorization: Bearer <admin-token>`

#### DELETE /api/admin/users/:id
Delete user (admin only, same as /api/users/:id).

**Headers:** `Authorization: Bearer <admin-token>`

#### PATCH /api/admin/users/:id
Update user role (admin only).

**Headers:** `Authorization: Bearer <admin-token>`

**Request:**
```json
{
  "role": "admin"
}
```

**Response (200):**
```json
{
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin",
    "createdAt": "2026-02-25T..."
  }
}
```

---

### Health (`/api/health`)

#### GET /api/health
Server health check.

**Response (200):**
```json
{
  "ok": true,
  "service": "bin-aziz-server",
  "mongoConnected": true
}
```

#### GET /api/health/db
MongoDB connection status with ping.

**Response (200):**
```json
{
  "ok": true,
  "mongoConnected": true,
  "message": "MongoDB ping successful"
}
```

**Response (503):**
```json
{
  "ok": false,
  "mongoConnected": false,
  "message": "MongoDB ping failed"
}
```

---

## Error Handling

All errors follow consistent format:

```json
{
  "message": "Error description"
}
```

### Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid or missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate email, duplicate purchase)
- `500` - Internal Server Error

---

## Authentication Flow

1. User registers/logs in → receives JWT token
2. Token stored on client (localStorage/state)
3. Include in all protected requests: `Authorization: Bearer <token>`
4. Server validates token (JWT signature, expiration, user exists)
5. Request context includes user ID and role
6. Admin operations check role === "admin"

---

## Middleware Stack

1. **CORS**: Allow cross-origin requests
2. **Express JSON**: Parse JSON payloads (2MB limit)
3. **Morgan**: HTTP request logging (development)
4. **Auth Middleware**: `requireAuth` - JWT validation
5. **Admin Middleware**: `requireAdmin` - Role verification
6. **Async Handler**: Centralized error catching
7. **Error Handler**: Global error response formatter

---

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (auto-reload)
npm run dev

# Start production server
npm start

# Backup database to JSON
npm run backup:json

# Restore database from JSON backup
npm run restore:json -- backups/backup-<timestamp>.json
```

---

## MongoDB Setup

### Local MongoDB
Install MongoDB Community Edition, then:
```bash
mongod
# Server runs on mongodb://127.0.0.1:27017/
```

### MongoDB Atlas (Cloud)
1. Create account: https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Add IP to Network Access (or 0.0.0.0 for anywhere)
4. Create database user
5. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/`
6. Set `.env`: `MONGO_URI=<connection-string>`

---

## Security Best Practices

✅ Passwords hashed with bcryptjs (2^10 rounds)
✅ JWT tokens signed and verified
✅ CORS configured
✅ Role-based access control (RBAC)
✅ Unique indices on sensitive fields (email, user+course)
✅ Error messages don't leak sensitive info

⚠️ TODO for Production:
- Use HTTPS/SSL
- Rate limiting on auth endpoints
- Refresh token rotation
- Request body size validation
- SQL injection prevention (using MongoDB + Mongoose)
- CSRF protection for web clients
- Environmental secrets management (AWS Secrets Manager, etc.)
- API versioning
- Request validation schema (Joi, Zod)
- Audit logging
- API documentation (Swagger/OpenAPI)

---

## Project Structure

```
server/
  src/
    config/              # Config files
      db.js             # MongoDB connection
      env.js            # Environment variables
    controllers/         # Business logic
      auth.controller.js
      course.controller.js
      blog.controller.js
      order.controller.js
      user.controller.js
    middleware/
      auth.js           # JWT & role middleware
      asyncHandler.js   # Error handling wrapper
    models/
      User.js
      Course.js
      Blog.js
      Order.js
    routes/
      auth.routes.js
      course.routes.js
      blog.routes.js
      order.routes.js
      user.routes.js
      admin.routes.js
      health.routes.js
    seed/
      ensureAdmin.js    # Create default admin
      ensureSeedData.js # Seed sample courses
    utils/
      auth.js           # JWT & password helpers
    app.js              # Express app setup
    index.js            # Server bootstrap
  .env.example
  package.json
  scripts/
    backup-json.js
    restore-json.js
```

---

## Testing Endpoints (cURL / Postman)

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"Test@1234"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"Test@1234"}'
```

### Create Course (as admin)
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{"title":"React","description":"Learn React","price":4999}'
```

### Buy Course
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <user-token>" \
  -d '{"courseId":"<course-id>","paymentStatus":"paid"}'
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Check `MONGO_URI` in `.env`, ensure MongoDB is running |
| JWT token invalid | Token expired or tampered. Re-login to get new token |
| Duplicate email error | Email already registered. Use different email |
| Admin operations rejected | User role must be "admin" or use admin account |
| Duplicate course purchase | User already purchased course (unique index enforced) |
| CORS errors | CORS is enabled by default, check frontend URL |

---

## License
MIT

**Last Updated**: February 25, 2026
