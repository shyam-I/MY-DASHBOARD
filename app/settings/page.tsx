'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Bell, Shield, Users, Palette, Database, LogOut } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    timezone: 'UTC-5 (Eastern Time)',
    notifications: {
      reminders: true,
      taskUpdates: true,
      aiSuggestions: true,
      dailyDigest: false,
      emailNotifications: true,
    },
    privacy: {
      profilePublic: false,
      shareAnalytics: true,
      backupData: true,
    },
    theme: 'dark',
  })

  const toggleNotification = (key: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: !prev.notifications[key] },
    }))
  }

  const togglePrivacy = (key: keyof typeof settings.privacy) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: !prev.privacy[key] },
    }))
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4 bg-secondary">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div>
                <label className="text-sm font-medium text-foreground mb-4 block">Profile Picture</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                    JD
                  </div>
                  <Button variant="outline">Change Avatar</Button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
                  <Input
                    value={settings.fullName}
                    onChange={e => setSettings({ ...settings, fullName: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={settings.email}
                    onChange={e => setSettings({ ...settings, email: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Phone</label>
                  <Input
                    value={settings.phone}
                    onChange={e => setSettings({ ...settings, phone: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Timezone</label>
                  <Input
                    value={settings.timezone}
                    className="bg-secondary border-border"
                    disabled
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-primary">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-accent" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: 'reminders' as const,
                  label: 'Reminder Notifications',
                  description: 'Get notified when a reminder is due',
                },
                {
                  key: 'taskUpdates' as const,
                  label: 'Task Updates',
                  description: 'Receive notifications for task changes',
                },
                {
                  key: 'aiSuggestions' as const,
                  label: 'AI Suggestions',
                  description: 'Get personalized AI recommendations',
                },
                {
                  key: 'dailyDigest' as const,
                  label: 'Daily Digest',
                  description: 'Receive a summary of your day each evening',
                },
                {
                  key: 'emailNotifications' as const,
                  label: 'Email Notifications',
                  description: 'Receive notifications via email',
                },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                  <div>
                    <p className="font-medium text-card-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={settings.notifications[item.key]}
                    onCheckedChange={() => toggleNotification(item.key)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: 'profilePublic' as const,
                  label: 'Public Profile',
                  description: 'Allow others to see your profile',
                },
                {
                  key: 'shareAnalytics' as const,
                  label: 'Share Analytics',
                  description: 'Help us improve by sharing usage data',
                },
                {
                  key: 'backupData' as const,
                  label: 'Automatic Backup',
                  description: 'Automatically backup your data',
                },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                  <div>
                    <p className="font-medium text-card-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={settings.privacy[item.key]}
                    onCheckedChange={() => togglePrivacy(item.key)}
                  />
                </div>
              ))}

              <div className="pt-4 border-t border-border">
                <h3 className="font-medium text-card-foreground mb-4">Two-Factor Authentication</h3>
                <Button variant="outline" className="gap-2">
                  <Shield className="w-4 h-4" />
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About */}
        <TabsContent value="about" className="mt-6">
          <div className="space-y-4">
            {/* App Info */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>About LifeHub</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Version</label>
                  <p className="text-sm text-muted-foreground">1.0.0</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Last Updated</label>
                  <p className="text-sm text-muted-foreground">March 15, 2024</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Storage Used</label>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">3.5 GB of 10 GB used</p>
                </div>
              </CardContent>
            </Card>

            {/* Support & Legal */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Support & Legal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Help Center
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Policy
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Terms of Service
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="bg-destructive/5 border border-destructive/30">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  <Database className="w-4 h-4 mr-2" />
                  Export My Data
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out All Devices
                </Button>
                <Button className="w-full justify-start bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
