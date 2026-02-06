# HRMS Lite - Step-by-Step Setup Instructions

## Overview

Complete guide to set up and run the full-stack HRMS Lite application locally.

---

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] Python 3.9 or higher
- [ ] Node.js 18+ and npm
- [ ] MongoDB (local or MongoDB Atlas account)
- [ ] Git
- [ ] VS Code or terminal

---

## Part 1: Backend Setup (FastAPI + MongoDB)

### Step 1.1: Navigate to Backend Directory

```bash
cd backend
```

### Step 1.2: Create Python Virtual Environment

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` prefix in your terminal.

### Step 1.3: Install Dependencies

```bash
pip install -r requirements.txt
```

Wait for all packages to install (takes 1-2 minutes).

### Step 1.4: Set Up MongoDB

**Option A: Local MongoDB**

1. Download from: https://www.mongodb.com/try/download/community
2. Install using default settings
3. Start MongoDB:
   - **Windows**: Should start automatically as service
   - **macOS**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

4. Verify: Open terminal and run:
   ```bash
   mongosh
   ```
   You should see a MongoDB shell prompt. Type `exit` to close.

**Option B: MongoDB Atlas (Cloud, Recommended)**

1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Keep it safe for Step 1.5

### Step 1.5: Configure Environment Variables

In `backend` directory:

```bash
# Windows:
copy .env.example .env

# macOS/Linux:
cp .env.example .env
```

Edit `.env` file:

**For Local MongoDB:**

```
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=hrms_lite
```

**For MongoDB Atlas:**

```
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DATABASE_NAME=hrms_lite
```

Replace `username`, `password`, and `cluster` with your Atlas credentials.

### Step 1.6: Start Backend Server

```bash
python -m uvicorn app.main:app --reload
```

You should see:

```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
✓ Connected to MongoDB database: hrms_lite
```

### Step 1.7: Test Backend (Optional)

Open in browser: http://localhost:8000/docs

You should see interactive Swagger API documentation.

Try this:

1. Click on `POST /employees`
2. Click "Try it out"
3. Paste this JSON:

```json
{
  "full_name": "Test Employee",
  "email": "test@company.com",
  "department": "IT"
}
```

4. Click "Execute"
5. You should get a 201 response with employee_id: EMP001

✓ **Backend is working!** Keep this terminal running.

---

## Part 2: Frontend Setup (Next.js)

### Step 2.1: Open New Terminal

Keep backend running in previous terminal. Open a new terminal window.

### Step 2.2: Navigate to Frontend Directory

```bash
cd hrms-lite-ui
```

### Step 2.3: Environment Already Configured

Check `.env.local` file exists with:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

If not, create it with above content.

### Step 2.4: Install Dependencies

```bash
npm install
```

This installs all Node packages (takes 2-3 minutes).

### Step 2.5: Start Frontend Development Server

```bash
npm run dev
```

You should see:

```
> next dev


 ▲ Next.js 16.1.6

 ✓ Ready in 3.2s
 ✓ Compiled client and server successfully
 ○ Localhost:3000 ready in 0ms
```

✓ **Frontend is running!** Keep this terminal running too.

---

## Part 3: Access the Application

### Step 3.1: Open in Browser

Navigate to: **http://localhost:3000**

You should see the HRMS Lite dashboard with:

- Navigation bar (Dashboard, Employees, Attendance)
- Summary cards (Total Employees, Present Today, etc.)
- Recent Employees table

### Step 3.2: Test Employee Creation

1. Click **"Employees"** in navigation
2. Fill the form:
   - Full Name: `Aarav Sharma`
   - Email: `aarav@company.com`
   - Department: `IT`
3. Click **"Add Employee"**
4. Employee should appear in the table below
5. Verify in backend docs http://localhost:8000/docs with GET /employees

### Step 3.3: Test Attendance Marking

1. Click **"Attendance"** in navigation
2. Select the employee you just created
3. Choose today's date
4. Select status: `Present`
5. Click **"Mark Attendance"**
6. Record should appear in the table

### Step 3.4: Verify Dashboard Updates

1. Go back to **"Dashboard"**
2. "Total Employees" should show 1
3. "Present Today" should show 1 (if you marked as Present today)

---

## Part 4: Verify Complete Setup

### Checklist

- [ ] Backend running on http://localhost:8000
- [ ] Frontend running on http://localhost:3000
- [ ] Can see API docs on http://localhost:8000/docs
- [ ] Can create employee
- [ ] Can mark attendance
- [ ] Can view employees list
- [ ] Can view attendance records
- [ ] Dashboard shows correct counts

If all checked, **you're done!** ✓

---

## Troubleshooting

### Issue: Backend won't start

**Error: "Port 8000 already in use"**

```bash
# Kill existing process or use different port:
python -m uvicorn app.main:app --reload --port 8001
```

**Error: "Cannot connect to MongoDB"**

1. Check MongoDB is running:
   ```bash
   # Windows: Check Services
   # Linux: sudo systemctl status mongod
   ```
2. Check connection string in `.env` is correct
3. If using Atlas, ensure IP is whitelisted (use 0.0.0.0/0 for testing)

### Issue: Frontend won't connect to backend

**Error: "Failed to load employees"**

1. Check backend is running (you should see http://localhost:8000)
2. Verify `.env.local` has: `NEXT_PUBLIC_API_URL=http://localhost:8000`
3. Restart frontend: Stop (Ctrl+C) and run `npm run dev` again

