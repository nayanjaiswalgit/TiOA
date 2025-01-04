import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heart, Battery, Zap } from 'lucide-react'

export default function AIHealthIntegration() {
  const [stressLevel, setStressLevel] = useState(30)
  const [energyLevel, setEnergyLevel] = useState(70)
  const [sleepQuality, setSleepQuality] = useState(80)

  useEffect(() => {
    const interval = setInterval(() => {
      setStressLevel(prev => Math.max(0, Math.min(100, prev + Math.floor(Math.random() * 10) - 5)))
      setEnergyLevel(prev => Math.max(0, Math.min(100, prev + Math.floor(Math.random() * 10) - 5)))
      setSleepQuality(prev => Math.max(0, Math.min(100, prev + Math.floor(Math.random() * 10) - 5)))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">AI Health Integration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium flex items-center">
              <Heart className="w-4 h-4 mr-2 text-red-500" /> Stress Level
            </span>
            <span className="text-sm text-gray-500">{stressLevel}%</span>
          </div>
          <Progress value={stressLevel} className="h-2 w-full" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium flex items-center">
              <Battery className="w-4 h-4 mr-2 text-green-500" /> Energy Level
            </span>
            <span className="text-sm text-gray-500">{energyLevel}%</span>
          </div>
          <Progress value={energyLevel} className="h-2 w-full" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium flex items-center">
              <Zap className="w-4 h-4 mr-2 text-yellow-500" /> Sleep Quality
            </span>
            <span className="text-sm text-gray-500">{sleepQuality}%</span>
          </div>
          <Progress value={sleepQuality} className="h-2 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

