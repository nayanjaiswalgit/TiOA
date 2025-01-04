import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ShoppingCart, Coffee, Briefcase } from 'lucide-react'

const reminders = [
  { icon: ShoppingCart, text: "You're near the grocery store. Don't forget to pick up milk!" },
  { icon: Coffee, text: "It's your usual coffee break time. Take a moment to relax!" },
  { icon: Briefcase, text: "You have a meeting in 15 minutes. Time to prepare!" },
  { icon: MapPin, text: "You're close to the gym. How about a quick workout?" },
]

export default function ContextAwareReminders() {
  const [currentReminder, setCurrentReminder] = useState(0)

  const nextReminder = () => {
    setCurrentReminder((prev) => (prev + 1) % reminders.length)
  }

  const Reminder = reminders[currentReminder]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Context-Aware Reminders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Reminder.icon className="text-blue-500 w-8 h-8" />
          <p className="text-sm">{Reminder.text}</p>
        </div>
        <Button onClick={nextReminder} variant="outline" className="w-full">
          Next Reminder
        </Button>
      </CardContent>
    </Card>
  )
}

