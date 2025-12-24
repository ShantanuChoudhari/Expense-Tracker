# <div align="center">💰 Expense Tracker Backend API</div>

<div align="center">

A robust and scalable RESTful API built with Node.js, Express.js, and MongoDB for managing personal finances. This backend service powers the Expense Tracker application, providing comprehensive user authentication, expense tracking, income management, and financial analytics.

</div>

<div align="justify">

## 🚀 Features

### 🔐 Authentication & Security

- **JWT-based Authentication**: Secure token-based authentication system
- **Password Hashing**: bcrypt integration for secure password storage
- **Protected Routes**: Middleware-based route protection
- **User Registration & Login**: Complete user management system
- **Account Management**: User profile updates and account deletion

### 💸 Expense Management

- **Create Expenses**: Add new expense entries with categories and icons
- **Update/Delete Expenses**: Full CRUD operations for expense management
- **Expense Categories**: Organize expenses by custom categories
- **Date-based Filtering**: Filter expenses by date ranges
- **Expense Analytics**: Calculate totals and generate insights

### 💰 Income Tracking

- **Income Sources**: Track income from multiple sources
- **Income Management**: Complete CRUD operations for income entries
- **Income Analytics**: Monthly and yearly income calculations
- **Source Categorization**: Organize income by different sources

### 📊 Dashboard & Analytics

- **Financial Overview**: Comprehensive financial summaries
- **Recent Transactions**: Latest income and expense entries
- **Monthly Analytics**: Month-over-month financial analysis
- **Data Visualization Support**: API endpoints for chart data

### 📁 File Management

- **Image Upload**: Profile picture upload functionality
- **Multer Integration**: Secure file handling middleware
- **Static File Serving**: Serve uploaded images efficiently

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose ODM 8.17.0
- **Authentication**: JSON Web Tokens (jsonwebtoken 9.0.2)
- **Password Security**: bcryptjs 3.0.2
- **File Upload**: Multer 2.0.2
- **CORS**: cors 2.8.5
- **Environment Variables**: dotenv 17.2.1
- **Excel Export**: xlsx 0.18.5
- **Development**: nodemon 3.1.10

## 📁 Project Structure

```
BackEnd/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── dashboardController.js # Dashboard data aggregation
│   ├── expenseController.js  # Expense CRUD operations
│   └── incomeController.js   # Income CRUD operations
├── middleware/
│   ├── authMiddleware.js     # JWT authentication middleware
│   └── uploadMiddleware.js   # File upload middleware
├── models/
│   ├── User.js              # User schema and methods
│   ├── Expense.js           # Expense data model
│   └── Income.js            # Income data model
├── routes/
│   ├── authRoutes.js        # Authentication endpoints
│   ├── dashboardRoutes.js   # Dashboard data endpoints
│   ├── expenseRoutes.js     # Expense management endpoints
│   └── incomeRoutes.js      # Income management endpoints
├── uploads/                 # File upload directory
├── server.js               # Main application entry point
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## ⚡ Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/NhanPhamThanh-IT/Fullstack-MERN-Expense-Tracker.git
   cd Fullstack-MERN-Expense-Tracker/BackEnd
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   # Database Configuration
   MONGO_URI=mongodb://localhost:27017/expense-tracker
   # or for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Client Configuration (for CORS)
   CLIENT_URL=http://localhost:3000
   ```

4. **Start the server**

   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000` (or your specified PORT).

## 🔗 API Endpoints

### 🔐 Authentication Routes (`/api/v1/auth`)

| Method | Endpoint         | Description          | Auth Required |
| ------ | ---------------- | -------------------- | ------------- |
| POST   | `/register`      | Register new user    | ❌            |
| POST   | `/login`         | User login           | ❌            |
| GET    | `/getUser`       | Get user profile     | ✅            |
| POST   | `/upload-image`  | Upload profile image | ❌            |
| DELETE | `/deleteAccount` | Delete user account  | ✅            |

#### Register User

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "profileImageUrl": "optional-image-url"
}
```

#### Login User

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### 💸 Expense Routes (`/api/v1/expense`)

| Method | Endpoint     | Description           | Auth Required |
| ------ | ------------ | --------------------- | ------------- |
| GET    | `/`          | Get all user expenses | ✅            |
| POST   | `/`          | Create new expense    | ✅            |
| PUT    | `/:id`       | Update expense        | ✅            |
| DELETE | `/:id`       | Delete expense        | ✅            |
| GET    | `/analytics` | Get expense analytics | ✅            |

#### Create Expense

```http
POST /api/v1/expense
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "category": "Food",
  "amount": 25.50,
  "icon": "🍕",
  "date": "2025-08-05T10:00:00Z"
}
```

### 💰 Income Routes (`/api/v1/income`)

