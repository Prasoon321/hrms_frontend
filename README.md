# 🏢 HRMS Lite - Full Stack Application

A complete **Human Resource Management System** built with **Next.js** + **FastAPI** + **MongoDB**.

**Status**: ✅ Production Ready | 📅 Build Date: Feb 2025 | 📦 Version: 1.0.0

---

## 🎯 Features

### Employee Management

- ✅ Create new employees
- ✅ View all employees
- ✅ Delete employees
- ✅ Auto-generated unique IDs (EMP001, EMP002, etc.)

### Attendance Tracking

- ✅ Mark employee attendance
- ✅ Track attendance status (Present, Absent, Half Day, Leave)
- ✅ View all attendance records
- ✅ Filter by employee

### Dashboard

- ✅ Real-time statistics
- ✅ Total employees count
- ✅ Present employees today
- ✅ Recent employees list

### Technical Features

- ✅ RESTful API with FastAPI
- ✅ MongoDB with proper indexing
- ✅ Async operations
- ✅ Comprehensive error handling
- ✅ Input validation
- ✅ Type-safe TypeScript frontend
- ✅ Auto-generated API documentation (Swagger)
- ✅ CORS enabled
- ✅ Environment configuration

---

## 📁 Project Structure

```
hrms-lite-ui/
├── 📂 app/                        # Next.js pages
│   ├── page.tsx                  # Dashboard
│   ├── employees/                # Employee management
│   ├── attendance/               # Attendance tracking
│   └── layout.tsx
├── 📂 components/                 # React components
│   ├── navbar.tsx
│   ├── layout-wrapper.tsx
│   └── ui/                       # Shadcn UI components
├── 📂 lib/
│   └── api.ts                    # API service layer ⚡ KEY FILE
├── 📂 backend/                    # FastAPI backend
│   ├── 📂 app/
│   │   ├── main.py              # FastAPI app
│   │   ├── database.py          # MongoDB setup
│   │   ├── 📂 models/           # Data models
│   │   ├── 📂 schemas/          # Request/response validation
│   │   ├── 📂 routes/           # API endpoints
│   │   ├── 📂 services/         # Business logic
│   │   └── 📂 utils/            # Helpers
│   ├── requirements.txt
│   ├── .env                     # Config file
│   └── README_BACKEND.md
├── .env.local                    # Frontend config
├── 📄 SETUP_INSTRUCTIONS.md      # Start here! 👈
├── 📄 INTEGRATION_GUIDE.md       # Full integration guide
├── 📄 PROJECT_SUMMARY.md         # What was built
├── 📄 QUICK_REFERENCE.md         # Quick commands
└── package.json
```

---

## ⚡ Quick Start (5 minutes)

### 1️⃣ Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# OR macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend (keep terminal open)
python -m uvicorn app.main:app --reload
```

✅ Backend ready: http://localhost:8000

### 2️⃣ Frontend Setup

```bash
# Open new terminal, navigate to project root
cd hrms-lite-ui

# Install dependencies (if needed)
npm install

