"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Play, Pause, RotateCcw } from 'lucide-react'

type PomodoroSession = {
  duration: number
  timestamp: number
}

export default function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [sessions, setSessions] = useState<PomodoroSession[]>([])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
      setSessions((prevSessions) => [
        ...prevSessions,
        { duration: 25 * 60 - time, timestamp: Date.now() },
      ])
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(25 * 60)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Pomodoro Timer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-center mb-4">{formatTime(time)}</div>
        <Progress value={(time / (25 * 60)) * 100} className="h-2 mb-4" />
        <div className="flex justify-center space-x-2 mb-4">
          <Button onClick={toggleTimer} variant="outline">
            {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={resetTimer} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">Recent Sessions</h3>
          <ul className="space-y-1">
            {sessions.slice(-3).reverse().map((session, index) => (
              <li key={index} className="text-sm">
                {new Date(session.timestamp).toLocaleTimeString()} - {formatTime(session.duration)}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

