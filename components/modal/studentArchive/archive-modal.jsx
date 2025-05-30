"use client"

import { useMemo, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FileText, Video, Download, ExternalLink, X } from "lucide-react"
import { getMaterialIcon } from "@/data/iconMockData"

export default function ArchiveModal({ onClose, materials, accessSettings, isMobile }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [pastDays, setPastDays] = useState([])

  // processing materials to extract dates && check accessibility
  useEffect(() => {
    if (!materials || materials.length === 0) {
      console.warn("No materials provided to Archive Modal")
      return
    }

    try {
      const days = []
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // Get unique dates from materials
      const uniqueDates = [
        ...new Set(
          materials
            .map((material) => {
              // Check if date exists and is valid
              if (!material.date) {
                console.warn("Material missing date property:", material)
                return null
              }
              return material.date
            })
            .filter(Boolean),
        ),
      ]

      // sorting dates (newest first)
      uniqueDates.sort((a, b) => new Date(b) - new Date(a))

      // date objects for each unique date and check accessibility
      uniqueDates.forEach((dateStr) => {
        try {
          const date = new Date(dateStr)
          if (!isNaN(date.getTime())) {
            // check if this date is accessible based on admin settings
            const isAccessible = isDateAccessible(date, accessSettings)

            days.push({
              date,
              isAccessible,
            })
          } else {
            console.warn("Invalid date string:", dateStr)
          }
        } catch (error) {
          console.error("Error parsing date:", dateStr, error)
        }
      })

      setPastDays(days)

      // auto select the first accessible date if it's available
      if (days.length > 0 && !selectedDate) {
        const firstAccessibleDay = days.find((day) => day.isAccessible)
        if (firstAccessibleDay) {
          setSelectedDate(firstAccessibleDay.date)
        } else {
          // if no accessible days, don't auto-select
          setSelectedDate(null)
        }
      }
    } catch (error) {
      console.error("Error processing materials for dates:", error)
    }
  }, [materials, selectedDate, accessSettings])

  // check if a date is accessible based on access settings
  const isDateAccessible = (date, settings) => {
    if (!settings) return false

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Calculate days difference
    const diffTime = Math.abs(today - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays <= settings?.studentDays
  }

  const formattedDate = (date) => {
    if (!date) return ""
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(date.getDate()).padStart(2, "0")}`
  }

  const filteredMaterials = useMemo(() => {
    if (!selectedDate) return []
    const selectedKey = formattedDate(selectedDate)
    return materials.filter((material) => material.date === selectedKey)
  }, [selectedDate, materials])

  const getMonthLabel = (date) => {
    if (!date) return ""
    return date.toLocaleDateString("tr-TR", { month: "long", year: "numeric" })
  }

  // Handle material click
  const handleMaterialClick = (material) => {
    const isVideo =
      material.type === "video" ||
      (material.content &&
        (material.content.endsWith(".mp4") || material.content.endsWith(".webm") || material.content.endsWith(".mov")))

    if (isVideo || !isMobile) {
      // For videos (any screen size) or any material on desktop: preview
      onClose()
      // Pass the material to the parent component for preview
      if (typeof onClose === "function") {
        onClose(material)
      }
    } else {
      // For non-video materials on mobile: download
      const link = document.createElement("a")
      link.href = material.content
      link.download = material.title
      link.click()
    }
  }

  // Handle day selection - only allow selecting accessible days
  const handleDaySelect = (day) => {
    if (day.isAccessible) {
      setSelectedDate(day.date)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-3">
            <span className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl">🗄️</span>
            Arşiv
          </h2>
          {selectedDate && <div className="text-sm font-medium text-gray-500">{getMonthLabel(selectedDate)}</div>}
          <button
            onClick={() => onClose()}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row max-h-[calc(90vh-130px)] overflow-hidden">
          {/* Left side: Days */}
          <div className="md:w-1/4 md:border-r h-[40vh] md:h-[70vh] overflow-y-auto">
            <div className="flex md:flex-col p-4 gap-3 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto no-scrollbar">
              {pastDays.length > 0 ? (
                pastDays.map((day, index) => {
                  const isSelected = selectedDate && day.date.toDateString() === selectedDate.toDateString()

                  return (
                    <button
                      key={index}
                      onClick={() => handleDaySelect(day)}
                      className={`
                        flex flex-col items-center justify-center p-2 sm:p-3 min-w-[70px] sm:min-w-[85px] rounded-xl
                        transition-all duration-300 ease-in-out 
                        ${day.isAccessible ? "cursor-pointer hover:shadow-md hover:scale-105 active:scale-95" : "cursor-not-allowed opacity-60"}
                        focus:outline-none focus:ring-2 focus:ring-orange-400
                        ${isSelected
                          ? "transform -translate-y-1 shadow-lg border-2 border-orange-400 scale-105 bg-orange-500 text-white"
                          : day.isAccessible
                            ? "shadow-sm border border-gray-200 hover:border-orange-200 bg-white text-gray-800"
                            : "shadow-sm border border-gray-200 bg-gray-50 text-gray-500"
                        }
                      `}
                    >
                      <span className="text-xs font-medium mb-1">
                        {day.date.toLocaleDateString("tr-TR", { weekday: "short" })}
                      </span>
                      <span className="text-xl font-bold">{day.date.getDate()}</span>
                      {!day.isAccessible && <span className="text-xs text-gray-500 mt-1 italic">Erişim Kısıtlı</span>}
                    </button>
                  )
                })
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full text-gray-400 p-4">
                  <div className="text-3xl mb-2">🗄️</div>
                  <p className="text-center text-sm italic">Arşivlenmiş içerik bulunamadı.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right side: Materials */}
          <div className="flex-1 h-[40vh] md:h-[70vh] overflow-y-auto p-4">
            {selectedDate ? (
              filteredMaterials.length > 0 ? (
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredMaterials.map((material, idx) => (
                    <li key={material.id || idx}>
                      <button
                        onClick={() => handleMaterialClick(material)}
                        className="w-full flex items-start gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left group border border-gray-200 hover:border-orange-200 hover:shadow-md cursor-pointer"
                      >
                        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-orange-100 flex items-center justify-center text-xl mt-1">
                          {getMaterialIcon(material)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-800 line-clamp-2">{material.title}</h3>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{material.description}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-2">
                            {material.type === "video" ? (
                              <Video className="h-3.5 w-3.5 mr-1" />
                            ) : material.type === "game" ? (
                              <span className="mr-1">🎮</span>
                            ) : material.type === "quiz" ? (
                              <span className="mr-1">📝</span>
                            ) : (
                              <FileText className="h-3.5 w-3.5 mr-1" />
                            )}
                            <span className="mr-3">
                              {material.type === "video"
                                ? "Video"
                                : material.type === "game"
                                  ? "Oyun"
                                  : material.type === "quiz"
                                    ? "Quiz"
                                    : "Doküman"}
                            </span>
                            <span>{material.duration}</span>
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
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <div className="text-5xl mb-4">📭</div>
                  <p className="text-center italic">Bu tarih için materyal bulunmamaktadır.</p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <div className="text-5xl mb-4">📅</div>
                <p className="text-center italic">
                  {pastDays.some((day) => day.isAccessible)
                    ? "Lütfen takvimden bir tarih seçin."
                    : "Erişilebilir tarih bulunmamaktadır."}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t flex justify-end p-[10px] md:p-4px]">
          <button
            onClick={() => onClose()}
            className="cursor-pointer px-4 py-0.5 md:py-2 rounded-md text-sm bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
          >
            Kapat
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
