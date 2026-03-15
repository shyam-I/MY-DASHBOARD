'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, Zap, Target } from 'lucide-react'

// Task Completion Rate Widget
export function TaskCompletionWidget() {
  const completionData = [
    { day: 'Mon', completed: 8, total: 10 },
    { day: 'Tue', completed: 6, total: 9 },
    { day: 'Wed', completed: 9, total: 10 },
    { day: 'Thu', completed: 7, total: 8 },
    { day: 'Fri', completed: 10, total: 10 },
    { day: 'Sat', completed: 5, total: 6 },
    { day: 'Sun', completed: 4, total: 5 },
  ]

  const weeklyTotal = completionData.reduce((acc, d) => acc + d.completed, 0)
  const weeklyPossible = completionData.reduce((acc, d) => acc + d.total, 0)
  const completionRate = Math.round((weeklyTotal / weeklyPossible) * 100)

  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Task Completion Rate
          </CardTitle>
          <span className="text-2xl font-bold text-primary">{completionRate}%</span>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={completionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
            <YAxis stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--card)', 
                border: `1px solid var(--border)`,
                borderRadius: '8px'
              }}
              labelStyle={{ color: 'var(--foreground)' }}
              formatter={(value) => value}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="completed" stackId="a" fill="#f97316" name="Completed" radius={[8, 8, 0, 0]} />
            <Bar dataKey="total" stackId="a" fill="var(--border)" name="Total" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-card-foreground">{weeklyTotal}</span> of <span className="font-semibold text-card-foreground">{weeklyPossible}</span> tasks completed this week
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// Productivity Score Widget
export function ProductivityScoreWidget() {
  const productivityData = [
    { category: 'Focus', score: 85 },
    { category: 'Completion', score: 78 },
    { category: 'Efficiency', score: 92 },
    { category: 'Consistency', score: 88 },
    { category: 'Balance', score: 75 },
  ]

  const avgScore = Math.round(productivityData.reduce((acc, d) => acc + d.score, 0) / productivityData.length)

  const scoreColors = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']

  return (
    <Card className="bg-card border-border hover:border-accent/50 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            Productivity Score
          </CardTitle>
          <div className="text-right">
            <p className="text-3xl font-bold text-accent">{avgScore}</p>
            <p className="text-xs text-muted-foreground">out of 100</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={productivityData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis type="number" domain={[0, 100]} stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
            <YAxis dataKey="category" type="category" stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--card)', 
                border: `1px solid var(--border)`,
                borderRadius: '8px'
              }}
              labelStyle={{ color: 'var(--foreground)' }}
            />
            <Bar dataKey="score" fill="#06b6d4" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 pt-4 border-t border-border">
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-accent to-primary h-full transition-all"
              style={{ width: `${avgScore}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Great progress! Keep up the momentum</p>
        </div>
      </CardContent>
    </Card>
  )
}

// Weekly Focus Insights Widget
export function WeeklyFocusInsightsWidget() {
  const focusData = [
    { name: 'Development', hours: 18, percentage: 35 },
    { name: 'Meetings', hours: 12, percentage: 23 },
    { name: 'Planning', hours: 10, percentage: 19 },
    { name: 'Learning', hours: 8, percentage: 15 },
    { name: 'Admin', hours: 4, percentage: 8 },
  ]

  const colors = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']
  const totalHours = focusData.reduce((acc, d) => acc + d.hours, 0)

  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Weekly Focus Insights
          </CardTitle>
          <span className="text-sm text-muted-foreground">{totalHours}h total</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={focusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="hours"
              >
                {focusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)', 
                  border: `1px solid var(--border)`,
                  borderRadius: '8px'
                }}
                labelStyle={{ color: 'var(--foreground)' }}
                formatter={(value) => `${value}h`}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend and Stats */}
          <div className="flex flex-col justify-center space-y-3">
            {focusData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index] }}
                  />
                  <span className="text-sm font-medium text-card-foreground">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{item.hours}h</p>
                  <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Insight */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
            <p className="text-xs font-semibold text-primary mb-1">Top Insight</p>
            <p className="text-sm text-card-foreground">
              You spent <span className="font-semibold">35%</span> of your time on Development this week. Consider scheduling more focus blocks for uninterrupted work.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Productivity Trend Widget (Line Chart)
export function ProductivityTrendWidget() {
  const trendData = [
    { week: 'Week 1', productivity: 72 },
    { week: 'Week 2', productivity: 76 },
    { week: 'Week 3', productivity: 74 },
    { week: 'Week 4', productivity: 82 },
    { week: 'Week 5', productivity: 85 },
    { week: 'Week 6', productivity: 88 },
    { week: 'This Week', productivity: 87 },
  ]

  const currentScore = trendData[trendData.length - 1].productivity
  const previousScore = trendData[trendData.length - 2].productivity
  const trend = currentScore - previousScore

  return (
    <Card className="bg-card border-border hover:border-accent/50 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Productivity Trend</CardTitle>
          <div className={`flex items-center gap-1 text-sm font-semibold ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)} points
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="week" stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
            <YAxis domain={[0, 100]} stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
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
              dataKey="productivity" 
              stroke="var(--primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--primary)', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Your productivity score has <span className="font-semibold text-card-foreground">increased by {trend} points</span> since last week
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
