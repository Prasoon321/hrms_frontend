'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3 } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <BarChart3 className="h-7 w-7" />
          <span className="font-serif text-xl font-bold">HRMS </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`transition-colors ${
              isActive('/') ? 'text-accent' : 'hover:text-accent/80'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/employees"
            className={`transition-colors ${
              isActive('/employees') ? 'text-accent' : 'hover:text-accent/80'
            }`}
          >
            Employees
          </Link>
          <Link
            href="/attendance"
            className={`transition-colors ${
              isActive('/attendance') ? 'text-accent' : 'hover:text-accent/80'
            }`}
          >
            Attendance
          </Link>
        </div>
      </div>
    </nav>
  )
}
