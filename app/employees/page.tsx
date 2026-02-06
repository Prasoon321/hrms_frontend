'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { Trash2, Plus, AlertCircle } from 'lucide-react'
import { employeeAPI, Employee, APIError } from '@/lib/api'

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    department: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string>('')

  const departments = ['IT', 'HR', 'Finance', 'Operations', 'Sales']

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setIsFetching(true)
      setError('')
      const data = await employeeAPI.getAll()
      setEmployees(data)
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Failed to load employees'
      setError(message)
      console.error('Error fetching employees:', err)
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

  const handleAddEmployee = async () => {
    if (!formData.full_name || !formData.email || !formData.department) {
      setError('Please fill all fields')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      await employeeAPI.create(formData)
      setFormData({
        full_name: '',
        email: '',
        department: '',
      })
      await fetchEmployees()
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Failed to add employee'
      setError(message)
      console.error('Error adding employee:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteEmployee = async (employeeId: string) => {
    if (!confirm('Are you sure you want to delete this employee?')) {
      return
    }

    try {
      await employeeAPI.delete(employeeId)
      await fetchEmployees()
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Failed to delete employee'
      setError(message)
      console.error('Error deleting employee:', err)
    }
  }

  return (
    <LayoutWrapper>
      <div className="space-y-8">
        <div>
          <h1 className="font-serif text-4xl font-bold text-foreground">
            Employee Management
          </h1>
          <p className="mt-2 text-muted-foreground">
            Add, view, and manage employees in your organization.
          </p>
        </div>

        {/* Add Employee Form */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Add New Employee
          </h2>

          {error && (
            <div className="mb-4 mt-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label htmlFor="full_name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="full_name"
                name="full_name"
                placeholder="e.g., Vikram Patel"
                value={formData.full_name}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="e.g., vikram@company.com"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="department" className="text-sm font-medium">
                Department
              </Label>
              <Select
                value={formData.department}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    department: value,
                  }))
                }
              >
                <SelectTrigger id="department" className="mt-2">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleAddEmployee}
                disabled={isLoading}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                {isLoading ? 'Adding...' : 'Add Employee'}
              </Button>
            </div>
          </div>
        </div>

        {/* Employees Table */}
        <div className="rounded-lg border border-border bg-card shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h2 className="font-serif text-xl font-bold text-foreground">
              Employee List
            </h2>
          </div>

          {isFetching ? (
            <div className="px-6 py-12 text-center">
              <p className="text-muted-foreground">Loading employees...</p>
            </div>
          ) : employees.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-muted-foreground">
                No employees found. Add one to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-serif font-bold">
                      Employee ID
                    </TableHead>
                    <TableHead className="font-serif font-bold">Name</TableHead>
                    <TableHead className="font-serif font-bold">Email</TableHead>
                    <TableHead className="font-serif font-bold">
                      Department
                    </TableHead>
                    <TableHead className="font-serif font-bold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((emp) => (
                    <TableRow key={emp.employee_id}>
                      <TableCell className="font-mono text-sm text-primary">
                        {emp.employee_id}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {emp.full_name}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {emp.email}
                      </TableCell>
                      <TableCell className="text-sm text-foreground">
                        {emp.department}
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleDeleteEmployee(emp.employee_id)}
                          className="inline-flex items-center gap-2 rounded px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
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
