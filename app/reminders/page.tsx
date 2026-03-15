'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Clock, AlertCircle, CheckCircle, Trash2, Edit2 } from 'lucide-react'

export default function RemindersPage() {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Team standup meeting',
      time: '10:00 AM',
      date: '2024-03-15',
      category: 'Work',
      completed: false,
      priority: 'high',
    },
    {
      id: 2,
      title: 'Lunch with Sarah',
      time: '12:30 PM',
      date: '2024-03-15',
      category: 'Personal',
      completed: false,
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Project deadline',
      time: '5:00 PM',
      date: '2024-03-15',
      category: 'Work',
      completed: false,
      priority: 'high',
    },
    {
      id: 4,
      title: 'Call mom',
      time: '7:00 PM',
      date: '2024-03-15',
      category: 'Personal',
      completed: true,
      priority: 'medium',
    },
  ])

  const [newReminder, setNewReminder] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const addReminder = () => {
    if (newReminder.trim()) {
      setReminders([
        ...reminders,
        {
          id: Math.max(...reminders.map(r => r.id), 0) + 1,
          title: newReminder,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: new Date().toISOString().split('T')[0],
          category: 'Personal',
          completed: false,
          priority: 'medium',
        },
      ])
      setNewReminder('')
      setShowAddForm(false)
    }
  }

  const toggleReminder = (id: number) => {
    setReminders(reminders.map(r => (r.id === id ? { ...r, completed: !r.completed } : r)))
  }

  const removeReminder = (id: number) => {
    setReminders(reminders.filter(r => r.id !== id))
  }

  const stats = {
    total: reminders.length,
    completed: reminders.filter(r => r.completed).length,
    pending: reminders.filter(r => !r.completed).length,
    today: reminders.filter(r => r.date === new Date().toISOString().split('T')[0]).length,
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Reminders</h1>
        <p className="text-muted-foreground">Stay on top of your important tasks</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: stats.total, icon: Clock, color: 'from-blue-500 to-blue-600' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'from-green-500 to-green-600' },
          { label: 'Pending', value: stats.pending, icon: AlertCircle, color: 'from-orange-500 to-orange-600' },
          { label: 'Today', value: stats.today, icon: Clock, color: 'from-purple-500 to-purple-600' },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="bg-card border-border">
              <CardContent className="p-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Timeline */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reminder Timeline</CardTitle>
            <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
              <Plus className="w-4 h-4" />
              New Reminder
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="p-4 rounded-lg bg-secondary/30 border border-border mb-4">
              <div className="flex gap-2 mb-2">
                <Input
                  autoFocus
                  placeholder="What do you want to be reminded about?"
                  value={newReminder}
                  onChange={e => setNewReminder(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') addReminder()
                    if (e.key === 'Escape') {
                      setShowAddForm(false)
                      setNewReminder('')
                    }
                  }}
                  className="bg-background"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addReminder} className="flex-1">
                  Add
                </Button>
                <Button
                  onClick={() => {
                    setShowAddForm(false)
                    setNewReminder('')
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {reminders.length > 0 ? (
              reminders.map(reminder => (
                <div
                  key={reminder.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                    reminder.completed
                      ? 'bg-secondary/50 border-border opacity-60'
                      : 'bg-card border-border hover:border-primary/50'
                  }`}
                >
                  {/* Time Badge */}
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                    reminder.priority === 'high'
                      ? 'bg-destructive/20 text-destructive'
                      : 'bg-primary/20 text-primary'
                  }`}>
                    {reminder.time}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className={`font-medium ${reminder.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>
                      {reminder.title}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {reminder.category}
                      </Badge>
                      <Badge
                        variant={reminder.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {reminder.priority}
                      </Badge>
                    </div>
                  </div>

                  {/* Checkbox & Actions */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={reminder.completed}
                      onChange={() => toggleReminder(reminder.id)}
                      className="w-5 h-5 rounded cursor-pointer"
                    />
                    <button
                      onClick={() => removeReminder(reminder.id)}
                      className="p-2 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-muted-foreground">No reminders yet. Add one to get started!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
