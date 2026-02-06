# HRMS Lite – Full Stack Web Application

A lightweight Human Resource Management System built as an assessment project. Enables administrators to manage employees and track attendance with a clean, responsive interface.

**Status**: ✅ Production Deployed | 📅 Build Date: February 2025 | 📦 Version: 1.0.0  
**Frontend**: https://hrms-frontend-five-lyart.vercel.app/ | **Backend API**: https://hrms-fastapi.vercel.app/

---

## Project Overview

**HRMS Lite** is a minimal, production-ready HR management tool designed for small teams. It provides:
- Employee registration and management
- Attendance tracking with multiple status options (Present, Absent, Half Day, Leave)
- Real-time dashboard showing total employees and attendance summary
- RESTful API backend with MongoDB persistence

**Target User:** Single admin managing company HR operations  
**Scope:** Assessment project – core HR features only  
**Not Included:** Authentication, payroll, leave management, multi-admin support

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16.1.6 (React 19, TypeScript)
- **Styling:** Tailwind CSS 3.4.17 with PostCSS
- **UI Components:** Radix UI (40+ headless components)
- **Icons:** Lucide React
- **Form Handling:** React Hook Form + Zod validation
- **HTTP Client:** Fetch API (wrapped in custom service layer)
- **Theme Support:** next-themes for dark/light mode

### Backend
- **Framework:** FastAPI 0.104.1
- **Server:** Uvicorn 0.24.0  
- **Async Driver:** Motor 3.3.2 (async MongoDB)
- **Data Validation:** Pydantic 2.5.0
- **Email Validation:** email-validator 2.1.0
- **Environment Config:** python-dotenv 1.0.0

### Database
- **MongoDB Atlas** (Cloud-hosted MongoDB)
- Collections: `employees`, `attendance`
- Indexes: Unique constraints on email and employee_id

---

## Features

### ✅ Employee Management
- **Create Employee:** Add new employees with name, email, and department
- **List Employees:** View all employees with auto-generated IDs (EMP001, EMP002, etc.)
- **View Details:** Get employee information by ID
- **Delete Employee:** Remove employee and cascading attendance records

### ✅ Attendance Management
- **Mark Attendance:** Record daily attendance status (Present, Absent, Half Day, Leave)
- **View Records:** See all attendance entries sorted by date
- **Employee History:** Check attendance history filtered by employee
- **Update Status:** Modify existing attendance entries

### ✅ Dashboard
- **Employee Count:** Display total employees in system
- **Daily Summary:** Show count of employees present today
- **Recent Employees:** Quick view of newly added employees
- **Responsive UI:** Works on desktop and mobile devices

---

## Project Folder Structure

```
hrms-lite-ui/
├── app/                              # Frontend (Next.js App Router)
│   ├── page.tsx                      # Dashboard (home page)
│   ├── layout.tsx                    # Root layout wrapper
│   ├── globals.css                   # Global styles
│   ├── employees/
│   │   └── page.tsx                  # Employee management page
│   └── attendance/
│       └── page.tsx                  # Attendance tracking page
│
├── components/                       # React components
│   ├── layout-wrapper.tsx            # Layout container
│   ├── navbar.tsx                    # Navigation bar
│   ├── summary-card.tsx              # Stats card component
│   ├── theme-provider.tsx            # Dark/light theme provider
│   └── ui/                           # Radix UI primitives (40+ components)
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── table.tsx
│       ├── input.tsx
│       ├── select.tsx
│       └── [other UI components...]
│
├── lib/
│   ├── api.ts                        # API client service layer
│   └── utils.ts                      # Utility functions
│
├── hooks/                            # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
│
├── backend/                          # FastAPI Backend
│   ├── app/
│   │   ├── main.py                   # FastAPI app initialization
│   │   ├── database.py               # MongoDB connection + indexes
│   │   │
│   │   ├── models/
│   │   │   ├── employee_model.py     # Employee Pydantic model
│   │   │   └── attendance_model.py   # Attendance Pydantic model
│   │   │
│   │   ├── schemas/
│   │   │   ├── employee_schema.py    # Employee request/response schemas
│   │   │   └── attendance_schema.py  # Attendance request/response schemas
│   │   │
│   │   ├── routes/
│   │   │   ├── employee_routes.py    # Employee endpoints
│   │   │   └── attendance_routes.py  # Attendance endpoints
│   │   │
│   │   ├── services/
│   │   │   ├── employee_service.py   # Employee business logic
│   │   │   └── attendance_service.py # Attendance business logic
│   │   │
│   │   └── utils/
│   │       └── validators.py         # Input validation helpers
│   │
│   ├── requirements.txt              # Python dependencies
│   ├── runtime.txt                   # Python version (3.12)
│   ├── .env                          # Backend environment (git-ignored)
│   ├── .vercelignore                 # Vercel deployment excludes
│   ├── vercel.json                   # Vercel deployment config
│   └── venv/                         # Virtual environment (git-ignored)
│
├── .env.local                        # Frontend environment variables
├── .vscode/settings.json             # VSCode workspace config
├── next.config.mjs                   # Next.js configuration
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts                # Tailwind CSS config
├── postcss.config.mjs                # PostCSS config
├── components.json                   # Shadcn/Radix config
├── package.json                      # Frontend dependencies
└── pnpm-lock.yaml                    # Dependency lock file
```

