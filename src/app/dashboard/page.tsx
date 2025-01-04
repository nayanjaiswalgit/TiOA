"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TaskList from '../../components/task-list'
import WorkTimeAndPomodoroTracker from '../../components/work-time-and-pomodoro-tracker'
import HealthAndWellbeingTracker from '../../components/health-and-wellbeing-tracker'
import CollaborationInsights from '../../components/collaboration-insights'
import AIAssistant from '../../components/ai-assistant'
import MicroBreakSuggestion from '../../components/micro-break-suggestion'
import LifeGoalsAlignment from '../../components/life-goals-alignment'
import LearningGrowthSuggestions from '../../components/learning-growth-suggestions'
import ContextAwareReminders from '../../components/context-aware-reminders'
import PersonalTasks from '../../components/personal-tasks'
import LearningTracker from '../../components/learning-tracker'

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">TiOA Dashboard</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tasks and Projects</CardTitle>
                <CardDescription>Manage your tasks and projects</CardDescription>
              </CardHeader>
              <CardContent>
                <TaskList />
              </CardContent>
            </Card>
            <PersonalTasks />
            <LifeGoalsAlignment />
            <LearningTracker />
            <LearningGrowthSuggestions />
          </div>

          <div className="space-y-6">
            <WorkTimeAndPomodoroTracker />
            <HealthAndWellbeingTracker />
            <AIAssistant />
            <MicroBreakSuggestion />
            <CollaborationInsights />
            <ContextAwareReminders />
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-sm mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2025 TiOA - AI-Powered Time Optimization Assistant
        </div>
      </footer>
    </div>
  )
}

