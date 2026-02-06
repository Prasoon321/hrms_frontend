'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { CheckCircle, XCircle, Clock, Plus, AlertCircle } from 'lucide-react'
import { attendanceAPI, employeeAPI, Employee, AttendanceWithName, APIError } from '@/lib/api'

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<AttendanceWithName[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])

  const [formData, setFormData] = useState({
    employee_id: '',
    date: new Date().toISOString().split('T')[0],
    status: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string>('')

  const statuses = ['Present', 'Absent', 'Half Day', 'Leave']

  // Fetch data on mount
  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      setIsFetching(true)
      setError('')
      const [attendanceData, employeeData] = await Promise.all([
        attendanceAPI.getAll(),
        employeeAPI.getAll(),
      ])
      setAttendance(attendanceData.records || [])
      setEmployees(employeeData)
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Failed to load data'
      setError(message)
      console.error('Error fetching data:', err)
    } finally {
      setIsFetching(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMarkAttendance = async () => {
    if (!formData.employee_id || !formData.date || !formData.status) {
      setError('Please fill all fields')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      await attendanceAPI.mark(formData)
      setFormData({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        status: '',
      })
      await fetchInitialData()
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Failed to mark attendance'
      setError(message)
      console.error('Error marking attendance:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present':
        return <CheckCircle className="h-5 w-5 text-success" />
      case 'Absent':
        return <XCircle className="h-5 w-5 text-destructive" />
      case 'Half Day':
        return <Clock className="h-5 w-5 text-accent" />
      case 'Leave':
        return <Clock className="h-5 w-5 text-primary" />
      default:
        return null
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Present':
        return 'bg-success/10 text-success'
      case 'Absent':
        return 'bg-destructive/10 text-destructive'
      case 'Half Day':
        return 'bg-accent/10 text-accent'
      case 'Leave':
        return 'bg-primary/10 text-primary'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <LayoutWrapper>
      <div className="space-y-8">
        <div>
          <h1 className="font-serif text-4xl font-bold text-foreground">
            Attendance Management
          </h1>
          <p className="mt-2 text-muted-foreground">
            Mark and manage employee attendance records.
          </p>
        </div>

        {/* Mark Attendance Form */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Mark Attendance
          </h2>

          {error && (
            <div className="mb-4 mt-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div>
              <Label htmlFor="employee_id" className="text-sm font-medium">
                Select Employee
              </Label>
              <Select
                value={formData.employee_id}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    employee_id: value,
                  }))
                }
              >
                <SelectTrigger id="employee_id" className="mt-2">
                  <SelectValue placeholder="Choose employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp.employee_id} value={emp.employee_id}>
                      {emp.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date" className="text-sm font-medium">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: value,
                  }))
                }
              >
                <SelectTrigger id="status" className="mt-2">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleMarkAttendance}
                disabled={isLoading}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                {isLoading ? 'Marking...' : 'Mark Attendance'}
              </Button>
            </div>
          </div>
        </div>

        {/* Attendance Records Table */}
        <div className="rounded-lg border border-border bg-card shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h2 className="font-serif text-xl font-bold text-foreground">
              Attendance Records
            </h2>
          </div>

          {isFetching ? (
            <div className="px-6 py-12 text-center">
              <p className="text-muted-foreground">Loading attendance records...</p>
            </div>
          ) : attendance.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-muted-foreground">
                No attendance records found. Mark attendance to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-serif font-bold">Date</TableHead>
                    <TableHead className="font-serif font-bold">
                      Employee Name
                    </TableHead>
                    <TableHead className="font-serif font-bold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance.map((record: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {new Date(record.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {record.employee_name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(record.status)}
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStatusBadgeClass(record.status)}`}
                          >
                            {record.status}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  )
}