---

## How To Run Project Locally

### Prerequisites
- **Node.js** 18+ and **npm** (or pnpm)
- **Python** 3.12+
- **MongoDB Atlas** account with connection string

### Frontend Setup

1. Navigate to frontend root:
   ```bash
   cd hrms-lite-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update `.env.local` for local development:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

   Frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Create and activate Python virtual environment:
   ```bash
   # Windows:
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   
   # macOS/Linux:
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create `.env` file in `backend/` folder:
   ```
   MONGODB_URL=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/?appName=Cluster0
   DATABASE_NAME=hrms_lite
   ```

5. Start backend server:
   ```bash
   python -m uvicorn app.main:app --reload
   ```

   Backend will be available at `http://localhost:8000`  
   Swagger API docs: `http://localhost:8000/docs`

---

## Environment Variables

### Frontend (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```
- Determines which backend API the frontend calls
- Use `http://localhost:8000` for local development
- Use `https://hrms-fastapi.vercel.app` for production deployment

### Backend (`backend/.env`)
```
MONGODB_URL=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/?appName=Cluster0
DATABASE_NAME=hrms_lite
```
- `MONGODB_URL`: Full MongoDB Atlas connection string (keep secure, never commit)
- `DATABASE_NAME`: Name of MongoDB database to use

---

## API Endpoints

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API health status |
| GET | `/health` | Health check endpoint |

### Employee Endpoints
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|---|
| POST | `/employees` | Create new employee | `{full_name, email, department}` |
| GET | `/employees` | List all employees | – |
| GET | `/employees/{employee_id}` | Get employee by ID | – |
| DELETE | `/employees/{employee_id}` | Delete employee | – |

### Attendance Endpoints
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|---|
| POST | `/attendance` | Mark attendance | `{employee_id, date, status}` |
| GET | `/attendance` | Get all attendance records | – |
| GET | `/attendance/{employee_id}` | Get employee's attendance history | – |

**Status Options:** `Present`, `Absent`, `Half Day`, `Leave`  
**Date Format:** `YYYY-MM-DD`

**Interactive API Documentation:** http://localhost:8000/docs (Swagger UI)

---

## Deployment

### Frontend Deployment (Vercel)

Your frontend is already deployed at: https://hrms-frontend-five-lyart.vercel.app/

**To redeploy after changes:**
1. Push code to GitHub: `git push origin main`
2. Vercel auto-deploys from main branch
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://hrms-fastapi.vercel.app`

### Backend Deployment (Vercel)

Your backend is already deployed at: https://hrms-fastapi.vercel.app/

**To redeploy after changes:**
1. Navigate to backend: `cd backend`
2. Push code to GitHub: `git push origin main`
3. Vercel auto-deploys from main branch

**Vercel Configuration** (`vercel.json`):
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app/main.py",
      "use": "@vercel/python",
      "config": {
        "maxLambdaSize": "15mb",
        "runtime": "python3.12"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app/main.py"
    }
  ]
}
```

### CORS Configuration

Backend (`app/main.py`) allows requests from:
- `http://localhost:3000` – Local development
- `https://hrms-frontend-five-lyart.vercel.app` – Production frontend

---

## Database Schema

### Employees Collection
```javascript
{
  "_id": ObjectId,
  "employee_id": "EMP001",           // Unique, auto-generated
  "full_name": "John Doe",
  "email": "john@company.com",       // Unique
  "department": "Engineering",
  "created_at": ISODate("2025-02-06")
}
```

**Indexes:** `employee_id` (unique), `email` (unique)

### Attendance Collection
```javascript
{
  "_id": ObjectId,
  "employee_id": "EMP001",           // References employees collection
  "date": "2025-02-06",              // YYYY-MM-DD format
  "status": "Present",               // Present|Absent|Half Day|Leave
  "created_at": ISODate("2025-02-06")
}
```

**Indexes:** Compound unique index on `(employee_id, date)`

---

## Testing the Application

### Test Scenario 1: Add Employee
1. Open https://hrms-frontend-five-lyart.vercel.app/
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
1. Go to **Dashboard** (home page)
2. Check "Total Employees" count
3. Check "Present Today" count
4. ✅ Numbers match your actions

---

## Validation Rules

### Employee Validation
- ✅ Email must be valid format
- ✅ Email must be unique
- ✅ Full name required (1-100 chars)
- ✅ Department required (1-50 chars)

### Attendance Validation
- ✅ Employee must exist
- ✅ Date format must be YYYY-MM-DD
- ✅ Status must be: Present, Absent, Half Day, or Leave
- ✅ One record per employee per date (updates existing)

---

## Error Handling

All API responses follow standard format:

