# HRMS Lite - Full Stack Integration Guide

## Project Overview

This is a complete HRMS Lite system with:

- **Frontend**: Next.js 16 with TypeScript (already built)
- **Backend**: FastAPI + MongoDB
- **Database**: MongoDB

The system manages Employee data and Attendance records.

---

## Architecture

```
┌─────────────────────────────┐
│   Frontend (Next.js)        │
│  - Dashboard                │
│  - Employee Management      │
│  - Attendance Tracking      │
└──────────────┬──────────────┘
               │
         HTTP/REST API
               │
       ┌───────▼────────┐
       │   Backend      │
       │   (FastAPI)    │
       └───────┬────────┘
               │
       ┌───────▼──────────┐
       │   MongoDB        │
       │  - employees     │
       │  - attendance    │
       └──────────────────┘
```

---

## Quick Start (5 Minutes)

### Prerequisites

- Python 3.9+
- MongoDB running locally or MongoDB Atlas account
- Node.js 18+

### Step 1: Install Backend Dependencies

```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

### Step 2: Configure MongoDB

**Local MongoDB:**

```bash
# Windows: MongoDB should be running as service
# Verify connection: mongodb://localhost:27017
```

**MongoDB Atlas (Cloud):**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Copy to `.env` file

### Step 3: Set Up Backend Environment

```bash
cd backend
cp .env.example .env

# Edit .env with your MongoDB connection:
# MONGODB_URL=mongodb://localhost:27017
# DATABASE_NAME=hrms_lite
```

### Step 4: Start Backend Server

```bash
cd backend
python -m uvicorn app.main:app --reload

# Server starts at http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Step 5: Frontend Already Connected!

The frontend is already configured to connect to `http://localhost:8000`

- Location: `hrms-lite-ui/.env.local`
- `NEXT_PUBLIC_API_URL=http://localhost:8000`

### Step 6: Run Frontend

```bash
cd hrms-lite-ui
npm install  # If not done
npm run dev

# Frontend runs at http://localhost:3000
```

---

## API Endpoints Reference

All endpoints are available in Swagger UI: `http://localhost:8000/docs`

### Employee Endpoints

| Method | Endpoint                   | Description           |
| ------ | -------------------------- | --------------------- |
| POST   | `/employees`               | Create new employee   |
| GET    | `/employees`               | Get all employees     |
| GET    | `/employees/{employee_id}` | Get specific employee |
| DELETE | `/employees/{employee_id}` | Delete employee       |

### Attendance Endpoints

| Method | Endpoint                    | Description          |
| ------ | --------------------------- | -------------------- |
| POST   | `/attendance`               | Mark attendance      |
| GET    | `/attendance`               | Get all records      |
| GET    | `/attendance/{employee_id}` | Get employee records |

---

## Complete API Examples

### 1. Create Employee

```bash
curl -X POST http://localhost:8000/employees \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Aarav Sharma",
    "email": "aarav@company.com",
    "department": "IT"
  }'

# Response:
{
  "employee_id": "EMP001",
  "full_name": "Aarav Sharma",
  "email": "aarav@company.com",
  "department": "IT",
  "created_at": "2025-02-06T10:00:00"
}
```

### 2. Get All Employees

```bash
curl http://localhost:8000/employees

# Response:
[
  {
    "employee_id": "EMP001",
    "full_name": "Aarav Sharma",
    "email": "aarav@company.com",
    "department": "IT",
    "created_at": "2025-02-06T10:00:00"
  }
]
```

### 3. Mark Attendance

```bash
curl -X POST http://localhost:8000/attendance \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "EMP001",
    "date": "2025-02-06",
    "status": "Present"
  }'

# Status values: Present, Absent, Half Day, Leave
```

### 4. Get All Attendance

```bash
curl http://localhost:8000/attendance

# Response includes employee names joined from employee collection
```

---

## Frontend Integration Details

### API Service Layer

**Location**: `lib/api.ts`

This file handles all backend communication:

```typescript
// Employee APIs
employeeAPI.create(data); // Add employee
employeeAPI.getAll(); // Get all employees
employeeAPI.getById(id); // Get specific employee
employeeAPI.delete(id); // Delete employee

// Attendance APIs
attendanceAPI.mark(data); // Mark attendance
attendanceAPI.getAll(); // Get all records
attendanceAPI.getByEmployee(id); // Get employee records
```

### Pages Using APIs

1. **Dashboard** (`app/page.tsx`)
   - Fetches total employees
   - Shows present employees today
   - displays recent employees

2. **Employees** (`app/employees/page.tsx`)
   - Add new employee → `POST /employees`
   - View all employees → `GET /employees`
   - Delete employee → `DELETE /employees/{id}`

3. **Attendance** (`app/attendance/page.tsx`)
   - Mark attendance → `POST /attendance`
   - View all records → `GET /attendance`
   - Dynamic employee dropdown from API

### Error Handling

All pages have error states:

- Loading state while fetching
- Error messages with explanations
- Empty states when no data
- Confirmation dialogs for deletions

---

## MongoDB Database Schema

### Employees Collection

```javascript
{
  _id: ObjectId,
  employee_id: "EMP001",          // Unique
  full_name: "Aarav Sharma",
  email: "aarav@company.com",     // Unique
  department: "IT",
  created_at: ISODate("2025-02-06T10:00:00")
}
```

**Indexes**: `employee_id` (unique), `email` (unique)

