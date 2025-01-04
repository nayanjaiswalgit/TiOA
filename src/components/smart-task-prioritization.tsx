import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const initialTasks = [
  { id: 'task1', content: 'Complete project proposal', priority: 'high' },
  { id: 'task2', content: 'Review team presentations', priority: 'medium' },
  { id: 'task3', content: 'Schedule client meeting', priority: 'low' },
  { id: 'task4', content: 'Update website content', priority: 'medium' },
]

export default function SmartTaskPrioritization() {
  const [tasks, setTasks] = useState(initialTasks)

  const onDragEnd = (result ) => {
    if (!result.destination) return

    const newTasks = Array.from(tasks)
    const [reorderedItem] = newTasks.splice(result.source.index, 1)
    newTasks.splice(result.destination.index, 0, reorderedItem)

    setTasks(newTasks)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Task Prioritization</CardTitle>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="taskList">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm flex justify-between items-center"
                      >
                        <span>{task.content}</span>
                        <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                          {task.priority}
                        </Badge>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
    </Card>
  )
}

