import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Book, Code, Briefcase, Palette } from 'lucide-react'

const learningCategories = [
  { name: "Reading", icon: Book, color: "text-blue-500" },
  { name: "Coding", icon: Code, color: "text-green-500" },
  { name: "Professional Skills", icon: Briefcase, color: "text-purple-500" },
  { name: "Creative", icon: Palette, color: "text-orange-500" },
]

const suggestions = [
  "Read a chapter of 'The Lean Startup'",
  "Complete a LeetCode challenge",
  "Watch a TED Talk on leadership",
  "Practice sketching for 15 minutes",
  "Learn a new ES6 feature",
  "Write a blog post about your recent project",
  "Try a new Figma plugin",
  "Attend a virtual networking event",
]

export default function LearningGrowthSuggestions() {
  const [currentSuggestion, setCurrentSuggestion] = useState(suggestions[0])

  const getNewSuggestion = () => {
    const newSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
    setCurrentSuggestion(newSuggestion)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Learning & Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {learningCategories.map((category) => (
            <div key={category.name} className="flex items-center space-x-2">
              <category.icon className={`w-5 h-5 ${category.color}`} />
              <span className="text-sm">{category.name}</span>
            </div>
          ))}
        </div>
        <p className="text-sm mb-4">Suggestion: {currentSuggestion}</p>
        <Button onClick={getNewSuggestion} variant="outline" className="w-full">
          Get New Suggestion
        </Button>
      </CardContent>
    </Card>
  )
}