### Attendance Collection

```javascript
{
  _id: ObjectId,
  employee_id: "EMP001",
  date: "2025-02-06",
  status: "Present",
  created_at: ISODate("2025-02-06T10:00:00")
}
```

**Indexes**: Compound unique index on (`employee_id`, `date`)

---

## Validation Rules

### Employee Creation

- **full_name**: Required, 1-100 characters
- **email**: Required, valid format, unique in system
- **department**: Required, 1-50 characters

### Attendance Recording

- **employee_id**: Required, must exist in system
- **date**: Required, YYYY-MM-DD format
- **status**: Required, one of: `Present`, `Absent`, `Half Day`, `Leave`

---

## Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution 1: Local MongoDB**

```bash
# Check if MongoDB is running
# Windows: Check Services > MongoDB
# macOS: brew services list
# Linux: sudo systemctl status mongod

# Start MongoDB:
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Solution 2: MongoDB Atlas**

1. Verify connection string in `.env`
2. Check whitelist IP (allow all for testing: 0.0.0.0/0)
3. Ensure username/password are correct

### Issue: "Port 8000 already in use"

```bash
# Kill process on port 8000
# Windows (PowerShell):
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process

# Or use different port:
uvicorn app.main:app --reload --port 8001
```

### Issue: "Frontend can't reach backend"

1. Verify backend is running: `http://localhost:8000/docs`
2. Check `.env.local` has correct API URL
3. Check CORS is enabled in backend (it is by default)

### Issue: "Employee ID generation skips numbers"

This is normal - IDs are generated based on count at creation time. Example sequence: EMP001, EMP002, EMP004 (if EMP003 was deleted).

---

## Data Persistence

### Backend File Structure

```
backend/
├── app/
│   ├── main.py                  # FastAPI app
│   ├── database.py              # MongoDB connection
│   ├── models/
│   │   ├── employee_model.py
│   │   └── attendance_model.py
│   ├── schemas/                 # Request/Response validation
│   ├── routes/                  # API endpoints
│   ├── services/                # Business logic
│   └── utils/
│       └── validators.py        # Validations
├── requirements.txt
├── .env.example
└── README_BACKEND.md
```

### Frontend File Structure

```
hrms-lite-ui/
├── app/
│   ├── page.tsx                 # Dashboard
│   ├── employees/page.tsx       # Employee Management
│   ├── attendance/page.tsx      # Attendance Management
│   └── layout.tsx
├── lib/
│   └── api.ts                   # API service layer
├── components/
│   └── ui/                      # UI components
├── .env.local                   # Frontend config
└── package.json
```

---

## Deployment Guide

### Deploy Backend

**Using Heroku:**

```bash
cd backend
heroku login
heroku create hrms-lite-api
heroku config:set MONGODB_URL=mongodb+srv://...
git push heroku main
```

**Using Railway, Render, or Vercel:**

1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy

### Deploy Frontend

**Using Vercel (Recommended):**

```bash
# In hrms-lite-ui directory
npm run build
vercel deploy
```

**Update API URL:**
In `hrms-lite-ui/.env.local`:

```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

### Update CORS in Backend

In `backend/app/main.py`:

```python
# Before:
allow_origins=["*"]

# After (production):
allow_origins=["https://your-frontend-domain.com"]
```

---

## Testing the System

### Test 1: Create Employee

```
POST /employees
{
  "full_name": "Test User",
  "email": "test@test.com",
  "department": "IT"
}
```

✓ Should return employee_id: EMP001

### Test 2: Get Employees

```
GET /employees
```

✓ Should return array with created employee

### Test 3: Mark Attendance

```
POST /attendance
{
  "employee_id": "EMP001",
  "date": "2025-02-06",
  "status": "Present"
}
```

✓ Should create attendance record

### Test 4: Delete Employee

```
DELETE /employees/EMP001
```

✓ Should delete employee and their attendance records

---

## Production Checklist

- [ ] MongoDB Atlas setup with strong password
- [ ] Backend deployed with environment variables
- [ ] Frontend deployed and connected to backend API
- [ ] CORS configured for production frontend URL
- [ ] Database indexes verified
- [ ] Backup strategy in place
- [ ] Error logging setup
- [ ] API rate limiting configured
- [ ] Authentication/Authorization (if needed)
- [ ] SSL/HTTPS enabled

---

## Support & Documentation

- **FastAPI**: https://fastapi.tiangolo.com/
- **MongoDB**: https://docs.mongodb.com/
- **Next.js**: https://nextjs.org/docs
- **Uvicorn**: https://www.uvicorn.org/

---

## Project Summary

| Component   | Technology              | Status       |
| ----------- | ----------------------- | ------------ |
| Frontend    | Next.js 16 + TypeScript | ✓ Complete   |
| Backend     | FastAPI + Uvicorn       | ✓ Complete   |
| Database    | MongoDB                 | ✓ Configured |
| API Service | TypeScript              | ✓ Complete   |
| Integration | REST API                | ✓ Complete   |

**Timeline to Setup**: 15-20 minutes
**Time to First Working Feature**: < 5 minutes

---

## Next Steps (Optional Enhancements)

- [ ] Add authentication (JWT)
- [ ] Add leave management
- [ ] Add payroll calculations
- [ ] Add reports/analytics
- [ ] Add email notifications
- [ ] Add role-based access
- [ ] Add audit logs
- [ ] Add bulk import (CSV)
