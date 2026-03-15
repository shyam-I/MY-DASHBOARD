'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Calendar } from 'lucide-react'

export default function TasksPage() {
  const [tasks, setTasks] = useState({
    today: [
      { id: 1, title: 'Complete project proposal', priority: 'high', dueDate: '2024-03-15' },
      { id: 2, title: 'Review design mockups', priority: 'high', dueDate: '2024-03-15' },
      { id: 3, title: 'Send client email', priority: 'medium', dueDate: '2024-03-15' },
    ],
    upcoming: [
      { id: 4, title: 'Prepare presentation', priority: 'medium', dueDate: '2024-03-18' },
      { id: 5, title: 'Team retrospective', priority: 'low', dueDate: '2024-03-20' },
      { id: 6, title: 'Code review cycle', priority: 'medium', dueDate: '2024-03-22' },
    ],
    completed: [
      { id: 7, title: 'Update documentation', priority: 'low', dueDate: '2024-03-14' },
      { id: 8, title: 'Fix login bug', priority: 'high', dueDate: '2024-03-13' },
    ],
    overdue: [
      { id: 9, title: 'Submit expense report', priority: 'high', dueDate: '2024-03-10' },
    ],
  })

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [activeColumn, setActiveColumn] = useState<'today' | 'upcoming' | 'completed' | 'overdue' | null>(null)

  const addTask = (column: 'today' | 'upcoming' | 'completed' | 'overdue') => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Math.max(...Object.values(tasks).flat().map(t => t.id), 0) + 1,
        title: newTaskTitle,
        priority: 'medium' as const,
        dueDate: new Date().toISOString().split('T')[0],
      }
      setTasks(prev => ({
        ...prev,
        [column]: [...prev[column], newTask],
      }))
      setNewTaskTitle('')
      setActiveColumn(null)
    }
  }

  const removeTask = (column: 'today' | 'upcoming' | 'completed' | 'overdue', id: number) => {
    setTasks(prev => ({
      ...prev,
      [column]: prev[column].filter(t => t.id !== id),
    }))
  }

  const columns = [
    { key: 'today' as const, title: 'Today', color: 'from-blue-500 to-blue-600' },
    { key: 'upcoming' as const, title: 'Upcoming', color: 'from-purple-500 to-purple-600' },
    { key: 'completed' as const, title: 'Completed', color: 'from-green-500 to-green-600' },
    { key: 'overdue' as const, title: 'Overdue', color: 'from-red-500 to-red-600' },
  ]

  const TaskCard = ({ task, column }: { task: any; column: string }) => (
    <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-medium text-card-foreground flex-1">{task.title}</h4>
        <button
          onClick={() => removeTask(column as any, task.id)}
          className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center justify-between text-xs">
        <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>
          {task.priority}
        </Badge>
        <span className="text-muted-foreground flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  )

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Task Board</h1>
        <p className="text-muted-foreground">Organize your work with our Kanban board</p>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(column => (
          <div key={column.key}>
            <div className={`mb-4 p-3 rounded-lg bg-gradient-to-r ${column.color}`}>
              <h2 className="text-white font-semibold text-sm">
                {column.title} ({tasks[column.key].length})
              </h2>
            </div>

            <div className="space-y-3 min-h-96">
              {tasks[column.key].map(task => (
                <TaskCard key={task.id} task={task} column={column.key} />
              ))}

              {activeColumn === column.key ? (
                <div className="p-3 border-2 border-dashed border-border rounded-lg">
                  <Input
                    autoFocus
                    placeholder="Enter task title..."
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') addTask(column.key)
                      if (e.key === 'Escape') {
                        setActiveColumn(null)
                        setNewTaskTitle('')
                      }
                    }}
                    className="mb-2 bg-background"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => addTask(column.key)}
                      className="flex-1"
                    >
                      Add
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setActiveColumn(null)
                        setNewTaskTitle('')
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setActiveColumn(column.key)}
                  className="w-full p-3 border-2 border-dashed border-border rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add task
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
