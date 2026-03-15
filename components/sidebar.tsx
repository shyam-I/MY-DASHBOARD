'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, CheckSquare, Clock, BookOpen, Image, Lock, MessageCircle, Settings, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { label: 'Dashboard', href: '/', icon: LayoutGrid },
    { label: 'Tasks', href: '/tasks', icon: CheckSquare },
    { label: 'Reminders', href: '/reminders', icon: Clock },
    { label: 'Diary', href: '/diary', icon: BookOpen },
    { label: 'Trading Journal', href: '/trading', icon: TrendingUp },
    { label: 'Photos', href: '/photos', icon: Image },
    { label: 'Secure Locker', href: '/locker', icon: Lock },
    { label: 'AI Assistant', href: '/ai', icon: MessageCircle },
    { label: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col py-6 px-4 fixed left-0 top-0">
      {/* Logo */}
      <div className="mb-8 px-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <div className="text-white font-bold text-sm">PD</div>
          </div>
          <span className="font-bold text-lg text-sidebar-foreground">LifeHub</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-secondary'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="pt-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 px-3 py-3 rounded-lg bg-secondary">
          <div className="w-8 h-8 rounded-full bg-primary"></div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-sidebar-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
