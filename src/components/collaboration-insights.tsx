import { useState } from 'react'
import { Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const teamMembers = [
  { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32", initials: "JD" },
  { name: "Alice Brown", avatar: "/placeholder.svg?height=32&width=32", initials: "AB" },
  { name: "Charlie Kim", avatar: "/placeholder.svg?height=32&width=32", initials: "CK" },
]

export default function CollaborationInsights() {
  const [progress, setProgress] = useState(75)

  const updateProgress = () => {
    setProgress(prev => Math.min(100, prev + 5))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Team Collaboration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Project Alpha</span>
              <span className="text-sm text-gray-500">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 w-full" />
          </div>
          <div className="flex -space-x-2">
            {teamMembers.map((member, index) => (
              <Avatar key={index} className="border-2 border-white">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <Button onClick={updateProgress} variant="outline" className="w-full">
            Update Progress
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

