"use client"

import { useEffect, useState } from "react"
import Head from "next/head"
import { LogOut, ChevronDown, FileText, Video, Download, ExternalLink, Calendar } from "lucide-react"
import { mockUserData, mockLearningPathData, generateCalendarData } from "@/data/mockData"
import { MATERIALS_DATA } from "@/data/teacherDashboardMockData"
import { getMaterialIcon } from "@/data/iconMockData"
import DailyCalendar from "@/components/DailyCalendar"
import ArchiveModal from "@/components/modal/studentArchive/archive-modal"
import { signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

export default function Home() {
  const [userData, setUserData] = useState(mockUserData)
  const [learningPath, setLearningPath] = useState(mockLearningPathData)
  const [calendarData, setCalendarData] = useState(generateCalendarData())
  const [selectedDay, setSelectedDay] = useState(calendarData.find((day) => day.isToday))
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isMaterialPreviewOpen, setIsMaterialPreviewOpen] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState(null)
  const [user, setUser] = useState(null)
  const [currentDate, setCurrentDate] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [extraMaterialsOpen, setExtraMaterialsOpen] = useState(false)
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false)

  // Extra materials data
  const extraMaterials = [
    { id: 1, name: "Matematik Çalışma Kağıdı", type: "document", url: "/document.pdf", icon: "📄" },
    { id: 2, name: "Bilim Deneyi Videosu", type: "video", url: "/example-video.mp4", icon: "🎬" },
    { id: 3, name: "İngilizce Kelime Listesi", type: "document", url: "/document.pdf", icon: "📝" },
    { id: 4, name: "Tarih Sunumu", type: "document", url: "/document.pdf", icon: "📚" },
    { id: 5, name: "Müzik Dersi", type: "video", url: "/example-video.mp4", icon: "🎵" },
  ]

  // Progress calculations
  const completedTasks = learningPath.filter((task) => task.completed).length
  const totalTasks = learningPath.length
  const progressPercentage = (completedTasks / totalTasks) * 100

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

  const handleDaySelect = (day) => {
    // Ensure only the current day's assignments are displayed
    if (day.isToday) {
      const filteredAssignments = mockLearningPathData.filter((task) => {
        if (!task.date) return false
        const taskDate = new Date(task.date)
        const today = new Date()
        return (
          taskDate.getDate() === today.getDate() &&
          taskDate.getMonth() === today.getMonth() &&
          taskDate.getFullYear() === today.getFullYear()
        )
      })

      setLearningPath(filteredAssignments)
      setSelectedDay(day) // Keep the selected day consistent
    }
  }

  // Ensure assignments are set on page load
  useEffect(() => {
    const today = new Date()
    const filteredAssignments = mockLearningPathData.filter((task) => {
      if (!task.date) return false
      const taskDate = new Date(task.date)
      return (
        taskDate.getDate() === today.getDate() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getFullYear() === today.getFullYear()
      )
    })

    setLearningPath(filteredAssignments)
    setSelectedDay(calendarData.find((day) => day.isToday)) // Set the current day as selected
  }, [calendarData])

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
      console.error("Material is undefined or null:", material);
      return;
    }
  
    const materialUrl = material?.url || material?.content;
  
    if (!materialUrl) {
      console.error("Material URL or content is missing:", material);
      return;
    }
  
    const isVideo =
      materialUrl.endsWith(".mp4") ||
      materialUrl.endsWith(".webm") ||
      materialUrl.endsWith(".mov") ||
      material.type === "video";
  
    const previewMaterial = {
      name: material.name || material.title || "Untitled Material",
      url: materialUrl,
      type: material.type || "document",
    };
  
    if (isVideo || !isMobile) {
      // For videos (any screen size) or any material on desktop: preview
      setSelectedMaterial(previewMaterial);
      setIsMaterialPreviewOpen(true);
    } else {
      // For non-video materials on mobile: download
      const link = document.createElement("a");
      link.href = previewMaterial.url;
      link.download = previewMaterial.name;
      link.click();
    }
  };

  // Handle archive modal close with optional material selection
  const handleArchiveModalClose = (material = null) => {
    setIsArchiveModalOpen(false)

    // If a material was selected in the archive, preview it
    if (material) {
      handleMaterialClick(material)
    }
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
            <header className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-5 md:p-6 rounded-b-3xl md:rounded-none relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden rounded-b-3xl md:rounded-none">
                <div className="absolute w-20 h-10 md:w-24 md:h-12 bg-white/20 rounded-full top-4 left-[10%]"></div>
                <div className="absolute w-16 h-8 md:w-20 md:h-10 bg-white/20 rounded-full top-10 left-[70%]"></div>

                {/* Animated bubbles */}
                <div className="absolute w-6 h-6 bg-white/10 rounded-full top-20 left-[20%] animate-float-slow"></div>
                <div className="absolute w-8 h-8 bg-white/10 rounded-full top-5 left-[50%] animate-float-medium"></div>
                <div className="absolute w-4 h-4 bg-white/10 rounded-full top-16 left-[80%] animate-float-fast"></div>
              </div>

              <div className="relative z-10 flex items-center gap-4">
                <div className="relative group">
                  <div className="w-16 h-16 rounded-full border-3 border-white bg-orange-100 flex items-center justify-center text-3xl transition-transform transform group-hover:scale-110">
                    {userData.avatar}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold flex flex-col gap-2">
                    <h2 className="font-bold">Merhaba, {user ? user.name : "Misafir"}</h2>
                    <p className="text-xs">{currentDate}</p>
                  </div>
                </div>

                {/* Responsive Sign Out Button */}
                <button
                  className="absolute right-4 sm:right-8 top-[75%] sm:top-[75%] transform -translate-y-1/2 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-1 sm:gap-2"
                  onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                >
                  <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Çıkış Yap</span>
                </button>
              </div>

              {/* Progress Bar Design */}
              <div className="mt-5 relative z-10">
                <div className="flex justify-between mb-2 text-sm">
                  <div>Günlük İlerleme</div>
                  <div className="font-bold">
                    {completedTasks}/{totalTasks} görev
                  </div>
                </div>
                <div className="h-8 bg-white/20 rounded-full overflow-hidden relative backdrop-blur-sm">
                  {/* Progress Bar */}
                  {totalTasks > 0 ? (
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${progressPercentage}%` }}>
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="w-full h-full bg-white/20 transform -translate-x-full animate-shimmer"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full w-0"></div>
                  )}

                  {/* Progress Star */}
                  {progressPercentage > 0 && (
                    <div
                      className="absolute top-1/2 z-10 flex items-center justify-center"
                      style={{
                        left: `${progressPercentage}%`,
                        transform: `translateX(-50%) translateY(-50%)`,
                      }}
                    >
                      <div className="text-2xl animate-bounce">⭐</div>
                    </div>
                  )}

                  {/* Progress Points */}
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-between px-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          (index + 1) * 20 <= progressPercentage ? "bg-white" : "bg-white/30"
                        } ${(index + 1) * 20 <= progressPercentage ? "scale-100" : "scale-75"} transition-all`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <div className="px-5 py-4 md:px-6">
              {/* Calendar Component */}
              <DailyCalendar days={calendarData} selectedDay={selectedDay} onSelectDay={handleDaySelect} />

              {/* Learning Path Section */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-orange-600 mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                    🚶
                  </span>
                  Öğrenme Yolculuğum
                </h2>

                <div className="relative px-2.5 mb-6">
                  {/* Background line */}
                  {learningPath.length > 0 && (
                    <div className="absolute top-0 bottom-0 left-[35px] w-1.5 bg-gray-200 rounded z-0"></div>
                  )}

                  {/* Progress line - only show if there are completed tasks */}
                  {completedTasks > 0 && learningPath.length > 0 && (
                    <div
                      className="absolute top-0 left-[35px] w-1.5 bg-gradient-to-b from-green-500 to-green-400 rounded z-0"
                      style={{
                        height: `${(completedTasks / totalTasks) * (learningPath.length * 120)}px`,
                      }}
                    ></div>
                  )}

                  {/* Tasks */}
                  <div className="relative z-10 flex flex-col gap-6">
                    {learningPath.length > 0 ? (
                      learningPath.map((task, index) => (
                        <div key={task.id} className="flex gap-4 items-start">
                          {/* Task Icon */}
                          <div
                            className={`
            w-[70px] h-[70px] rounded-full flex items-center justify-center text-3xl
            border-3 relative z-10 transition-all duration-300
            ${
              task.completed
                ? "border-green-500 bg-green-50 text-green-500 hover:shadow-md hover:shadow-green-200 hover:scale-105"
                : task.current
                  ? "border-blue-500 bg-blue-50 text-blue-500 animate-slow-bounce hover:shadow-md hover:shadow-blue-200"
                  : "border-gray-300 bg-white text-gray-400 hover:border-gray-400 hover:text-gray-500"
            }
          `}
                          >
                            {task.icon}
                          </div>

                          {/* Task Details */}
                          <div
                            className={`
            flex-1 bg-white rounded-2xl p-4 shadow
            border-2 transition-all duration-200
            ${
              task.completed
                ? "border-green-200 hover:border-green-300 hover:shadow-md"
                : task.current
                  ? "border-blue-200 hover:border-blue-300 hover:shadow-md"
                  : "border-gray-200 hover:border-gray-300"
            }
          `}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-bold text-base">{task.title}</h3>
                              {task.completed && (
                                <span className="text-green-500 transform transition-transform hover:scale-110">
                                  ✅
                                </span>
                              )}
                            </div>

                            <div className="text-sm text-gray-600 mb-3 flex items-center gap-1.5">
                              {task.typeIcon} {task.description}
                            </div>

                            {/* Task Button */}
                            <div className="flex justify-between items-center">
                              <button
                                className={`
                py-2 px-4 rounded-full text-sm font-bold text-white flex items-center gap-1 whitespace-nowrap transition-all
                ${task.completed ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
              `}
                                onClick={() => {
                                  setSelectedTask(task)
                                  setIsTaskPopupOpen(true)
                                }}
                              >
                                <span className="flex items-center justify-center gap-1">
                                  {task.completed ? (
                                    <>
                                      <span>✓</span> Tamamlandı
                                    </>
                                  ) : (
                                    <>
                                      <span>▶️</span> Başlat
                                    </>
                                  )}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-gray-100 rounded-2xl p-6 border-2 border-dashed border-gray-300 text-center text-gray-500 italic">
                        Bu gün için görev bulunmamaktadır.
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Extra Materials Toggle Section */}
              <div className="mb-8">
                <div
                  className={`
                    bg-white border-2 rounded-xl overflow-hidden transition-all duration-300 shadow-md
                    ${extraMaterialsOpen ? "border-orange-300" : "border-gray-200 hover:border-orange-200"}
                  `}
                >
                  {/* Toggle Header */}
                  <button
                    onClick={() => setExtraMaterialsOpen(!extraMaterialsOpen)}
                    className={`
                      w-full px-5 py-4 flex items-center justify-between 
                      transition-colors duration-200
                      ${extraMaterialsOpen ? "bg-orange-50" : "hover:bg-orange-50/50"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl transition-transform hover:scale-110">
                        📚
                      </span>
                      <h2 className="text-lg font-bold text-orange-600">Ekstra Materyaller</h2>
                    </div>
                    <div className={`transition-transform duration-300 ${extraMaterialsOpen ? "rotate-180" : ""}`}>
                      <ChevronDown className="h-6 w-6 text-orange-500" />
                    </div>
                  </button>

                  {/* Materials List */}
                  <AnimatePresence>
                    {extraMaterialsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 py-3 border-t border-orange-100">
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {extraMaterials.map((material) => (
                              <li key={material.id}>
                                <button
                                  onClick={() => handleMaterialClick(material)}
                                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left group"
                                >
                                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-orange-100 flex items-center justify-center text-xl">
                                    {getMaterialIcon(material)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-gray-800 truncate">{material.name}</h3>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                      {material.type === "video" ? (
                                        <Video className="h-3.5 w-3.5 mr-1" />
                                      ) : (
                                        <FileText className="h-3.5 w-3.5 mr-1" />
                                      )}
                                      <span>{material.type === "video" ? "Video" : "Doküman"}</span>
                                    </div>
                                  </div>
                                  <div className="text-gray-400 group-hover:text-orange-500 transition-colors">
                                    {material.type === "video" || !isMobile ? (
                                      <ExternalLink className="h-5 w-5" />
                                    ) : (
                                      <Download className="h-5 w-5" />
                                    )}
                                  </div>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Archive Button Section */}
              <div className="mb-8">
                <button
                  onClick={() => setIsArchiveModalOpen(true)}
                  className="w-full bg-white border-2 border-gray-200 hover:border-orange-200 rounded-xl px-5 py-4 flex items-center justify-between transition-all duration-200 shadow-md hover:shadow-lg hover:bg-orange-50/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl transition-transform hover:scale-110">
                      🗄️
                    </span>
                    <h2 className="text-lg font-bold text-orange-600">Arşiv</h2>
                  </div>
                  <Calendar className="h-6 w-6 text-orange-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation - Only visible on mobile and tablet */}
        <nav className="fixed lg:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 shadow-lg z-10">
          <div className="max-w-lg md:max-w-2xl mx-auto flex justify-around">
            {[
              { label: "Ana Sayfa", icon: "🏠", active: true },
              { label: "Keşfet", icon: "🧭", active: false },
              { label: "Başarılar", icon: "🏆", active: false, badge: 3 },
              { label: "Profil", icon: "👤", active: false },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center relative cursor-pointer transition-transform hover:scale-110 ${
                  item.active ? "text-orange-500" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-xs">{item.label}</div>
                {item.badge && (
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {item.badge}
                  </div>
                )}
                {item.active && <div className="absolute -bottom-3 w-1.5 h-1.5 rounded-full bg-orange-500"></div>}
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* MODALS  */}

      {/* Task Popup Modal */}
      <AnimatePresence>
        {isTaskPopupOpen && selectedTask && (
          <motion.div
            key="task-popup"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg m-auto">
              <h2 className="text-xl font-bold mb-4">{selectedTask.title}</h2>
              <p className="text-gray-700 mb-6">{selectedTask.description}</p>

              {selectedTask.materials?.length > 0 && (
                <>
                  <h3 className="font-bold text-lg mb-2">Materyaller</h3>
                  <ul className="space-y-2 mb-4">
                    {selectedTask.materials.map((material, index) => (
                      <li key={index} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-lg">
                          {material.url && (material.url.endsWith(".mp4") || material.url.endsWith(".webm"))
                            ? "🎬"
                            : "📄"}
                        </div>
                        <button
                          onClick={() => handleMaterialClick(material)}
                          className="flex-1 text-left text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          {material.name}
                        </button>
                        <div className="text-gray-400">
                          {(material.url && (material.url.endsWith(".mp4") || material.url.endsWith(".webm"))) ||
                          !isMobile ? (
                            <ExternalLink className="h-4 w-4" />
                          ) : (
                            <Download className="h-4 w-4" />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => setIsTaskPopupOpen(false)}
                >
                  Kapat
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Material Preview Modal */}
      <AnimatePresence>
        {isMaterialPreviewOpen && selectedMaterial && (
          <motion.div
            key="material-preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl m-auto max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold">{selectedMaterial.name}</h2>
                <div className="flex gap-2">
                  {selectedMaterial.url &&
                    !selectedMaterial.type === "video" &&
                    !(selectedMaterial.url.endsWith(".mp4") || selectedMaterial.url.endsWith(".webm")) && (
                      <button
                        onClick={() => {
                          const link = document.createElement("a")
                          link.href = selectedMaterial.url
                          link.download = selectedMaterial.name
                          link.click()
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                      >
                        <Download className="h-4 w-4" />
                        <span>İndir</span>
                      </button>
                    )}
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                    onClick={() => setIsMaterialPreviewOpen(false)}
                  >
                    <span>Kapat</span>
                  </button>
                </div>
              </div>

              <div className="flex-grow w-full h-[60vh] sm:h-[70vh] overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                {selectedMaterial.url &&
                (selectedMaterial.url.endsWith(".mp4") ||
                  selectedMaterial.url.endsWith(".webm") ||
                  selectedMaterial.type === "video") ? (
                  <ReactPlayer
                    url={selectedMaterial.url}
                    controls
                    width="100%"
                    height="100%"
                    config={{
                      file: {
                        attributes: {
                          controlsList: "nodownload",
                          disablePictureInPicture: true,
                        },
                      },
                    }}
                  />
                ) : (
                  <iframe
                    src={selectedMaterial.url || "about:blank"}
                    className="w-full h-full border-0"
                    title={selectedMaterial.name}
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Archive Modal */}
      <AnimatePresence>
        {isArchiveModalOpen && (
          <ArchiveModal onClose={handleArchiveModalClose} materials={MATERIALS_DATA} isMobile={isMobile} />
        )}
      </AnimatePresence>
    </div>
  )
}