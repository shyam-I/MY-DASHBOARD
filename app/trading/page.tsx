'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Plus, Search, TrendingUp, TrendingDown, DollarSign, Target, PieChart as PieChartIcon } from 'lucide-react'

interface Trade {
  id: string
  date: string
  asset: string
  tradeType: 'Buy' | 'Sell'
  entryPrice: number
  exitPrice: number
  stopLoss: number
  targetPrice: number
  positionSize: number
  riskRewardRatio: number
  result: 'Win' | 'Loss' | 'Breakeven'
  emotion: 'Confident' | 'Fear' | 'FOMO' | 'Disciplined'
  notes: string
}

export default function TradingJournal() {
  const [trades, setTrades] = useState<Trade[]>([
    {
      id: '1',
      date: '2024-03-10',
      asset: 'AAPL',
      tradeType: 'Buy',
      entryPrice: 170.5,
      exitPrice: 175.2,
      stopLoss: 168.0,
      targetPrice: 180.0,
      positionSize: 100,
      riskRewardRatio: 1.5,
      result: 'Win',
      emotion: 'Confident',
      notes: 'Strong support bounce'
    },
    {
      id: '2',
      date: '2024-03-09',
      asset: 'MSFT',
      tradeType: 'Sell',
      entryPrice: 420.3,
      exitPrice: 418.5,
      stopLoss: 425.0,
      targetPrice: 410.0,
      positionSize: 50,
      riskRewardRatio: 2.0,
      result: 'Win',
      emotion: 'Disciplined',
      notes: 'Resistance rejection'
    },
    {
      id: '3',
      date: '2024-03-08',
      asset: 'TSLA',
      tradeType: 'Buy',
      entryPrice: 195.2,
      exitPrice: 193.8,
      stopLoss: 190.0,
      targetPrice: 205.0,
      positionSize: 75,
      riskRewardRatio: 1.8,
      result: 'Loss',
      emotion: 'FOMO',
      notes: 'Premature entry'
    },
  ])

  const [formData, setFormData] = useState({
    date: '',
    asset: '',
    tradeType: 'Buy' as 'Buy' | 'Sell',
    entryPrice: '',
    exitPrice: '',
    stopLoss: '',
    targetPrice: '',
    positionSize: '',
    emotion: 'Confident' as 'Confident' | 'Fear' | 'FOMO' | 'Disciplined',
    notes: '',
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [assetFilter, setAssetFilter] = useState('')
  const [resultFilter, setResultFilter] = useState<'All' | 'Win' | 'Loss' | 'Breakeven'>('All')

  // Calculate analytics
  const totalTrades = trades.length
  const wins = trades.filter(t => t.result === 'Win').length
  const losses = trades.filter(t => t.result === 'Loss').length
  const winRate = totalTrades > 0 ? Math.round((wins / totalTrades) * 100) : 0
  
  const totalProfit = trades.reduce((sum, trade) => {
    const profit = (trade.exitPrice - trade.entryPrice) * trade.positionSize
    return sum + profit
  }, 0)

  const avgRiskReward = totalTrades > 0 
    ? (trades.reduce((sum, t) => sum + t.riskRewardRatio, 0) / totalTrades).toFixed(2)
    : '0.00'

  // Prepare data for charts
  const profitCurveData = trades.map((trade, idx) => {
    const cumulativeProfit = trades.slice(0, idx + 1).reduce((sum, t) => {
      return sum + ((t.exitPrice - t.entryPrice) * t.positionSize)
    }, 0)
    return {
      name: `Trade ${idx + 1}`,
      profit: cumulativeProfit
    }
  })

  const emotionData = [
    { name: 'Confident', value: trades.filter(t => t.emotion === 'Confident').length },
    { name: 'Disciplined', value: trades.filter(t => t.emotion === 'Disciplined').length },
    { name: 'Fear', value: trades.filter(t => t.emotion === 'Fear').length },
    { name: 'FOMO', value: trades.filter(t => t.emotion === 'FOMO').length },
  ]

  const riskRewardData = trades.map((t, idx) => ({
    name: `${t.asset} ${idx + 1}`,
    riskReward: parseFloat(t.riskRewardRatio.toFixed(2)),
    winRate: t.result === 'Win' ? 100 : 0
  }))

  // Filter trades
  const filteredTrades = trades.filter(trade => {
    const matchesSearch = trade.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trade.notes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAsset = assetFilter === '' || trade.asset === assetFilter
    const matchesResult = resultFilter === 'All' || trade.result === resultFilter
    return matchesSearch && matchesAsset && matchesResult
  })

  const handleSaveTrade = () => {
    if (!formData.date || !formData.asset || !formData.entryPrice || !formData.exitPrice) {
      alert('Please fill all required fields')
      return
    }

    const entryPrice = parseFloat(formData.entryPrice)
    const exitPrice = parseFloat(formData.exitPrice)
    const positionSize = parseFloat(formData.positionSize || '1')
    
    let result: 'Win' | 'Loss' | 'Breakeven' = 'Breakeven'
    if (formData.tradeType === 'Buy') {
      result = exitPrice > entryPrice ? 'Win' : exitPrice < entryPrice ? 'Loss' : 'Breakeven'
    } else {
      result = exitPrice < entryPrice ? 'Win' : exitPrice > entryPrice ? 'Loss' : 'Breakeven'
    }

    const newTrade: Trade = {
      id: Date.now().toString(),
      date: formData.date,
      asset: formData.asset,
      tradeType: formData.tradeType,
      entryPrice,
      exitPrice,
      stopLoss: parseFloat(formData.stopLoss || '0'),
      targetPrice: parseFloat(formData.targetPrice || '0'),
      positionSize,
      riskRewardRatio: parseFloat(formData.riskRewardRatio || parseFloat(avgRiskReward)),
      result,
      emotion: formData.emotion,
      notes: formData.notes,
    }

    setTrades([newTrade, ...trades])
    setFormData({
      date: '',
      asset: '',
      tradeType: 'Buy',
      entryPrice: '',
      exitPrice: '',
      stopLoss: '',
      targetPrice: '',
      positionSize: '',
      emotion: 'Confident',
      notes: '',
    })
  }

  const emotionColors = ['#3b82f6', '#10b981', '#ef4444', '#f59e0b']

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Trading Journal</h1>
          <p className="text-muted-foreground text-sm">Track and analyze your trades to improve performance</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Trades</p>
                  <p className="text-3xl font-bold text-foreground">{totalTrades}</p>
                </div>
                <Target className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Win Rate</p>
                  <p className="text-3xl font-bold text-primary">{winRate}%</p>
                  <p className="text-xs text-muted-foreground mt-1">{wins} wins, {losses} losses</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className={`bg-card border-border ${totalProfit >= 0 ? 'border-green-500/30' : 'border-red-500/30'}`}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total P/L</p>
                  <p className={`text-3xl font-bold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${totalProfit.toFixed(2)}
                  </p>
                </div>
                <DollarSign className={`w-8 h-8 ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Risk/Reward</p>
                  <p className="text-3xl font-bold text-accent">{avgRiskReward}</p>
                  <p className="text-xs text-muted-foreground mt-1">Ratio</p>
                </div>
                <PieChartIcon className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trade Entry Form */}
        <Card className="bg-card border-border shadow-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Log New Trade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Trade Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="h-9"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Asset</label>
                <Input
                  placeholder="e.g., AAPL, BTC"
                  value={formData.asset}
                  onChange={(e) => setFormData({ ...formData, asset: e.target.value.toUpperCase() })}
                  className="h-9"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Trade Type</label>
                <select
                  value={formData.tradeType}
                  onChange={(e) => setFormData({ ...formData, tradeType: e.target.value as 'Buy' | 'Sell' })}
                  className="w-full h-9 px-3 rounded-lg bg-secondary border border-border text-foreground text-sm"
                >
                  <option>Buy</option>
                  <option>Sell</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Entry Price</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.entryPrice}
                  onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
                  className="h-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Exit Price</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.exitPrice}
                  onChange={(e) => setFormData({ ...formData, exitPrice: e.target.value })}
                  className="h-9"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Stop Loss</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.stopLoss}
                  onChange={(e) => setFormData({ ...formData, stopLoss: e.target.value })}
                  className="h-9"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Target Price</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.targetPrice}
                  onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                  className="h-9"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Position Size</label>
                <Input
                  type="number"
                  step="1"
                  placeholder="1"
                  value={formData.positionSize}
                  onChange={(e) => setFormData({ ...formData, positionSize: e.target.value })}
                  className="h-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Emotion During Trade</label>
                <select
                  value={formData.emotion}
                  onChange={(e) => setFormData({ ...formData, emotion: e.target.value as any })}
                  className="w-full h-9 px-3 rounded-lg bg-secondary border border-border text-foreground text-sm"
                >
                  <option>Confident</option>
                  <option>Disciplined</option>
                  <option>Fear</option>
                  <option>FOMO</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Notes</label>
                <Input
                  placeholder="Trade notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="h-9"
                />
              </div>
            </div>

            <Button 
              onClick={handleSaveTrade}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              <Plus className="w-4 h-4" />
              Save Trade
            </Button>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Profit Curve */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Profit Curve Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={profitCurveData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
                  <YAxis stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: `1px solid var(--border)`,
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: 'var(--foreground)' }}
                    formatter={(value) => `$${value.toFixed(2)}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="var(--primary)" 
                    strokeWidth={2}
                    dot={{ fill: 'var(--primary)', r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Emotion Distribution */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Emotion Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={emotionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {emotionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={emotionColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: `1px solid var(--border)`,
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: 'var(--foreground)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Risk Reward Distribution */}
          <Card className="bg-card border-border shadow-sm lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Risk/Reward Ratio by Trade</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={riskRewardData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
                  <YAxis stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: `1px solid var(--border)`,
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: 'var(--foreground)' }}
                  />
                  <Bar dataKey="riskReward" fill="var(--accent)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Trade History */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-lg">Trade History</CardTitle>
              <div className="flex flex-col md:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Search trades..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-9 text-sm"
                  />
                </div>

                {/* Asset Filter */}
                <select
                  value={assetFilter}
                  onChange={(e) => setAssetFilter(e.target.value)}
                  className="h-9 px-3 rounded-lg bg-secondary border border-border text-foreground text-sm"
                >
                  <option value="">All Assets</option>
                  {Array.from(new Set(trades.map(t => t.asset))).map(asset => (
                    <option key={asset} value={asset}>{asset}</option>
                  ))}
                </select>

                {/* Result Filter */}
                <select
                  value={resultFilter}
                  onChange={(e) => setResultFilter(e.target.value as any)}
                  className="h-9 px-3 rounded-lg bg-secondary border border-border text-foreground text-sm"
                >
                  <option value="All">All Results</option>
                  <option value="Win">Wins</option>
                  <option value="Loss">Losses</option>
                  <option value="Breakeven">Breakeven</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Asset</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Entry</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Exit</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">P/L</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">R/R</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Result</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Emotion</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTrades.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="text-center py-8 text-muted-foreground">No trades found</td>
                    </tr>
                  ) : (
                    filteredTrades.map((trade) => {
                      const pnl = (trade.exitPrice - trade.entryPrice) * trade.positionSize
                      const isProfitable = pnl > 0
                      return (
                        <tr key={trade.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                          <td className="px-4 py-3 text-foreground">{trade.date}</td>
                          <td className="px-4 py-3 font-semibold text-foreground">{trade.asset}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-medium px-2 py-1 rounded ${
                              trade.tradeType === 'Buy' 
                                ? 'bg-green-500/20 text-green-500' 
                                : 'bg-red-500/20 text-red-500'
                            }`}>
                              {trade.tradeType}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-foreground">${trade.entryPrice.toFixed(2)}</td>
                          <td className="px-4 py-3 text-right text-foreground">${trade.exitPrice.toFixed(2)}</td>
                          <td className={`px-4 py-3 text-right font-semibold ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
                            ${pnl.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-right text-foreground">{trade.riskRewardRatio.toFixed(2)}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`text-xs font-medium px-2 py-1 rounded ${
                              trade.result === 'Win' 
                                ? 'bg-green-500/20 text-green-500' 
                                : trade.result === 'Loss'
                                ? 'bg-red-500/20 text-red-500'
                                : 'bg-gray-500/20 text-gray-500'
                            }`}>
                              {trade.result}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center text-xs text-muted-foreground">{trade.emotion}</td>
                          <td className="px-4 py-3 text-foreground text-xs max-w-xs truncate">{trade.notes}</td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
