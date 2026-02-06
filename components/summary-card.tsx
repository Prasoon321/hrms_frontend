import { ReactNode } from 'react'

export function SummaryCard({
  title,
  value,
  icon,
  description,
  variant = 'default',
}: {
  title: string
  value: string | number
  icon?: ReactNode
  description?: string
  variant?: 'default' | 'primary' | 'success' | 'warning'
}) {
  const variantClasses = {
    default: 'bg-card border-muted',
    primary: 'bg-primary/5 border-primary/20',
    success: 'bg-success/5 border-success/20',
    warning: 'bg-destructive/5 border-destructive/20',
  }

  return (
    <div
      className={`rounded-lg border-2 p-6 shadow-sm transition-shadow hover:shadow-md ${variantClasses[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {icon && <div className="text-2xl text-primary">{icon}</div>}
      </div>
    </div>
  )
}
