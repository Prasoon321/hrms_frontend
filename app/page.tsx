'use client'

import { LayoutWrapper } from '@/components/layout-wrapper'
import { SummaryCard } from '@/components/summary-card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Users, Clock, DollarSign, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { employeeAPI, attendanceAPI, Employee } from '@/lib/api'

export default function Dashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0)
  const [presentToday, setPresentToday] = useState(0)
  const [recentEmployees, setRecentEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      const employeesData = await employeeAPI.getAll()
      setTotalEmployees(employeesData.length)
      setRecentEmployees(employeesData.slice(0, 4))

      const today = new Date().toISOString().split('T')[0]
      const attendanceData = await attendanceAPI.getAll()
      const todayPresent = attendanceData.records.filter(
        (r: any) => r.date === today && r.status === 'Present'
      ).length
      setPresentToday(todayPresent)
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setTotalEmployees(0)
      setPresentToday(0)
      setRecentEmployees([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LayoutWrapper>
      <div className="space-y-8">
        <div>
          <h1 className="font-serif text-4xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Welcome to HRMS. Here's your HR overview.
          </p>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Total Employees"
            value={totalEmployees}
            icon={<Users className="h-6 w-6" />}
            variant="primary"
          />
          <SummaryCard
            title="Present Today"
            value={presentToday}
            icon={<CheckCircle className="h-6 w-6" />}
            variant="success"
          />
          <SummaryCard
            title="Leave Today"
            value={0}
            icon={<Clock className="h-6 w-6" />}
          />
          <SummaryCard
            title="Monthly Salary"
            value="₹0"
            icon={<DollarSign className="h-6 w-6" />}
            variant="primary"
          />
        </div>

        {/* Recent Employees Table */}
        <div className="rounded-lg border border-border bg-card shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h2 className="font-serif text-xl font-bold text-foreground">
              Recent Employees
            </h2>
          </div>

          {isLoading ? (
            <div className="px-6 py-12 text-center">
              <p className="text-muted-foreground">Loading employees...</p>
            </div>
          ) : recentEmployees.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-muted-foreground">No employees found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-serif font-bold">Employee ID</TableHead>
                    <TableHead className="font-serif font-bold">Name</TableHead>
                    <TableHead className="font-serif font-bold">Email</TableHead>
                    <TableHead className="font-serif font-bold">Department</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentEmployees.map((emp) => (
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