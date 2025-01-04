import { useState } from 'react'
import { Brain } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const suggestions = [
  "Now might be a good time for a quick break.",
  "Consider tackling your most important task next.",
  "You've been working for a while, how about some stretching?",
  "Your next meeting is in 30 minutes. Time to prepare?",
]

export default function AIAssistant() {
  const [currentSuggestion, setCurrentSuggestion] = useState(0)

  const getNextSuggestion = () => {
    setCurrentSuggestion((prev) => (prev + 1) % suggestions.length)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">AI Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{suggestions[currentSuggestion]}</p>
        <Button variant="outline" className="w-full" onClick={getNextSuggestion}>
          <Brain className="mr-2 h-4 w-4" /> Get Suggestions
        </Button>
      </CardContent>
    </Card>
  )
}

