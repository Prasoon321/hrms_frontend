import { ReactNode } from 'react'
import { Navbar } from './navbar'

export function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  )
}