# Start frontend (keep terminal open)
npm run dev
```

✅ Frontend ready: http://localhost:3000

### 3️⃣ Open in Browser

Visit: **http://localhost:3000**

Done! ✨

---

## 📖 Documentation Files

| File                          | Purpose                                         |
| ----------------------------- | ----------------------------------------------- |
| **SETUP_INSTRUCTIONS.md**     | 📍 **START HERE** - Complete step-by-step setup |
| **QUICK_REFERENCE.md**        | Quick commands and troubleshooting              |
| **INTEGRATION_GUIDE.md**      | Detailed integration and deployment             |
| **PROJECT_SUMMARY.md**        | What was built and why                          |
| **backend/README_BACKEND.md** | Backend-specific documentation                  |

---

## 🔌 API Overview

### Base URL

```
http://localhost:8000
```

### Endpoints

#### 👥 Employees

```
POST   /employees              Create employee
GET    /employees              Get all employees
GET    /employees/{id}         Get specific employee
DELETE /employees/{id}         Delete employee
```

#### 📅 Attendance

```
POST   /attendance             Mark attendance
GET    /attendance             Get all records
GET    /attendance/{id}        Get employee records
```

#### 🏥 Health

```
GET    /                       Health check
GET    /health                 Status check
```

### API Documentation

**Interactive Swagger UI**: http://localhost:8000/docs

---

## 💾 Database Schema

### MongoDB Collections

**employees**

```javascript
{
  _id: ObjectId,
  employee_id: "EMP001",          // 🔑 Unique
  full_name: "Aarav Sharma",
  email: "aarav@company.com",     // 🔑 Unique
  department: "IT",
  created_at: ISODate(...)
}
```

**attendance**

```javascript
{
  _id: ObjectId,
  employee_id: "EMP001",          // Reference
  date: "2025-02-06",
  status: "Present",              // Present|Absent|Half Day|Leave
  created_at: ISODate(...)
}
```

---

## 🏗️ Technology Stack

### Frontend

- **Framework**: Next.js 16.1.6
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **HTTP**: Fetch API (native)
- **State**: React Hooks

### Backend

- **Framework**: FastAPI 0.104.1
- **Server**: Uvicorn 0.24.0
- **Database**: MongoDB
- **Driver**: Motor (async)
- **Validation**: Pydantic
- **Language**: Python 3.9+

### DevOps

- **Environment**: .env files
- **Package Manager**: Frontend: npm, Backend: pip
- **Runtime**: Node.js + Python

---

## 🧪 Example API Calls

### Create Employee

```bash
curl -X POST http://localhost:8000/employees \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Doe",
    "email": "john@company.com",
    "department": "IT"
  }'
```

**Response:**

```json
{
  "employee_id": "EMP001",
  "full_name": "John Doe",
  "email": "john@company.com",
  "department": "IT",
  "created_at": "2025-02-06T10:00:00"
}
```

### Mark Attendance

```bash
curl -X POST http://localhost:8000/attendance \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "EMP001",
    "date": "2025-02-06",
    "status": "Present"
  }'
```

### Get All Employees

```bash
curl http://localhost:8000/employees
```

---

## ✅ Testing the Application

### Test Scenario 1: Add Employee

1. Open http://localhost:3000
2. Go to **Employees** page
3. Fill form: Name, Email, Department
4. Click **Add Employee**
5. ✅ Employee appears in table

### Test Scenario 2: Mark Attendance

1. Go to **Attendance** page
2. Select employee from dropdown
3. Choose today's date
4. Select status (Present)
5. Click **Mark Attendance**
6. ✅ Record appears in table

### Test Scenario 3: View Dashboard

1. Go to **Dashboard**
2. Check "Total Employees" count
3. Check "Present Today" count
4. ✅ Numbers match your actions

---

## 🐛 Troubleshooting

### Backend won't start

```bash
# Error: Port 8000 already in use
# Solution: Use different port
python -m uvicorn app.main:app --reload --port 8001
```

### MongoDB connection fails

```bash
# Error: Cannot connect to MongoDB
# Solution: Ensure MongoDB is running
mongosh  # Test MongoDB connection
```

### Frontend can't reach backend

```bash
# Check .env.local
cat .env.local
# Should have: NEXT_PUBLIC_API_URL=http://localhost:8000
```

See **SETUP_INSTRUCTIONS.md** for more troubleshooting.

---

## 📊 Environment Configuration

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)

```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=hrms_lite
```

---

## 🚀 Deployment

### Where to Deploy

| Component | Options                                    |
| --------- | ------------------------------------------ |
| Backend   | Heroku, Railway, Render, AWS, Google Cloud |
| Frontend  | Vercel, Netlify, AWS, Google Cloud         |
| Database  | MongoDB Atlas                              |

**See INTEGRATION_GUIDE.md for detailed deployment steps.**

---

## 📋 Validation Rules

### Employee Validation

- ✅ Email must be valid format
- ✅ Email must be unique
- ✅ Full name required (1-100 chars)
- ✅ Department required (1-50 chars)

### Attendance Validation

- ✅ Employee must exist
- ✅ Date format must be YYYY-MM-DD
- ✅ Status must be: Present, Absent, Half Day, or Leave
- ✅ One record per employee per day

---

## 🔐 Error Handling

All API responses follow standard format:

**Success (200)**

```json
{
  "employee_id": "EMP001",
  "full_name": "John",
  ...
}
```

**Error (4xx/5xx)**

```json
{
  "detail": "Descriptive error message"
}
```

Common error codes:

- `400` - Bad Request (validation error)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate email)

---

## 📚 Learning Resources

### For Backend Development

- FastAPI: https://fastapi.tiangolo.com/
- MongoDB: https://docs.mongodb.com/
- Python: https://docs.python.org/3/

### For Frontend Development

- Next.js: https://nextjs.org/docs
- TypeScript: https://www.typescriptlang.org/
- React: https://react.dev/

---

## 🎯 Project Highlights

### ✨ What Makes This Special

- **Production-Ready Code**: Clean, modular, well-structured
- **Full Integration**: Real API calls from frontend
- **Database Persistence**: Data stored in MongoDB
- **Error Handling**: Comprehensive error messages
- **Type Safety**: TypeScript throughout
- **Auto Documentation**: Swagger UI at /docs
- **Easy to Understand**: Beginner-friendly code
- **Well Documented**: Multiple documentation files

### 📦 Scope Appropriate

- ✅ Fits 6-8 hour assessment
- ✅ Not over-engineered
- ✅ Focus on core features
- ✅ Production-like structure
- ✅ Easy to demonstrate

---

## 🔍 Key Files to Review

1. **Frontend API Layer**: `lib/api.ts`
   - All API communication in one place
   - Type-safe requests and responses

2. **Backend Entry Point**: `backend/app/main.py`
   - FastAPI app setup
   - Route registration
   - CORS configuration

3. **Employee Service**: `backend/app/services/employee_service.py`
   - Business logic
   - Database operations
   - Validation

4. **Employee Page**: `app/employees/page.tsx`
   - Real API integration
   - Error handling
   - Loading states

---

## 💡 Useful Commands

### Terminal Commands

**Backend**

```bash
# Activate virtual environment
venv\Scripts\activate              # Windows
source venv/bin/activate           # macOS/Linux

