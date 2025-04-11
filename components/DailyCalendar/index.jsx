"use client"

import { useState, useEffect } from "react"

// accept accessSettings prop
const DailyCalendar = ({ days, selectedDay, onSelectDay, accessSettings = null }) => {
  const [startIndex, setStartIndex] = useState(0) // the first visible day
  const visibleDaysCount = 7 // 7 visible days at once

  // current day is visible on page load
  useEffect(() => {
    const todayIndex = days.findIndex((d) => d.isToday)
    if (todayIndex !== -1) {
      const start = Math.max(0, todayIndex - Math.floor(visibleDaysCount / 2))
      setStartIndex(start)
    }
  }, [days])

  // Get the visible days based on the current startIndex
  const visibleDays = days.slice(startIndex, startIndex + visibleDaysCount)

  // Handle left arrow click
  const handleScrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1)
    }
  }

  // Handle right arrow click
  const handleScrollRight = () => {
    if (startIndex + visibleDaysCount < days.length) {
      setStartIndex((prev) => prev + 1)
    }
  }

  // to determine if a day is in the past
  const isPastDay = (day) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dayDate = new Date(day.date)
    dayDate.setHours(0, 0, 0, 0)
    return dayDate < today
  }

  // to determine if a day is in the future
  const isFutureDay = (day) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dayDate = new Date(day.date)
    dayDate.setHours(0, 0, 0, 0)
    return dayDate > today
  }

  // check if day is accessible based on access settings
  const isDayAccessible = (day) => {
    if (day.isToday) return true
    if (!accessSettings) return false

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dayDate = new Date(day.date)
    dayDate.setHours(0, 0, 0, 0)

    // Calculate days difference
    const diffTime = Math.abs(dayDate - today)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    // Check if within allowed range
    return diffDays <= accessSettings.studentDays
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between gap-x-4 mb-4">
        <h2 className="text-xl font-bold text-orange-600 flex items-center gap-2">
          <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center transition-transform hover:scale-110">
            📅
          </span>
          Günlük Takvim
        </h2>
      </div>

      <div className="relative w-full">
        {/* Calendar Container */}
        <div className="flex items-center justify-between w-full">
          {/* Left Arrow */}
          <button
            onClick={handleScrollLeft}
            disabled={startIndex === 0}
            className={`w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 z-10 transition-all duration-200 ${startIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-orange-50 hover:text-orange-500 hover:shadow-lg"
              }`}
            aria-label="Previous days"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Visible Days - Full Width */}
          <div className="flex flex-1 justify-between px-2 gap-x-2">
            {visibleDays.map((day) => {
              const isPast = isPastDay(day)
              const isFuture = isFutureDay(day)
              const isAccessible = accessSettings ? isDayAccessible(day) : day.isToday

              return (
                <div
                  key={day.date.toISOString()} // Ensure a unique key
                  data-today={day.isToday ? "true" : "false"}
                  onClick={() => {
                    if (day.isToday || isAccessible) {
                      onSelectDay(day) // allowing selection for today and accessible days
                    }
                  }}
                  className={`flex flex-col items-center py-3 rounded-xl transition-all duration-200
                    flex-1
                    ${day.isToday
                      ? "bg-gradient-to-b from-orange-400 to-orange-500 text-white shadow-md shadow-orange-200 cursor-pointer"
                      : isAccessible
                        ? "bg-gray-50 hover:bg-gray-100 cursor-pointer"
                        : "bg-gray-100 cursor-not-allowed"
                    }
                    ${selectedDay && day.date.toDateString() === selectedDay.date.toDateString() && !day.isToday
                      ? "ring-2 ring-orange-300 shadow-md"
                      : "hover:shadow-sm hover:translate-y-[-2px]"
                    }
                    ${isPast && !isAccessible ? "opacity-70" : ""}`}
                >
                  <div className={`text-sm font-medium ${day.isToday ? "text-white/90" : "text-gray-600"}`}>
                    {day.weekday}
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center my-1.5
                      ${day.isToday
                        ? "bg-white text-orange-500 font-bold shadow-inner"
                        : isAccessible
                          ? "bg-white/70 text-gray-700 font-medium"
                          : "bg-white/70 text-gray-500"
                      }
                      ${selectedDay && day.date.toDateString() === selectedDay.date.toDateString() && !day.isToday ? "ring-1 ring-orange-200" : ""}
                      transition-transform duration-200 ${day.isToday ? "hover:scale-110" : ""}`}
                  >
                    {day.day} {/* Display just the day number */}
                  </div>

                  {day.isToday ? (
                    <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full text-white font-medium truncate max-w-full">
                      Bugün
                    </span>
                  ) : isPast ? (
                    <span className="text-xs text-gray-400 italic truncate max-w-full">
                      {isAccessible ? "Geçmiş" : "Erişilemez"}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400 italic truncate max-w-full">
                      {isAccessible ? "Yakında" : "Erişilemez"}
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleScrollRight}
            disabled={startIndex + visibleDaysCount >= days.length}
            className={`w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 z-10 transition-all duration-200 ${startIndex + visibleDaysCount >= days.length
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-orange-50 hover:text-orange-500 hover:shadow-lg"
              }`}
            aria-label="Next days"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default DailyCalendar;
