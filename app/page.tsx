'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, MessageCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TaskCompletionWidget, ProductivityScoreWidget, WeeklyFocusInsightsWidget, ProductivityTrendWidget } from '@/components/analytics-widgets'

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review Q1 report', priority: 'high', completed: false },
    { id: 2, title: 'Update project documentation', priority: 'medium', completed: false },
    { id: 3, title: 'Schedule team meeting', priority: 'low', completed: true },
  ])

  const [moodData] = useState([
    { day: 'Mon', mood: 7 },
    { day: 'Tue', mood: 8 },
    { day: 'Wed', mood: 6 },
    { day: 'Thu', mood: 7 },
    { day: 'Fri', mood: 9 },
    { day: 'Sat', mood: 8 },
    { day: 'Sun', mood: 7 },
  ])

  const reminders = [
    { id: 1, time: '10:00 AM', title: 'Team standup meeting' },
    { id: 2, time: '2:30 PM', title: 'Client presentation prep' },
    { id: 3, time: '5:00 PM', title: 'Review pull requests' },
  ]

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content Container */}
      <div className="px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, shyam</h1>
          <p className="text-muted-foreground text-sm">Here's your personal dashboard for today</p>
        </div>

        {/* Analytics Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Your Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TaskCompletionWidget />
            <ProductivityScoreWidget />
          </div>
        </div>

        {/* Insights Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeeklyFocusInsightsWidget />
            <ProductivityTrendWidget />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Tasks - Spans 2 cols on desktop */}
          <Card className="lg:col-span-2 bg-card border-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Today's Tasks</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1 h-9">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors duration-200">
                    <Checkbox 
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="w-5 h-5"
                    />
                    <div className="flex-1">
                      <p className={task.completed ? 'line-through text-muted-foreground text-sm' : 'text-card-foreground text-sm'}>
                        {task.title}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                      task.priority === 'high' ? 'bg-destructive/20 text-destructive' :
                      task.priority === 'medium' ? 'bg-primary/20 text-primary' :
                      'bg-secondary text-muted-foreground'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Reminders */}
          <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Upcoming Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminders.map(reminder => (
                  <div key={reminder.id} className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      {reminder.time.split(':')[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">{reminder.time}</p>
                      <p className="text-sm font-medium text-card-foreground">{reminder.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mood Tracker */}
          <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Weekly Mood</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
                  <YAxis domain={[0, 10]} stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: `1px solid var(--border)`,
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: 'var(--foreground)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="var(--accent)" 
                    strokeWidth={2}
                    dot={{ fill: 'var(--accent)', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Memory of the Day */}
          <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Memory of the Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 border border-primary/20">
                <div className="text-center">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-sm text-muted-foreground">No photos yet</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Your memories will appear here</p>
            </CardContent>
          </Card>

          {/* AI Assistant Widget */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">AI Assistant</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <button className="w-full text-left text-xs p-3 rounded-lg bg-card/40 hover:bg-card/60 transition-colors duration-200 text-card-foreground">
                  "Suggest my schedule for tomorrow"
                </button>
                <button className="w-full text-left text-xs p-3 rounded-lg bg-card/40 hover:bg-card/60 transition-colors duration-200 text-card-foreground">
                  "What should I focus on today"
                </button>
                <button className="w-full text-left text-xs p-3 rounded-lg bg-card/40 hover:bg-card/60 transition-colors duration-200 text-card-foreground">
                  "Summarize my diary entries"
                </button>
              </div>
              <Input 
                placeholder="Ask me anything..." 
                className="h-9 bg-card/50 border-border text-card-foreground placeholder:text-muted-foreground text-sm"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
