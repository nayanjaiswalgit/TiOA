"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Clock } from 'lucide-react'

type TimerSession = {
  duration: number
  timestamp: number
  type: 'work' | 'pomodoro'
}

export default function WorkTimeAndPomodoroTracker() {
  const [workTime, setWorkTime] = useState(0)
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [isWorkTimer, setIsWorkTimer] = useState(true)
  const [sessions, setSessions] = useState<TimerSession[]>([])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        if (isWorkTimer) {
          setWorkTime((prevTime) => prevTime + 1)
        } else {
          setPomodoroTime((prevTime) => {
            if (prevTime > 0) {
              return prevTime - 1
            } else {
              setIsActive(false)
              setSessions((prevSessions) => [
                ...prevSessions,
                { duration: 25 * 60, timestamp: Date.now(), type: 'pomodoro' },
              ])
              return 25 * 60 // Reset to 25 minutes
            }
          })
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, isWorkTimer])

  const toggleTimer = () => {
    if (!isActive && isWorkTimer) {
      // Start a new work session
      setSessions((prevSessions) => [
        ...prevSessions,
        { duration: 0, timestamp: Date.now(), type: 'work' },
      ])
    }
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    if (isWorkTimer) {
      setWorkTime(0)
    } else {
      setPomodoroTime(25 * 60)
    }
  }

  const switchTimerType = () => {
    setIsWorkTimer(!isWorkTimer)
    setIsActive(false)
    resetTimer()
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          {isWorkTimer ? 'Work Time Tracker' : 'Pomodoro Timer'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-center mb-4">
          {isWorkTimer ? formatTime(workTime) : formatTime(pomodoroTime)}
        </div>
        <Progress 
          value={isWorkTimer ? (workTime % 3600) / 36 : (pomodoroTime / (25 * 60)) * 100} 
          className="h-2 mb-4" 
        />
        <div className="flex justify-center space-x-2 mb-4">
          <Button onClick={toggleTimer} variant="outline">
            {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={resetTimer} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={switchTimerType} variant="outline">
            Switch to {isWorkTimer ? 'Pomodoro' : 'Work Time'}
          </Button>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">Recent Sessions</h3>
          <ul className="space-y-1">
            {sessions.slice(-3).reverse().map((session, index) => (
              <li key={index} className="text-sm">
                {new Date(session.timestamp).toLocaleTimeString()} - {session.type === 'work' ? 'Work' : 'Pomodoro'}: {formatTime(session.duration)}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

