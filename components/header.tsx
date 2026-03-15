'use client'

import { Search, Bell, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCallback } from 'react'

export function Header() {
  const handleAddClick = useCallback(() => {
    // Add quick action handler
    console.log('Quick add clicked')
  }, [])

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-background/95 backdrop-blur-sm border-b border-border flex items-center justify-between px-8 z-40">
      {/* Search Bar - Left Side */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search anything..."
            className="pl-10 pr-4 h-10 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-secondary/50 rounded-lg transition-colors duration-200 text-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
        </button>

        {/* Add Button */}
        <Button
          onClick={handleAddClick}
          className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-3 rounded-lg gap-2 transition-colors duration-200"
          size="sm"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </Button>

        {/* User Avatar */}
        <button className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm hover:ring-2 hover:ring-primary/50 transition-all duration-200">
          JD
        </button>
      </div>
    </header>
  )
}
