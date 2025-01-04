import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type LearningEntry = {
  id: number
  title: string
  notes: string
  date: string
}

export default function LearningTracker() {
  const [entries, setEntries] = useState<LearningEntry[]>([])
  const [newEntry, setNewEntry] = useState({ title: '', notes: '' })

  const addEntry = () => {
    if (newEntry.title.trim()) {
      setEntries([
        ...entries,
        {
          id: Date.now(),
          title: newEntry.title.trim(),
          notes: newEntry.notes.trim(),
          date: new Date().toLocaleDateString()
        }
      ])
      setNewEntry({ title: '', notes: '' })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="What did you learn?"
            value={newEntry.title}
            onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
          />
          <Textarea
            placeholder="Additional notes..."
            value={newEntry.notes}
            onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
          />
          <Button onClick={addEntry} className="w-full">Add Learning Entry</Button>
          <div className="space-y-2">
            {entries.map(entry => (
              <div key={entry.id} className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <h4 className="font-semibold">{entry.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{entry.notes}</p>
                <p className="text-xs text-gray-500 mt-1">{entry.date}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

