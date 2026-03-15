'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Upload, Folder, Calendar, Search, Heart, Trash2, Download } from 'lucide-react'

export default function PhotosPage() {
  const [albums, setAlbums] = useState([
    { id: 1, name: 'Travel 2024', count: 24, thumbnail: 'bg-gradient-to-br from-blue-400 to-blue-600' },
    { id: 2, name: 'Family Moments', count: 18, thumbnail: 'bg-gradient-to-br from-pink-400 to-pink-600' },
    { id: 3, name: 'Work Events', count: 12, thumbnail: 'bg-gradient-to-br from-purple-400 to-purple-600' },
    { id: 4, name: 'Nature', count: 31, thumbnail: 'bg-gradient-to-br from-green-400 to-green-600' },
  ])

  const [memories] = useState([
    {
      id: 1,
      date: '2024-03-10',
      title: 'Beach Day',
      image: 'bg-gradient-to-br from-cyan-400 to-blue-500',
      liked: true,
    },
    {
      id: 2,
      date: '2024-03-08',
      title: 'Coffee with Sarah',
      image: 'bg-gradient-to-br from-amber-400 to-orange-500',
      liked: false,
    },
    {
      id: 3,
      date: '2024-03-05',
      title: 'Mountain Hike',
      image: 'bg-gradient-to-br from-emerald-400 to-teal-500',
      liked: true,
    },
    {
      id: 4,
      date: '2024-03-02',
      title: 'Team Lunch',
      image: 'bg-gradient-to-br from-red-400 to-pink-500',
      liked: false,
    },
    {
      id: 5,
      date: '2024-02-28',
      title: 'Concert',
      image: 'bg-gradient-to-br from-purple-400 to-indigo-500',
      liked: true,
    },
    {
      id: 6,
      date: '2024-02-25',
      title: 'Sunset',
      image: 'bg-gradient-to-br from-orange-400 to-rose-500',
      liked: false,
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [likedOnly, setLikedOnly] = useState(false)

  const filteredMemories = memories.filter(memory => {
    const matchesSearch =
      memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.date.includes(searchQuery)
    const matchesLiked = !likedOnly || memory.liked
    return matchesSearch && matchesLiked
  })

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Photo Memories</h1>
        <p className="text-muted-foreground">Organize and preserve your precious moments</p>
      </div>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-secondary">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        {/* Timeline View */}
        <TabsContent value="timeline" className="mt-6">
          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  Timeline
                </span>
                <Button className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title or date..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10 bg-secondary border-border"
                  />
                </div>
                <Button
                  variant={likedOnly ? 'default' : 'outline'}
                  onClick={() => setLikedOnly(!likedOnly)}
                  className="gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Liked
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMemories.length > 0 ? (
                  filteredMemories.map(memory => (
                    <div
                      key={memory.id}
                      className="group rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-lg"
                    >
                      <div className={`${memory.image} w-full h-40 flex items-center justify-center relative`}>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                          <button className="p-2 bg-primary hover:bg-primary/90 rounded-lg text-primary-foreground">
                            <Heart className="w-5 h-5" fill={memory.liked ? 'currentColor' : 'none'} />
                          </button>
                          <button className="p-2 bg-secondary hover:bg-secondary/90 rounded-lg text-foreground">
                            <Download className="w-5 h-5" />
                          </button>
                          <button className="p-2 bg-destructive hover:bg-destructive/90 rounded-lg text-destructive-foreground">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4 bg-card">
                        <h3 className="font-medium text-card-foreground mb-1">{memory.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(memory.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-muted-foreground">No memories found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Albums View */}
        <TabsContent value="albums" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-full h-40 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors mb-4">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground">New Album</h3>
                <p className="text-xs text-muted-foreground">Create a new album</p>
              </CardContent>
            </Card>

            {albums.map(album => (
              <Card key={album.id} className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className={`${album.thumbnail} w-full h-40 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow`}>
                    <Folder className="w-12 h-12 text-white/60" />
                  </div>
                  <h3 className="font-semibold text-card-foreground mb-1">{album.name}</h3>
                  <p className="text-xs text-muted-foreground">{album.count} photos</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Favorites View */}
        <TabsContent value="favorites" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-destructive fill-destructive" />
                Favorite Memories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {memories
                  .filter(m => m.liked)
                  .map(memory => (
                    <div
                      key={memory.id}
                      className="group rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-lg"
                    >
                      <div className={`${memory.image} w-full h-40 flex items-center justify-center relative`}>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                          <button className="p-2 bg-secondary hover:bg-secondary/90 rounded-lg text-foreground">
                            <Download className="w-5 h-5" />
                          </button>
                          <button className="p-2 bg-destructive hover:bg-destructive/90 rounded-lg text-destructive-foreground">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4 bg-card">
                        <h3 className="font-medium text-card-foreground mb-1">{memory.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(memory.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
