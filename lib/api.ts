// API service for HRMS Lite backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Employee Types
export interface Employee {
  employee_id: string
  full_name: string
  email: string
  department: string
  created_at: string
}

export interface EmployeeCreateInput {
  full_name: string
  email: string
  department: string
}

// Attendance Types
export interface Attendance {
  employee_id: string
  date: string
  status: string
  created_at: string
}

export interface AttendanceWithName extends Attendance {
  employee_name: string
}

export interface AttendanceCreateInput {
  employee_id: string
  date: string
  status: string
}

// Error handling
class APIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`
  let response: Response
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
  } catch (err: any) {
    const msg = err?.message || String(err) || 'Network error'
    throw new APIError(0, 'NetworkError', `Network error: ${msg}`)
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new APIError(
      response.status,
      response.statusText,
      error.detail || `API Error: ${response.statusText}`
    )
  }

  return response.json()
}

// Employee APIs
export const employeeAPI = {
  create: async (data: EmployeeCreateInput): Promise<Employee> => {
    return apiCall<Employee>('/employees', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  getAll: async (): Promise<Employee[]> => {
    return apiCall<Employee[]>('/employees')
  },

  getById: async (employeeId: string): Promise<Employee> => {
    return apiCall<Employee>(`/employees/${employeeId}`)
  },

  delete: async (employeeId: string): Promise<{ message: string }> => {
    return apiCall<{ message: string }>(`/employees/${employeeId}`, {
      method: 'DELETE',
    })
  },
}

// Attendance APIs
export const attendanceAPI = {
  mark: async (data: AttendanceCreateInput): Promise<Attendance> => {
    return apiCall<Attendance>('/attendance', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  getAll: async (): Promise<{ records: AttendanceWithName[]; total: number }> => {
    return apiCall<{ records: AttendanceWithName[]; total: number }>('/attendance')
  },

  getByEmployee: async (employeeId: string): Promise<Attendance[]> => {
    return apiCall<Attendance[]>(`/attendance/${employeeId}`)
  },
}

export { APIError }