### Issue: Database empty or changes not persisting

**Check MongoDB connection:**

```bash
# Test local MongoDB
mongosh
> show databases
> use hrms_lite
> db.employees.find()
```

Should show your created employees.

### Issue: "Invalid email format" error

**Solution**: Make sure email is in valid format

- ✓ Valid: `user@company.com`
- ✗ Invalid: `usercompany.com` or `user@company`

---

## Common Tasks

### Add Multiple Test Employees

```bash
# Click Employees > Add New Employee, repeat:
1. Priya Verma, priya@company.com, HR
2. Rohan Mehta, rohan@company.com, Finance
3. Anjali Singh, anjali@company.com, Operations
```

Then go to dashboard to see "Total Employees: 3"

### Mark Attendance for Multiple Dates

1. Go to Attendance
2. Mark employee Present on 2025-02-06
3. Mark same employee Absent on 2025-02-05
4. View attendance records showing both

### Reset Everything

```bash
# Delete database (MongoDB):
mongosh
> use hrms_lite
> db.employees.deleteMany({})
> db.attendance.deleteMany({})
> exit

# Or in MongoDB Atlas: Drop database from UI
```

---

## Project Structure Summary

```
hrms-lite-ui/
├── app/                          # Next.js pages
│   ├── page.tsx                 # Dashboard (home)
│   ├── employees/page.tsx       # Employee management
│   ├── attendance/page.tsx      # Attendance tracking
│   └── layout.tsx
├── components/                   # React components
├── lib/
│   └── api.ts                   # API service layer
├── .env.local                   # **Frontend config (IMPORTANT)**
├── package.json
└── ...

backend/
├── app/
│   ├── main.py                  # FastAPI app
│   ├── database.py              # MongoDB connection
│   ├── models/                  # Data models
│   ├── schemas/                 # Request/response validation
│   ├── routes/                  # API endpoints
│   ├── services/                # Business logic
│   └── utils/
│       └── validators.py
├── requirements.txt             # Python dependencies
├── .env                         # **Backend config (IMPORTANT)**
├── .env.example
└── README_BACKEND.md
```

---

## What Each Component Does

### 1. Frontend (Next.js)

- Displays dashboard with employee & attendance data
- Shows forms to add employees and mark attendance
- Calls backend APIs when user performs actions
- Displays loading/error states

### 2. Backend (FastAPI)

- Handles all API requests from frontend
- Validates data (email format, unique employee IDs, etc.)
- Connects to MongoDB database
- Returns JSON responses

### 3. Database (MongoDB)

- Stores all employee data
- Stores all attendance records
- Maintains relationships between employees and attendance
- Ensures data persistence across restarts

### 4. API Bridge (lib/api.ts)

- JavaScript service layer
- Makes HTTP calls to FastAPI backend
- Handles errors and retries
- Provides TypeScript types for type safety

---

## Next: Production Deployment

Once everything works locally, you can:

1. **Deploy Backend**
   - Use Heroku, Railway, or Render
   - Set environment variables on hosting platform
   - Use MongoDB Atlas for database

2. **Deploy Frontend**
   - Use Vercel (recommended for Next.js)
   - Set `NEXT_PUBLIC_API_URL` to backend URL
   - Push to GitHub, auto-deploy to Vercel

See `INTEGRATION_GUIDE.md` for deployment instructions.

---

## Quick Reference

| Component | URL                        | Command                                      |
| --------- | -------------------------- | -------------------------------------------- |
| Frontend  | http://localhost:3000      | `npm run dev` (in hrms-lite-ui)              |
| Backend   | http://localhost:8000      | `uvicorn app.main:app --reload` (in backend) |
| API Docs  | http://localhost:8000/docs | Auto at backend                              |
| Database  | localhost:27017            | `mongosh`                                    |

---

## Success!

At this point, you have:
✓ Full-stack HRMS Lite application running locally
✓ Employee management working
✓ Attendance tracking working
✓ Real MongoDB data persistence
✓ Clean, production-like code structure

**Ready to use and/or deploy!**

---

## Additional Commands

### Stop backend gracefully

Press `Ctrl+C` in backend terminal

### Stop frontend gracefully

Press `Ctrl+C` in frontend terminal

### Rebuild frontend

```bash
npm run build
```

### Format code

```bash
npm run lint
```

### View backend logs

Logs show in terminal where backend is running

---

For questions, refer to:

- `INTEGRATION_GUIDE.md` - Full integration details
- `backend/README_BACKEND.md` - Backend specifics
- FastAPI docs: https://fastapi.tiangolo.com/
- MongoDB docs: https://docs.mongodb.com/
