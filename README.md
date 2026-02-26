# BinAzizTech - MERN Stack Platform

A production-ready **MERN Stack** (MongoDB, Express, React, Node.js) application for an **online course platform** with user authentication, role-based access control, course/blog management, and order processing.

## 🚀 Features

✅ **User Authentication**
- Register & login with email/password
- bcryptjs password hashing
- JWT token-based sessions
- Role-based access control (user, admin)

✅ **Course Management**
- View all published courses
- Admin-only: Create, update, delete courses
- Course details with pricing

✅ **Blog System**
- Public blog listing
- Admin-only: Create, update, delete posts
- Blog author tracking

✅ **Course Purchase**
- Authenticated users can buy courses
- Duplicate purchase prevention
- Order history tracking
- Purchase status management

✅ **Admin Dashboard**
- View all registered users
- Manage user roles
- Delete users
- Monitor course/blog/order activity

✅ **Database**
- MongoDB with Mongoose ODM
- Automatic indexed unique constraints
- Proper data validation

✅ **Security**
- CORS enabled
- JWT validation on protected routes
- Admin role verification
- bcryptjs password hashing (10 rounds)

---

## 📁 Project Structure

```
.
├── my-website/              # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── main.tsx
│   └── package.json
│
├── server/                  # Express.js Backend (MERN)
│   ├── src/
│   │   ├── config/          # Database & Environment
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   ├── controllers/     # Business Logic
│   │   │   ├── auth.controller.js
│   │   │   ├── course.controller.js
│   │   │   ├── blog.controller.js
│   │   │   ├── order.controller.js
│   │   │   └── user.controller.js
│   │   ├── middleware/      # Auth & Error Handling
│   │   │   ├── auth.js      # JWT & role validation
│   │   │   └── asyncHandler.js
│   │   ├── models/          # Data Schemas
│   │   │   ├── User.js
│   │   │   ├── Course.js
│   │   │   ├── Blog.js
│   │   │   └── Order.js
│   │   ├── routes/          # API Endpoints
│   │   │   ├── auth.routes.js
│   │   │   ├── course.routes.js
│   │   │   ├── blog.routes.js
│   │   │   ├── order.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── admin.routes.js
│   │   │   └── health.routes.js
│   │   ├── seed/            # Data Seeding
│   │   │   ├── ensureAdmin.js
│   │   │   └── ensureSeedData.js
│   │   ├── utils/
│   │   │   └── auth.js      # JWT & password helpers
│   │   ├── app.js           # Express app setup
│   │   └── index.js         # Server bootstrap
│   ├── scripts/
│   │   ├── backup-json.js
│   │   └── restore-json.js
│   ├── .env.example         # Environment template
│   ├── BACKEND_API.md       # Full API documentation
│   └── package.json
│
├── README.md                # This file
└── package.json             # Root monorepo config
```

---

## 🏃 Quick Start

### 1. Backend Setup (`server`)

```bash
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure MONGO_URI and JWT_SECRET in .env
# Default: MongoDB local at mongodb://127.0.0.1:27017/bin_aziz

# Start development server (auto-reload)
npm run dev

# Or production
npm start
```

✅ Backend runs on: **http://localhost:5000**

### 2. Frontend Setup (`my-website`)

```bash
cd my-website

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend runs on: **http://localhost:5173**

---

## 🔐 Default Admin Account

An admin user is automatically created on first startup:
- **Email**: `admin@binaziz.com`
- **Password**: `Admin@12345`
- **Modifiable via**: `.env` variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`)

---

## 📚 API Documentation

### Auth Endpoints
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login & get JWT token
- `GET /api/auth/me` - Get current user profile (requires auth)

### Course Endpoints
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (admin only)
- `PUT /api/courses/:id` - Update course (admin only)
- `DELETE /api/courses/:id` - Delete course (admin only)

### Blog Endpoints
- `GET /api/blogs` - List all blogs
- `GET /api/blogs/:id` - Get blog details
- `POST /api/blogs` - Create blog (admin only)
- `PUT /api/blogs/:id` - Update blog (admin only)
- `DELETE /api/blogs/:id` - Delete blog (admin only)

### Order Endpoints
- `POST /api/orders` - Purchase a course (requires auth)
- `GET /api/orders` - Get user's orders (requires auth)
- `GET /api/orders/purchased-courses` - Get paid courses only (requires auth)

### User Management (Admin Only)
- `GET /api/users` - List all users
- `DELETE /api/users/:id` - Delete user

### Admin Endpoints (Admin Only)
- `GET /api/admin/users` - List all users
- `DELETE /api/admin/users/:id` - Delete user
- `PATCH /api/admin/users/:id` - Update user role

### Health Check
- `GET /api/health` - Server & MongoDB status
- `GET /api/health/db` - MongoDB connectivity ping

**Full API Documentation**: See [server/BACKEND_API.md](server/BACKEND_API.md)

---

## 🗄️ Database Setup

### Option 1: Local MongoDB (Recommended for Development)

1. **Install MongoDB Community Edition**
   - Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
   - macOS: `brew tap mongodb/brew && brew install mongodb-community`
   - Linux: https://docs.mongodb.com/manual/installation/

