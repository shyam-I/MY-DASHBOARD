'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Folder, File, Lock, Upload, FolderPlus, Download, Trash2, Eye, EyeOff } from 'lucide-react'

export default function LockerPage() {
  const [folders, setFolders] = useState([
    { id: 1, name: 'Important Documents', count: 3, icon: Folder, color: 'bg-blue-500' },
    { id: 2, name: 'Financial Records', count: 2, icon: Folder, color: 'bg-green-500' },
    { id: 3, name: 'Personal', count: 5, icon: Folder, color: 'bg-purple-500' },
  ])

  const [files] = useState([
    {
      id: 1,
      name: 'Passport.pdf',
      type: 'pdf',
      size: '2.4 MB',
      date: '2024-03-10',
      folder: 'Personal',
      encrypted: true,
    },
    {
      id: 2,
      name: 'Tax Returns 2023.pdf',
      type: 'pdf',
      size: '1.8 MB',
      date: '2024-02-28',
      folder: 'Financial Records',
      encrypted: true,
    },
    {
      id: 3,
      name: 'Insurance Policy.pdf',
      type: 'pdf',
      size: '3.2 MB',
      date: '2024-01-15',
      folder: 'Important Documents',
      encrypted: true,
    },
    {
      id: 4,
      name: 'Birth Certificate.pdf',
      type: 'pdf',
      size: '1.1 MB',
      date: '2023-12-20',
      folder: 'Personal',
      encrypted: true,
    },
    {
      id: 5,
      name: 'Property Deed.pdf',
      type: 'pdf',
      size: '2.7 MB',
      date: '2023-11-05',
      folder: 'Important Documents',
      encrypted: true,
    },
  ])

  const [selectedFolder, setSelectedFolder] = useState<number | null>(null)
  const [showEncryption, setShowEncryption] = useState(true)

  const currentFiles = selectedFolder
    ? files.filter(f => f.folder === folders.find(fo => fo.id === selectedFolder)?.name)
    : files

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Lock className="w-8 h-8 text-accent" />
          Secure Locker
        </h1>
        <p className="text-muted-foreground">Store and protect your important documents securely</p>
      </div>

      {/* Header Actions */}
      <div className="flex gap-3 mb-8">
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Upload File
        </Button>
        <Button variant="outline" className="gap-2">
          <FolderPlus className="w-4 h-4" />
          New Folder
        </Button>
        <div className="ml-auto">
          <button
            onClick={() => setShowEncryption(!showEncryption)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            title="Toggle encryption status display"
          >
            {showEncryption ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Folders */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border sticky top-24">
            <CardHeader>
              <CardTitle>Folders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedFolder(null)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedFolder === null
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary text-card-foreground'
                  }`}
                >
                  <span className="text-sm font-medium">All Files</span>
                </button>
                {folders.map(folder => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-2 ${
                      selectedFolder === folder.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary text-card-foreground'
                    }`}
                  >
                    <Folder className="w-4 h-4" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{folder.name}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {folder.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Files */}
        <div className="lg:col-span-3">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>
                {selectedFolder
                  ? folders.find(f => f.id === selectedFolder)?.name
                  : 'All Files'} ({currentFiles.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentFiles.length > 0 ? (
                <div className="space-y-3">
                  {currentFiles.map(file => (
                    <div
                      key={file.id}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors group"
                    >
                      {/* File Icon */}
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <File className="w-6 h-6 text-white" />
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-card-foreground truncate">{file.name}</h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>{file.type.toUpperCase()}</span>
                          <span>•</span>
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>{new Date(file.date).toLocaleDateString()}</span>
                          {showEncryption && file.encrypted && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-accent">
                                <Lock className="w-3 h-3" />
                                Encrypted
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-destructive/10 rounded transition-colors text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                  <p className="text-muted-foreground">No files in this folder</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Info */}
          <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/30 mt-6">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Lock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Military-Grade Encryption</h3>
                  <p className="text-sm text-muted-foreground">
                    Your documents are protected with AES-256 encryption. Only you can access your files.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
