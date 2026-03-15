'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { ChevronLeft, ChevronRight, Save } from 'lucide-react'

export default function DiaryPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [entries, setEntries] = useState({
    '2024-03-15': 'Had a productive day. Finished the project proposal ahead of schedule. Great feedback from the team during the standup.',
    '2024-03-14': 'Started working on new feature. Looking forward to seeing how users respond to the changes.',
    '2024-03-13': 'Team building event was fun. Got to know the new team members better.',
  })

  const [currentEntry, setCurrentEntry] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const dateKey = selectedDate.toISOString().split('T')[0]

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setIsEditing(false)
  }

  const handleSaveEntry = () => {
    setEntries(prev => ({
      ...prev,
      [dateKey]: currentEntry,
    }))
    setIsEditing(false)
  }

  const handleDateChange = (offset: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + offset)
    setSelectedDate(newDate)
    setIsEditing(false)
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Personal Diary</h1>
        <p className="text-muted-foreground">Capture your thoughts and memories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border sticky top-24">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => handleDateChange(-1)}
                  className="p-1 hover:bg-secondary rounded transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium">
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={() => handleDateChange(1)}
                  className="p-1 hover:bg-secondary rounded transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border border-border"
              />
              <div className="mt-4 p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground font-medium">ENTRIES</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {Object.keys(entries).length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Entry Editor */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    {entries[dateKey] ? 'Last updated: today' : 'No entry yet'}
                  </p>
                </div>
                {currentEntry && (
                  <Button
                    onClick={handleSaveEntry}
                    className="gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!isEditing && entries[dateKey] ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-secondary/30 border border-border min-h-96">
                    <p className="text-card-foreground whitespace-pre-wrap">
                      {entries[dateKey]}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setCurrentEntry(entries[dateKey])
                      setIsEditing(true)
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Edit Entry
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Write your thoughts here... How are you feeling today? What happened? What are you grateful for?"
                    value={isEditing ? currentEntry : entries[dateKey] || ''}
                    onChange={e => {
                      if (!isEditing) {
                        setIsEditing(true)
                        setCurrentEntry(e.target.value)
                      } else {
                        setCurrentEntry(e.target.value)
                      }
                    }}
                    className="min-h-96 resize-none bg-secondary/20 border-border text-card-foreground placeholder:text-muted-foreground"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveEntry}
                      className="flex-1"
                      disabled={!currentEntry.trim()}
                    >
                      Save Entry
                    </Button>
                    {isEditing && (
                      <Button
                        onClick={() => {
                          setIsEditing(false)
                          setCurrentEntry('')
                        }}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Entries */}
          <Card className="bg-card border-border mt-6">
            <CardHeader>
              <CardTitle>Recent Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(entries)
                  .slice(-5)
                  .reverse()
                  .map(([date, content]) => (
                    <div
                      key={date}
                      onClick={() => handleDateSelect(new Date(date))}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        dateKey === date
                          ? 'bg-primary/10 border border-primary'
                          : 'bg-secondary/20 border border-border hover:border-primary/50'
                      }`}
                    >
                      <p className="text-xs text-muted-foreground font-medium mb-1">
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-card-foreground line-clamp-2">
                        {content}
                      </p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