| Method | Endpoint     | Description          | Auth Required |
| ------ | ------------ | -------------------- | ------------- |
| GET    | `/`          | Get all user income  | ✅            |
| POST   | `/`          | Create new income    | ✅            |
| PUT    | `/:id`       | Update income        | ✅            |
| DELETE | `/:id`       | Delete income        | ✅            |
| GET    | `/analytics` | Get income analytics | ✅            |

#### Create Income

```http
POST /api/v1/income
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "source": "Salary",
  "amount": 5000.00,
  "icon": "💼",
  "date": "2025-08-01T00:00:00Z"
}
```

### 📊 Dashboard Routes (`/api/v1/dashboard`)

| Method | Endpoint               | Description             | Auth Required |
| ------ | ---------------------- | ----------------------- | ------------- |
| GET    | `/overview`            | Get financial overview  | ✅            |
| GET    | `/recent-transactions` | Get recent transactions | ✅            |
| GET    | `/monthly-summary`     | Get monthly summary     | ✅            |
| GET    | `/yearly-analytics`    | Get yearly analytics    | ✅            |

## 🗄️ Database Models

### User Model

```javascript
{
  fullName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  profileImageUrl: String (optional),
  timestamps: { createdAt, updatedAt }
}
```

### Expense Model

```javascript
{
  userId: ObjectId (ref: User, required),
  category: String (required),
  amount: Number (required),
  icon: String (optional),
  date: Date (default: now),
  timestamps: { createdAt, updatedAt }
}
```

### Income Model

```javascript
{
  userId: ObjectId (ref: User, required),
  source: String (required),
  amount: Number (required),
  icon: String (optional),
  date: Date (default: now),
  timestamps: { createdAt, updatedAt }
}
```

## 🔒 Authentication & Security

### JWT Implementation

- **Token Generation**: 30-day expiration for user sessions
- **Token Verification**: Middleware-based route protection
- **Password Security**: bcrypt with salt rounds for secure hashing

### CORS Configuration

```javascript
{
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}
```

## 📁 File Upload System

### Multer Configuration

- **Storage**: Local file system storage
- **Directory**: `/uploads` folder
- **File Types**: Images (jpg, png, gif, etc.)
- **URL Generation**: Dynamic URL generation for uploaded files

### Upload Endpoint

```http
POST /api/v1/auth/upload-image
Content-Type: multipart/form-data

Form Data:
- image: <file>
```

## 🚀 Deployment

### Environment Variables for Production

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your-production-jwt-secret-very-long-and-secure
PORT=5000
CLIENT_URL=https://your-frontend-domain.com
NODE_ENV=production
```

### Production Deployment Steps

1. Set up MongoDB Atlas or production MongoDB instance
2. Configure environment variables
3. Build and deploy to your preferred platform (Heroku, Railway, DigitalOcean, etc.)
4. Ensure CORS is configured for your frontend domain

## 🧪 Testing

### Manual Testing with cURL

#### Register User

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"password123"}'
```

#### Login

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

#### Create Expense (with token)

```bash
curl -X POST http://localhost:5000/api/v1/expense \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"category":"Food","amount":25.50,"icon":"🍕"}'
```

## 🛠️ Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)

### Code Style

- **ES6+ Features**: Modern JavaScript syntax
- **Async/Await**: Promise-based asynchronous operations
- **Error Handling**: Comprehensive try-catch blocks
- **Middleware Pattern**: Modular request processing
- **MVC Architecture**: Separation of concerns

## 🔧 Configuration

### MongoDB Connection

The application uses Mongoose for MongoDB operations with automatic reconnection and error handling.

### JWT Configuration

- **Secret**: Stored in environment variables
- **Expiration**: 30 days for long-lived sessions
- **Algorithm**: HS256 (default)

### CORS Setup

Configured to allow requests from the frontend application with appropriate headers and methods.

## 📈 Performance & Scalability

### Database Optimization

- **Indexing**: Automatic indexing on user email and IDs
- **Population**: Efficient user data population in queries
- **Aggregation**: MongoDB aggregation pipelines for analytics

### Memory Management

- **Connection Pooling**: MongoDB connection pooling
- **Middleware Efficiency**: Lightweight middleware implementation
- **Static File Serving**: Efficient static file delivery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](../LICENSE) file for details.

## 👨‍💻 Author

**Nhan Pham Thanh**

- GitHub: [@NhanPhamThanh-IT](https://github.com/NhanPhamThanh-IT)

## 🙏 Acknowledgments

- Express.js team for the excellent web framework
- MongoDB team for the powerful database solution
- All contributors and the open-source community

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Contact the maintainer directly

</div>

---

<div align="center">

**Happy Coding! 🚀**

</div>
