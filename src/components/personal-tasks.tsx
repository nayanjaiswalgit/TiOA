import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

type Task = {
  id: number
  title: string
  completed: boolean
}

type TaskList = {
  daily: Task[]
  weekly: Task[]
  yearly: Task[]
}

export default function PersonalTasks() {
  const [tasks, setTasks] = useState<TaskList>({
    daily: [],
    weekly: [],
    yearly: []
  })
  const [newTask, setNewTask] = useState('')
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'yearly'>('daily')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks(prevTasks => ({
        ...prevTasks,
        [activeTab]: [
          ...prevTasks[activeTab],
          { id: Date.now(), title: newTask.trim(), completed: false }
        ]
      }))
      setNewTask('')
    }
  }

  const toggleTask = (taskId: number) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [activeTab]: prevTasks[activeTab].map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'daily' | 'weekly' | 'yearly')}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          {(['daily', 'weekly', 'yearly'] as const).map(tab => (
            <TabsContent key={tab} value={tab}>
              <div className="space-y-4">
                {tasks[tab].map(task => (
                  <div key={task.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                    />
                    <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.title}</span>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder={`Add new ${tab} task`}
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                  <Button onClick={addTask}>Add</Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

