import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coffee, Wind, FootprintsIcon as Walk } from 'lucide-react'

const breakSuggestions = [
  { icon: Coffee, text: "Take a coffee break" },
  { icon: Wind, text: "Do a quick breathing exercise" },
  { icon: Walk, text: "Go for a short walk" },
]

export default function MicroBreakSuggestion() {
  const [currentSuggestion, setCurrentSuggestion] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % breakSuggestions.length)
    }, 60000) // Change suggestion every minute

    return () => clearInterval(interval)
  }, [])

  const Suggestion = breakSuggestions[currentSuggestion]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Micro-Break Suggestion</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Suggestion.icon className="text-blue-500 w-8 h-8" />
          <p className="text-sm">{Suggestion.text}</p>
        </div>
        <Button variant="outline" className="w-full">Start Break</Button>
      </CardContent>
    </Card>
  )
}

