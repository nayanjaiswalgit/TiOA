import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const goals = [
  { name: "Learn a New Language", progress: 35 },
  { name: "Exercise Regularly", progress: 70 },
  { name: "Read 20 Books This Year", progress: 45 },
]

export default function LifeGoalsAlignment() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Life Goals Alignment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{goal.name}</span>
                <span className="text-sm text-gray-500">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-2 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