**Success (200)**
```json
{
  "employee_id": "EMP001",
  "full_name": "John Doe",
  "email": "john@company.com",
  "department": "Engineering",
  "created_at": "2025-02-06T10:00:00"
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
- `500` - Server Error

---

## Assumptions

✅ **Single Admin System**  
- No user authentication or role-based access control
- Direct database access for admin operations

✅ **No Employee Self-Service**  
- Admin manually enters employee data
- Employees cannot view their own records

✅ **Minimal Features**  
- Employee and attendance management only
- Designed for assessment scope, not production complexity

✅ **MongoDB Atlas Cloud Hosting**  
- Uses cloud-hosted MongoDB instead of local instance

---

## Limitations

❌ **No Authentication / Authorization**  
- Any user accessing the frontend can perform admin actions
- No user login or permission system

❌ **No Payroll Module**  
- Only attendance tracking, no salary calculations

❌ **No Leave Management**  
- Attendance recorded manually, no leave approval workflow

❌ **No Email Notifications**  
- No automatic alerts or confirmations

❌ **No Multi-Language Support**  
- English only

❌ **No Advanced Reporting**  
- Basic attendance records only, no analytics or export

---

## Commands Reference

### Frontend
```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend
```bash
python -m uvicorn app.main:app --reload        # Dev with auto-reload
python -m uvicorn app.main:app                 # Production mode
python -m uvicorn app.main:app --port 8001     # Custom port
```

### Git
```bash
git add .
git commit -m "Your message"
git push origin main
```

---

## Troubleshooting

### Backend won't start
```bash
# Error: Port 8000 already in use
# Solution: Use different port
python -m uvicorn app.main:app --reload --port 8001

# Error: ModuleNotFoundError
# Solution: Ensure virtual environment is activated
# Windows:
.\venv\Scripts\Activate.ps1
# macOS/Linux:
source venv/bin/activate
```

### MongoDB connection fails
```bash
# Error: Cannot connect to MongoDB
# Solution: Verify connection string
# 1. Check .env file has correct MONGODB_URL
# 2. Verify MongoDB Atlas IP whitelist includes your machine
# 3. Test connection: mongosh "your_mongodb_url"
```

### Frontend can't reach backend
```bash
# Error: "Failed to fetch" or CORS error
# Solutions:
# 1. Check .env.local: NEXT_PUBLIC_API_URL=http://localhost:8000
# 2. Ensure backend is running: http://localhost:8000/health
# 3. Check browser Console for detailed error
# 4. Verify CORS allowed_origins in app/main.py
```

### Deployment issues
```bash
# Vercel deployment fails
# 1. Push to GitHub first: git push origin main
# 2. Check Vercel dashboard logs
# 3. Rebuild deployment manually in Vercel dashboard
# 4. Verify environment variables are set in Vercel settings
```

---

## Project Repositories

- **Frontend:** https://github.com/Prasoon321/hrms_frontend
- **Backend:** https://github.com/Prasoon321/hrms_fastapi

---

## Technologies Used & Why

- **Next.js:** Modern React framework, great for full-stack apps
- **FastAPI:** High-performance async Python framework
- **MongoDB:** Flexible document database, great for rapid development
- **Tailwind CSS:** Utility-first CSS for rapid UI development
- **Radix UI:** Accessible, headless components
- **Vercel:** Seamless deployment for Node.js and Python apps

---

## Key Files to Review

1. **Frontend API Layer:** `lib/api.ts`
   - All API communication in one place
   - Type-safe requests and responses
   - Centralized error handling

2. **Backend Entry Point:** `backend/app/main.py`
   - FastAPI app setup
   - Route registration
   - CORS configuration
   - Startup/shutdown events

3. **Employee Service:** `backend/app/services/employee_service.py`
   - Business logic
   - Database operations
   - Validation and error handling

4. **Employee Page:** `app/employees/page.tsx`
   - Real API integration
   - Error handling
   - Loading states
   - Form submission

---

## Assessment Notes

This project demonstrates:
- Full-stack web application development (frontend + backend)
- RESTful API design principles
- Real-time form validation and error handling
- Async database operations with MongoDB
- Responsive UI with modern component libraries
- Deployment to serverless platforms
- Environment-based configuration management
- CORS policy implementation for security

---

## Support

For issues or questions:
1. Check API documentation at `{API_URL}/docs` (Swagger UI)
2. Review browser Console (DevTools F12) for frontend errors
3. Check backend terminal for server logs
4. Verify environment variables are correctly set
5. Ensure MongoDB Atlas connection string is valid
6. Check MongoDB Atlas IP whitelist allows your machine/Vercel

---

## License

This project is built for educational purposes as part of a coding assessment.

**Built with:**
- [FastAPI](https://fastapi.tiangolo.com/)
- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Created:** February 2025  
**Status:** ✅ Production Deployed  
**Version:** 1.0.0

---

## Next Steps

1. **Local Testing:** Run both backend and frontend locally
2. **View API:** Open https://hrms-fastapi.vercel.app/docs
3. **Test Features:** Create employees and mark attendance
4. **Review Code:** Check the well-structured backend services
5. **Deploy Updates:** Push to GitHub, Vercel auto-deploys

**Happy exploring! 🚀**
