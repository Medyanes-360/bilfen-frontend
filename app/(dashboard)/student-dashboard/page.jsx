"use client"

import { useEffect, useState } from "react"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { AnimatePresence } from "framer-motion"

// Dashboard Components
import DashboardHeader from "@/components/studentDashboard/header"
import DailyCalendar from "@/components/DailyCalendar"
import LearningPath from "@/components/studentDashboard/learningPath"
import ExtraMaterials from "@/components/studentDashboard/extraMaterials"
import ArchiveButton from "@/components/studentDashboard/archiveButton"
import BottomNavigation from "@/components/studentDashboard/bottomNav"
import LoadingState from "@/components/studentDashboard/LoadingState"
import ErrorState from "@/components/studentDashboard/ErrorState"

// Modal Components
import TaskModal from "@/components/studentDashboard/modals/TaskModal"
import MaterialPreviewModal from "@/components/studentDashboard/modals/MaterialPreviewModal"
import ArchiveModal from "@/components/modal/studentArchive/archive-modal"

export default function Home() {
  const { data: session } = useSession()
  const [userData, setUserData] = useState(null)
  const [learningPath, setLearningPath] = useState([])
  const [calendarData, setCalendarData] = useState([])
  const [selectedDay, setSelectedDay] = useState(null)
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isMaterialPreviewOpen, setIsMaterialPreviewOpen] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState(null)
  const [currentDate, setCurrentDate] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [extraMaterialsOpen, setExtraMaterialsOpen] = useState(false)
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false)
  const [extraMaterials, setExtraMaterials] = useState([])
  const [archiveMaterials, setArchiveMaterials] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Progress calculations
  const completedTasks = learningPath.filter((task) => task.completed).length
  const totalTasks = learningPath.length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Set current date
  useEffect(() => {
    const now = new Date()
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    setCurrentDate(now.toLocaleDateString("tr-TR", options))
  }, [])

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!session) return;

      try {
        setIsLoading(true);

        // Extract the user ID from the session object
        const id = session.user?.id;
        if (!id) {
          throw new Error("User ID is not available in the session");
        }

        const response = await fetch(`/api/tasks/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  // Generate and fetch calendar data
  useEffect(() => {
    const generateCalendarData = async () => {
      try {
        // Generate basic calendar structure (7 days)
        const today = new Date()
        const days = []

        for (let i = -3; i <= 3; i++) {
          const date = new Date(today)
          date.setDate(today.getDate() + i)

          days.push({
            date: date,
            day: date.getDate(),
            weekday: date.toLocaleDateString("tr-TR", { weekday: "short" }),
            isToday: i === 0,
            hasTask: false,
          })
        }

        // Fetch tasks for each day to determine which days have tasks
        if (session) {
          const startDate = new Date(days[0].date)
          startDate.setHours(0, 0, 0, 0)

          const endDate = new Date(days[days.length - 1].date)
          endDate.setHours(23, 59, 59, 999)

          const response = await fetch(
            `/api/contents/calendar?start=${startDate.toISOString()}&end=${endDate.toISOString()}`,
          )

          if (response.ok) {
            const taskDates = await response.json()

            // Update calendar days with task information
            days.forEach((day) => {
              const dayString = day.date.toISOString().split("T")[0]
              day.hasTask = taskDates.includes(dayString)
            })
          }
        }

        setCalendarData(days)
        setSelectedDay(days.find((day) => day.isToday))
      } catch (error) {
        console.error("Error generating calendar data:", error)
        setError("Failed to load calendar")
      }
    }

    generateCalendarData()
  }, [session])

  // Fetch learning path data (tasks for the selected day)
  useEffect(() => {
    const fetchLearningPath = async () => {
      if (!session || !selectedDay) return

      try {
        setIsLoading(true)

        // Format the selected date for the API
        const selectedDate = selectedDay.date.toISOString().split("T")[0]
        const response = await fetch(`/api/contents/learning-path?date=${selectedDate}`)

        if (!response.ok) {
          throw new Error("Failed to fetch learning path data")
        }

        const data = await response.json()
        setLearningPath(data)
      } catch (error) {
        console.error("Error fetching learning path data:", error)
        setError("Failed to load tasks")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLearningPath()
  }, [session, selectedDay])

  // Fetch materials (extra materials and archive)
  useEffect(() => {
    const fetchMaterials = async () => {
      if (!session) return

      try {
        setIsLoading(true)
        const response = await fetch("/api/contents/materials")

        if (!response.ok) {
          throw new Error("Failed to fetch materials")
        }

        const data = await response.json()

        // Split materials into extra materials and archive materials
        const extra = data.filter((material) => !material.archived)
        const archive = data.filter((material) => material.archived)

        setExtraMaterials(extra)
        setArchiveMaterials(archive)
      } catch (error) {
        console.error("Error fetching materials:", error)
        setError("Failed to load materials")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMaterials()
  }, [session])

  const handleDaySelect = (day) => {
    setSelectedDay(day)
  }

  // Handle task click
  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setIsTaskPopupOpen(true)
  }

  // Handle task completion
  const handleCompleteTask = async (taskId) => {
    try {
      const response = await fetch("/api/contents/complete-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId }),
      })

      if (!response.ok) {
        throw new Error("Failed to complete task")
      }

      // Update the task in the local state
      setLearningPath((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? { ...task, completed: true } : task)),
      )

      // Close the task popup
      setIsTaskPopupOpen(false)
    } catch (error) {
      console.error("Error completing task:", error)
      alert("Failed to complete task. Please try again.")
    }
  }

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (isTaskPopupOpen || isMaterialPreviewOpen || isArchiveModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isTaskPopupOpen, isMaterialPreviewOpen, isArchiveModalOpen])

  // Handle material click
  const handleMaterialClick = (material) => {
    if (!material) {
      console.error("Material is undefined or null:", material)
      return
    }

    const materialUrl = material?.url || material?.content

    if (!materialUrl) {
      console.error("Material URL or content is missing:", material)
      return
    }

    const isVideo =
      materialUrl.endsWith(".mp4") ||
      materialUrl.endsWith(".webm") ||
      materialUrl.endsWith(".mov") ||
      material.type === "video"

    const previewMaterial = {
      name: material.name || material.title || "Untitled Material",
      url: materialUrl,
      type: material.type || "document",
    }

    if (isVideo || !isMobile) {
      // For videos (any screen size) or any material on desktop: preview
      setSelectedMaterial(previewMaterial)
      setIsMaterialPreviewOpen(true)
    } else {
      // For non-video materials on mobile: download
      const link = document.createElement("a")
      link.href = previewMaterial.url
      link.download = previewMaterial.name
      link.click()
    }
  }

  // Handle archive modal close with optional material selection
  const handleArchiveModalClose = (material = null) => {
    setIsArchiveModalOpen(false)

    // If a material was selected in the archive, preview it
    if (material) {
      handleMaterialClick(material)
    }
  }

  // Loading state
  if (isLoading && !userData && learningPath.length === 0) {
    return <LoadingState />
  }

  // Error state
  if (error) {
    return <ErrorState error={error} onRetry={() => window.location.reload()} />
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>ÖğrenYap - Çocuklar İçin Eğitim Uygulaması</title>
        <meta name="description" content="Çocuklar için eğitim platformu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto bg-white min-h-screen shadow-lg relative overflow-hidden pb-20">
        {/* Main container with 3-column layout for desktop */}
        <div className="lg:flex lg:flex-row lg:justify-center">
          {/* Main content - centered when sidebar is hidden */}
          <div className="lg:w-3/4 mx-auto">
            {/* Header */}
            <DashboardHeader
              userData={userData}
              session={session}
              currentDate={currentDate}
              completedTasks={completedTasks}
              totalTasks={totalTasks}
              progressPercentage={progressPercentage}
            />

            {/* Main Content */}
            <div className="px-5 py-4 md:px-6">
              {/* Calendar Component */}
              <DailyCalendar days={calendarData} selectedDay={selectedDay} onSelectDay={handleDaySelect} />

              {/* Learning Path Section */}
              <LearningPath
                learningPath={learningPath}
                completedTasks={completedTasks}
                totalTasks={totalTasks}
                onTaskClick={handleTaskClick}
              />

              {/* Extra Materials Toggle Section */}
              <ExtraMaterials
                extraMaterials={extraMaterials}
                extraMaterialsOpen={extraMaterialsOpen}
                setExtraMaterialsOpen={setExtraMaterialsOpen}
                onMaterialClick={handleMaterialClick}
                isMobile={isMobile}
              />

              {/* Archive Button Section */}
              <ArchiveButton onClick={() => setIsArchiveModalOpen(true)} />
            </div>
          </div>
        </div>

        {/* Bottom Navigation - Only visible on mobile and tablet */}
        <BottomNavigation />
      </div>

      {/* MODALS  */}

      {/* Task Popup Modal */}
      <AnimatePresence>
        {isTaskPopupOpen && selectedTask && (
          <TaskModal
            task={selectedTask}
            onClose={() => setIsTaskPopupOpen(false)}
            onCompleteTask={handleCompleteTask}
            onMaterialClick={handleMaterialClick}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>

      {/* Material Preview Modal */}
      <AnimatePresence>
        {isMaterialPreviewOpen && selectedMaterial && (
          <MaterialPreviewModal
            material={selectedMaterial}
            onClose={() => setIsMaterialPreviewOpen(false)}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>

      {/* Archive Modal */}
      <AnimatePresence>
        {isArchiveModalOpen && (
          <ArchiveModal onClose={handleArchiveModalClose} materials={archiveMaterials} isMobile={isMobile} />
        )}
      </AnimatePresence>
    </div>
  )
}
