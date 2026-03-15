'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, Sparkles, Loader2, Copy, Trash2 } from 'lucide-react'

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant' as const,
      content: 'Hello! I\'m your AI Assistant. I can help you organize your life, plan your schedule, analyze your mood patterns, and much more. What would you like help with today?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const suggestedPrompts = [
    'Suggest my schedule for tomorrow',
    'What should I focus on today',
    'Summarize my diary entries',
    'Analyze my mood trends',
    'Help me prioritize tasks',
    'Plan my week',
  ]

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string = '') => {
    const messageText = text || input
    if (!messageText.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: 'user' as const,
      content: messageText,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        schedule: 'Based on your tasks and patterns, here\'s a suggested schedule:\n\n9:00 AM - Review emails and plan\n10:00 AM - Team standup\n10:30 AM - Deep work session\n12:30 PM - Lunch break\n1:30 PM - Client meetings\n3:00 PM - Code review\n4:00 PM - Wrap up and plan tomorrow',
        focus: 'Based on your priority tasks, I suggest focusing on:\n1. Complete project proposal (High priority, due today)\n2. Review design mockups (High priority, due today)\n3. Schedule team meeting (Low priority, can wait)\n\nI recommend starting with the proposal as it will take the most mental energy.',
        diary: 'Here\'s a summary of your recent diary entries:\n\nYou\'ve had a productive week with positive energy. Key themes: professional growth, team collaboration, and personal wellness. Your mood has been trending upward (average: 7.4/10).',
        mood: 'Your mood analysis shows:\n- Average mood: 7.4/10 over the last 7 days\n- Trend: Upward (improving)\n- Best day: Friday (9/10)\n- Correlation: Better mood on days with exercise and social interaction',
        prioritize: 'To prioritize your tasks effectively:\n\n1. Urgent & Important: Complete project proposal, Review design mockups\n2. Important, Not Urgent: Prepare presentation, Code review\n3. Urgent, Not Important: Send client email\n4. Neither: Team retrospective\n\nRecommendation: Focus on quadrant 1 first.',
        week: 'Here\'s your suggested weekly plan:\n\nMonday: Planning & deep work\nTuesday: Meetings & collaboration\nWednesday: Execution & reviews\nThursday: Adjustments & optimization\nFriday: Reflection & planning\nWeekend: Rest & personal time',
      }

      let response = 'I understand. Let me help you with that. '
      const lowerText = messageText.toLowerCase()
      if (lowerText.includes('schedule')) response += responses.schedule
      else if (lowerText.includes('focus')) response += responses.focus
      else if (lowerText.includes('diary') || lowerText.includes('summarize')) response += responses.diary
      else if (lowerText.includes('mood')) response += responses.mood
      else if (lowerText.includes('prioritize') || lowerText.includes('priority')) response += responses.prioritize
      else if (lowerText.includes('week')) response += responses.week
      else response += 'I\'m here to help! Try asking me about your schedule, tasks, mood trends, or anything else related to your personal productivity.'

      const assistantMessage = {
        id: messages.length + 2,
        role: 'assistant' as const,
        content: response,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const clearHistory = () => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: 'Chat history cleared. How can I help you today?',
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="p-8 max-w-4xl mx-auto h-[calc(100vh-112px)] flex flex-col">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-accent" />
          AI Assistant
        </h1>
        <p className="text-muted-foreground">
          Your personal AI-powered productivity companion
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-card border border-border rounded-lg overflow-hidden">
        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md lg:max-w-xl px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-secondary text-card-foreground rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <p className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    {message.role === 'assistant' && (
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        className="p-1 hover:bg-primary/20 rounded transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-card-foreground px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Suggested Prompts - shown when no messages or initial state */}
        {messages.length === 1 && (
          <div className="px-6 py-4 border-t border-border">
            <p className="text-xs font-medium text-muted-foreground mb-3">SUGGESTED PROMPTS</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-left text-sm p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-card-foreground transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-border p-4 bg-background space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything about your life, tasks, or schedule..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              className="flex-1 bg-card border-border"
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
            <Button
              onClick={clearHistory}
              variant="outline"
              size="icon"
              title="Clear chat history"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            This is a demo. The AI responses are simulated. Try asking about "schedule", "focus", "diary", "mood", "prioritize", or "week".
          </p>
        </div>
      </div>
    </div>
  )
}
