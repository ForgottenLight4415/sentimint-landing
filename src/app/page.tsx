"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, TrendingUp, BarChart3, FileText, ArrowUp, ArrowDown } from "lucide-react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [agents, setAgents] = useState([
    { id: 1, name: 'Sentiment Analyzer', icon: TrendingUp, status: 'idle', description: 'Analyzing market sentiment' },
    { id: 2, name: 'Technical Indicator', icon: BarChart3, status: 'idle', description: 'Processing technical signals' },
    { id: 3, name: 'News Processor', icon: FileText, status: 'idle', description: 'Scanning latest news' }
  ])
  const [decision, setDecision] = useState<{ type: 'BUY' | 'SELL' } | null>(null)

  const [confidence, setConfidence] = useState<number>(0);
  const [stockPrice, setStockPrice] = useState<number>(0);
  const [newsHeadlines, setNewsHeadlines] = useState<Article[]>([]);
  const [justification, setJustification] = useState<string>('');

  const handleSearch = async () => {
    if (!searchTerm) return
    
    setIsSearching(true)
    setShowResults(false)
    setDecision(null)

    // Reset agents
    setAgents(prev => prev.map(agent => ({ ...agent, status: 'idle' })))

    for (let i = 0; i < agents.length; i++) {
      setAgents(prev => prev.map((agent, index) => 
        index === i ? { ...agent, status: 'processing' } : agent
      ))
    }

    const res = await fetch(`http://127.0.0.1:5050/insight`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: searchTerm.trim() })
    })
    const data = await res.json()
    if (!res.ok) {
      console.error('Error fetching insights:', data)
      setIsSearching(false)
      return
    }
    
    setNewsHeadlines(data.news_articles.map((article: Article) => ({
      title: article.title,
      link: article.link,
      summary: article.summary,
    })));
    setConfidence(data.recommendation.confidence);
    setStockPrice(parseFloat(data.financials.stock_price));
    setJustification(data.justification);

    const decisions = ['BUY', 'SELL'] as const
    const randomDecision = decisions[data.recommendation.decision === 'Buy' ? 0 : 1]
    setDecision({ type: randomDecision })
    
    for (let i = 0; i < agents.length; i++) {
      setAgents(prev => prev.map((agent, index) => 
        index === i ? { ...agent, status: 'completed' } : agent
      ))
    }
    
    setIsSearching(false)
    setShowResults(true)
  }

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'border-mint-500 bg-mint-50'
      case 'completed': return 'border-green-500 bg-green-50'
      default: return 'border-gray-200 bg-white'
    }
  }

  const getAgentStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return '🔄'
      case 'completed': return '✅'
      default: return '⚪'
    }
  }

  const mockNews = [
    { title: `${searchTerm || 'TSLA'} Reports Strong Q4 Earnings, Beats Expectations`, source: 'Reuters', time: '2 hours ago', summary: 'Company revenue exceeded analyst predictions by 12%, showing robust growth in key markets.' },
    { title: `Market Analysis: ${searchTerm || 'TSLA'} Shows Bullish Technical Patterns`, source: 'Bloomberg', time: '3 hours ago', summary: 'Technical indicators suggest potential upward momentum in the coming weeks.' },
    { title: `${searchTerm || 'TSLA'} Announces Strategic Partnership with Major Tech Firm`, source: 'CNBC', time: '4 hours ago', summary: 'The collaboration is expected to drive innovation and expand market reach significantly.' },
    { title: `Analyst Upgrade: ${searchTerm || 'TSLA'} Raised to Buy Rating`, source: 'MarketWatch', time: '5 hours ago', summary: 'Leading investment firm increases price target citing strong fundamentals.' },
    { title: ` ${searchTerm || 'TSLA'} Insider Trading Activity Shows Confidence`, source: 'Financial Times', time: '6 hours ago', summary: 'Recent insider purchases indicate management confidence in future prospects.' },
    { title: `Sector Analysis: ${searchTerm || 'TSLA'} Outperforms Industry Peers`, source: 'Wall Street Journal', time: '7 hours ago', summary: 'Company demonstrates superior performance metrics compared to competitors.' },
    { title: `${searchTerm || 'TSLA'} Innovation Drive Attracts Institutional Interest`, source: 'Yahoo Finance', time: '8 hours ago', summary: 'Major institutional investors increase positions following recent developments.' },
    { title: `Economic Impact: ${searchTerm || 'TSLA'} Expansion Plans Unveiled`, source: 'Forbes', time: '9 hours ago', summary: 'Ambitious growth strategy could significantly impact market dynamics.' },
    { title: `${searchTerm || 'TSLA'} Sustainability Initiative Gains Market Approval`, source: 'CNN Business', time: '10 hours ago', summary: 'Environmental focus resonates well with ESG-conscious investors.' },
    { title: `Trading Volume Surge: ${searchTerm || 'TSLA'} Sees Increased Activity`, source: 'Seeking Alpha', time: '11 hours ago', summary: 'Unusual trading patterns suggest heightened investor interest and potential catalysts.' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Senti<span className="text-mint-500">mint</span>
            </h1>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Docs</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <Button variant="outline">Sign In</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Stock Analysis
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get real-time sentiment analysis and trading insights powered by advanced AI agents
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Enter a ticker symbol (e.g., TSLA, AAPL, MSFT)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 text-lg text-gray-600"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={isSearching || !searchTerm.trim()}
                className="px-8 py-3 text-lg bg-mint-500 hover:bg-mint-600"
              >
                {isSearching ? 'Analyzing...' : 'Analyze'}
              </Button>
            </div>
          </div>
        </div>

        {/* AI Agents Section */}
        {(isSearching || showResults) && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              AI Agent Analysis
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {agents.map((agent) => {
                const IconComponent = agent.icon
                return (
                  <Card key={agent.id} className={`${getAgentStatusColor(agent.status)} transition-all duration-300`}>
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <div className="bg-white rounded-full p-3 shadow-sm">
                          <IconComponent className="h-8 w-8 text-mint-500" />
                        </div>
                        <span className="ml-2 text-2xl">{getAgentStatusIcon(agent.status)}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {agent.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {agent.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Decision Section */}
        {decision && (
          <div className="mb-12">
            <Card className={`${decision.type === 'BUY' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'} transition-all duration-500`}>
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  {decision.type === 'BUY' ? (
                    <ArrowUp className="h-12 w-12 text-green-600" />
                  ) : (
                    <ArrowDown className="h-12 w-12 text-red-600" />
                  )}
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${decision.type === 'BUY' ? 'text-green-700' : 'text-red-700'}`}>
                  {decision.type} SIGNAL
                </h3>
                <p className="text-lg text-gray-700 mb-2">
                  Confidence: {confidence}%
                </p>
                <p className="text-lg text-gray-700">
                  Stock Price: {stockPrice.toFixed(2)}
                </p>
                <div className="mt-4 text-sm text-gray-600">
                  {justification || 'No justification provided.'}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* News Section */}
        {showResults && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Latest News for {searchTerm.toUpperCase()}
            </h3>
            <div className="space-y-4">
              {newsHeadlines.map((article, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 flex-1 mr-4">
                        {article.title}
                      </h4>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-mint-600">
                        <a href={article.link}>Follow article</a>
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {article.summary}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}