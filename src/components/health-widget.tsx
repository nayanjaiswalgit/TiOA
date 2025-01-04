import { useState, useEffect } from 'react'
import { Heart, Activity, Moon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function HealthWidget() {
  const [heartRate, setHeartRate] = useState(75)
  const [steps, setSteps] = useState(6500)
  const [sleep, setSleep] = useState(450) // 7.5 hours in minutes
  const [overallHealth, setOverallHealth] = useState(80)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => Math.max(60, Math.min(100, prev + Math.floor(Math.random() * 5) - 2)))
      setSteps(prev => prev + Math.floor(Math.random() * 10))
      setOverallHealth(prev => Math.max(0, Math.min(100, prev + Math.floor(Math.random() * 5) - 2)))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Health & Well-being</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="text-red-500" />
              <span className="text-sm">{heartRate} bpm</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="text-green-500" />
              <span className="text-sm">{steps.toLocaleString()} steps</span>
            </div>
            <div className="flex items-center space-x-2">
              <Moon className="text-blue-500" />
              <span className="text-sm">{Math.floor(sleep / 60)}h {sleep % 60}m</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Overall Health</span>
              <span className="text-sm text-gray-500">{overallHealth}%</span>
            </div>
            <Progress value={overallHealth} className="h-2 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