2. **Start MongoDB**
   ```bash
   # Windows
   mongod

   # macOS/Linux
   brew services start mongodb-community
   ```

3. **Set `.env`**
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/bin_aziz
   ```

### Option 2: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create Account**: https://www.mongodb.com/cloud/atlas
2. **Create Cluster** (free tier available)
3. **Set Network Access** to allow your IP (or 0.0.0.0 for development)
4. **Get Connection String**: `mongodb+srv://user:password@cluster.mongodb.net/bin_aziz`
5. **Set `.env`**
   ```env
   MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/bin_aziz?retryWrites=true&w=majority
   ```

### Verify Connection
```bash
curl http://localhost:5000/api/health/db
```

Expected response:
```json
{
  "ok": true,
  "mongoConnected": true,
  "message": "MongoDB ping successful"
}
```

---

## 📋 Environment Variables

Create a `server/.env` file with:

```env
# Server
PORT=5000

# MongoDB
MONGO_URI=mongodb://127.0.0.1:27017/bin_aziz

# JWT Configuration
JWT_SECRET=your-secret-key-generate-a-strong-random-string
JWT_EXPIRES_IN=7d

# Default Admin (created on startup)
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@binaziz.com
ADMIN_PASSWORD=Admin@12345
```

---

## 🛠️ Development Commands

### Backend
```bash
cd server

npm run dev           # Start with auto-reload
npm start             # Start production
npm run backup:json   # Backup database to JSON
npm run restore:json  # Restore from backup
```

### Frontend
```bash
cd my-website

npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build
```

---

## 🧪 Testing with cURL / Postman

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "password":"SecurePass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "password":"SecurePass123"
  }'
# Returns JWT token
```

### Create Course (Admin)
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "title":"React Masterclass",
    "description":"Learn React from scratch",
    "price":4999,
    "image":"https://example.com/image.jpg"
  }'
```

### Purchase Course
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <user-token>" \
  -d '{
    "courseId":"<course-id>",
    "paymentStatus":"paid"
  }'
```

### Get User's Purchased Courses
```bash
curl -X GET http://localhost:5000/api/orders/purchased-courses \
  -H "Authorization: Bearer <user-token>"
```

---

## 🔒 Security Features

✅ **Password Security**
- bcryptjs hashing (10 rounds)
- Password never stored in plain text

✅ **Token Security**
- JWT signed and verified
- Token expiration (default: 7 days)
- User validation on each request

✅ **Access Control**
- Admin-only endpoints verified on every request
- Role stored in token and re-verified in DB
- User can't access other users' data

✅ **Data Validation**
- Input validation on all endpoints
- Unique indices on email and user+course
- Mongoose schema validation

✅ **CORS**
- Enabled by default
- Configurable origins

---

## 📦 Tech Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| **Runtime** | Node.js | 18+ |
| **Backend Framework** | Express.js | ^4.21 |
| **Database** | MongoDB | 4.0+ |
| **ODM** | Mongoose | ^8.11 |
| **Authentication** | JWT | jsonwebtoken ^9.0 |
| **Hashing** | bcryptjs | ^2.4 |
| **Frontend** | React | 18+ |
| **Build Tool** | Vite | ^5.0 |
| **Environment** | dotenv | ^16.4 |

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `Error: listen EADDRINUSE` | Port 5000 already in use. Kill process: `lsof -ti:5000 \| xargs kill -9` |
| `MongoNetworkError` | MongoDB not running. Start with `mongod` |
| `Unauthorized` (401) | JWT token missing or invalid. Re-login to get new token |
| `Admin access required` (403) | User is not admin. Use admin account or grant admin role |
| `course already purchased` (409) | User already bought this course. Duplicate purchases blocked |
| `Email already registered` (409) | Email is taken. Use different email |

---

## 📊 Database Models

### User
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  role: "user" | "admin" (default: "user"),
  createdAt: Date,
  updatedAt: Date
}
```

### Course
```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required),
  image: String (default: ""),
  createdBy: ObjectId -> User (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Blog
```javascript
{
  title: String (required),
  content: String (required),
  image: String (default: ""),
  author: ObjectId -> User (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  user: ObjectId -> User (required),
  course: ObjectId -> Course (required),
  paymentStatus: "pending" | "paid" | "failed" (default: "paid"),
  createdAt: Date,
  updatedAt: Date
}
// Unique index: (user, course) - prevents duplicate purchases
```

---

## 🚢 Production Deployment

### Environment Checklist

- [ ] Set strong `JWT_SECRET` (generate: `openssl rand -base64 32`)
- [ ] Use MongoDB Atlas (not local MongoDB)
- [ ] Enable HTTPS/SSL certificates
- [ ] Set proper CORS origins (not allow all)
- [ ] Enable rate limiting on auth endpoints
- [ ] Setup proper logging & monitoring
- [ ] Add database backups
- [ ] Implement refresh token rotation
- [ ] Add request validation schema (Joi/Zod)
- [ ] Setup CI/CD pipeline

### Deployment Platforms

- **Backend**: Heroku, Railway, Render, AWS EC2
- **Database**: MongoDB Atlas, AWS RDS
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront

---

## 📝 License

MIT

---

## 👤 Support

For issues and questions, please raise an issue in the repository.

**Last Updated**: February 25, 2026
