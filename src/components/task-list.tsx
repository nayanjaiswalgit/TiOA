import { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, ChevronDown, ChevronRight } from 'lucide-react'

const initialTasks = [
  {
    id: 1,
    title: "Project Alpha",
    completed: false,
    progress: 30,
    subtasks: [
      { id: 11, title: "Design mockups", completed: true },
      { id: 12, title: "Implement frontend", completed: false },
      { id: 13, title: "Backend integration", completed: false },
    ]
  },
  {
    id: 2,
    title: "Client Presentations",
    completed: false,
    progress: 0,
    subtasks: [
      { id: 21, title: "Prepare slides", completed: false },
      { id: 22, title: "Rehearse presentation", completed: false },
    ]
  },
  {
    id: 3,
    title: "Team Management",
    completed: false,
    progress: 60,
    subtasks: [
      { id: 31, title: "Weekly team meeting", completed: true },
      { id: 32, title: "Performance reviews", completed: false },
      { id: 33, title: "Team building activity", completed: true },
    ]
  },
]

export default function TaskList() {
  const [tasks, setTasks] = useState(initialTasks)
  const [expandedTasks, setExpandedTasks] = useState<number[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskSubtasks, setNewTaskSubtasks] = useState('')

  const toggleTask = (taskId: number, subtaskId?: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        if (subtaskId) {
          const updatedSubtasks = task.subtasks.map(subtask =>
            subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
          )
          const completedSubtasks = updatedSubtasks.filter(subtask => subtask.completed).length
          const progress = Math.round((completedSubtasks / updatedSubtasks.length) * 100)
          return { ...task, subtasks: updatedSubtasks, progress }
        } else {
          const completed = !task.completed
          return { ...task, completed, progress: completed ? 100 : task.progress }
        }
      }
      return task
    }))
  }

  const toggleExpand = (taskId: number) => {
    setExpandedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const subtasks = newTaskSubtasks
        .split('\n')
        .filter(subtask => subtask.trim())
        .map((subtask, index) => ({
          id: Date.now() + index,
          title: subtask.trim(),
          completed: false
        }))

      const newTask = {
        id: Math.max(...tasks.map(t => t.id)) + 1,
        title: newTaskTitle.trim(),
        completed: false,
        progress: 0,
        subtasks
      }

      setTasks([...tasks, newTask])
      setNewTaskTitle('')
      setNewTaskSubtasks('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="New task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <Textarea
          placeholder="Enter subtasks (one per line)"
          value={newTaskSubtasks}
          onChange={(e) => setNewTaskSubtasks(e.target.value)}
        />
        <Button onClick={addTask} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" /> Add New Task
        </Button>
      </div>
      {tasks.map(task => (
        <div key={task.id} className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
          <div className="flex items-center space-x-4">
            <Checkbox 
              checked={task.completed} 
              onCheckedChange={() => toggleTask(task.id)}
            />
            <div className="flex-grow">
              <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</p>
              <Progress value={task.progress} className="h-1 w-full mt-1" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleExpand(task.id)}
            >
              {expandedTasks.includes(task.id) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
          {expandedTasks.includes(task.id) && (
            <div className="mt-2 ml-6 space-y-2">
              {task.subtasks.map(subtask => (
                <div key={subtask.id} className="flex items-center space-x-2">
                  <Checkbox 
                    checked={subtask.completed} 
                    onCheckedChange={() => toggleTask(task.id, subtask.id)}
                  />
                  <p className={`text-sm ${subtask.completed ? 'line-through text-gray-500' : ''}`}>{subtask.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