# Start server
python -m uvicorn app.main:app --reload

# Test MongoDB
mongosh
```

**Frontend**

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build production
npm run build

# Lint code
npm run lint
```

---

## 📈 Performance Notes

- **Async Operations**: Backend uses async for faster I/O
- **Database Indexes**: Created on unique fields for speed
- **Lazy Loading**: Frontend loads data on demand
- **Error Recovery**: Graceful error handling

---

## 🎓 Learning Outcomes

After setting up this project, you'll understand:

- ✅ How to build a REST API with FastAPI
- ✅ How to use MongoDB with async operations
- ✅ How to connect frontend to backend APIs
- ✅ Frontend and backend error handling
- ✅ Type safety with TypeScript
- ✅ Full-stack application architecture
- ✅ Deployment considerations

---

## 📞 Support

**Questions about setup?** → See `SETUP_INSTRUCTIONS.md`
**Questions about API?** → See `INTEGRATION_GUIDE.md`
**Need quick reference?** → See `QUICK_REFERENCE.md`
**Want backend details?** → See `backend/README_BACKEND.md`

---

## ✅ Checklist Before Submission

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can create employee
- [ ] Can view employees
- [ ] Can delete employee
- [ ] Can mark attendance
- [ ] Can view attendance records
- [ ] Dashboard updates correctly
- [ ] Data persists in MongoDB
- [ ] API docs accessible at /docs
- [ ] No console errors
- [ ] Code is committed with good messages

---

## 📝 License & Attribution

This project is built for educational purposes as part of a coding assessment.

**Built with**:

- [FastAPI](https://fastapi.tiangolo.com/)
- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🎉 Ready to Go!

Everything is set up and ready to use. Start with:

1. **Read**: `SETUP_INSTRUCTIONS.md` (15 min)
2. **Setup**: Run backend and frontend (10 min)
3. **Test**: Create an employee and mark attendance (5 min)
4. **Deploy**: Follow `INTEGRATION_GUIDE.md` (varies)

---

**Created**: February 2025
**Status**: ✅ Production Ready
**Version**: 1.0.0

**Happy coding! 🚀**
