"use client"

import { getMaterialIcon } from "@/data/iconMockData"
import { Calendar, Info } from "lucide-react"

export default function LearningPath({
  learningPath,
  completedTasks,
  totalTasks,
  onTaskClick,
  selectedDay,
  selectedDayContents = [],
}) {
  // Use selectedDayContents if there is a selected day that's NOT today && there are contents
  const displayContents =
    selectedDay && !selectedDay.isToday && selectedDayContents.length > 0 ? selectedDayContents : learningPath

  // Calculate progress for the selected day if needed
  const dayCompletedTasks =
    selectedDay && !selectedDay.isToday ? selectedDayContents.filter((task) => task.completed).length : completedTasks

  const dayTotalTasks = selectedDay && !selectedDay.isToday ? selectedDayContents.length : totalTasks

  const progressPercentage = dayTotalTasks > 0 ? (dayCompletedTasks / dayTotalTasks) * 100 : 0

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-orange-600 mb-5 flex items-center gap-2">
        <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center transition-transform hover:scale-110">
          🚶
        </span>
        {selectedDay && !selectedDay.isToday
          ? `${selectedDay.date.toLocaleDateString("tr-TR", { day: "numeric", month: "long" })} İçerikleri`
          : "Öğrenme Yolculuğum"}
      </h2>

      <div className="relative px-2.5 mb-6">
        {/* Show tasks or empty state message */}
        {selectedDay && !selectedDay.isToday && selectedDayContents.length === 0 ? (
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-200 shadow-sm">
            <div className="flex flex-col items-center justify-center text-center gap-3">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Calendar className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-medium text-orange-700">Görev Bulunmamaktadır</h3>
              <p className="text-orange-600/80 max-w-md">
                {selectedDay.date.toLocaleDateString("tr-TR", { day: "numeric", month: "long" })} tarihi için planlanmış
                görev bulunmamaktadır.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Background line - show if there's more than one task */}
            {displayContents.length > 1 && (
              <div className="absolute top-0 bottom-0 left-[35px] w-1.5 bg-gray-200 rounded z-0"></div>
            )}

            {/* Progress line - only show IF there are completed tasks and more than one task */}
            {dayCompletedTasks > 0 && displayContents.length > 1 && (
              <div
                className="absolute top-0 left-[35px] w-1.5 bg-gradient-to-b from-green-500 to-green-400 rounded z-0"
                style={{
                  height: `${(dayCompletedTasks / dayTotalTasks) * (displayContents.length * 120)}px`,
                }}
              ></div>
            )}

            {/* Tasks */}
            <div className="relative z-10 flex flex-col gap-6">
              {displayContents.length > 0 ? (
                displayContents.map((task, i) => (
                  <TaskItem key={task._id || `task-${i}`} task={task} onClick={() => onTaskClick(task)} />
                ))
              ) : (
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200 shadow-sm">
                  <div className="flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                      <Info className="h-8 w-8 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-medium text-orange-700">Bugün için görev bulunmamaktadır</h3>
                    <p className="text-orange-600/80 max-w-md">
                      Bugün için planlanmış herhangi bir görev bulunmamaktadır. Daha sonra tekrar kontrol edebilirsiniz.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function TaskItem({ task, onClick }) {
  return (
    <div className="flex gap-4 items-start">
      {/* Task Icon */}
      <div
        className={`
        w-[70px] h-[70px] rounded-full flex items-center justify-center text-3xl
        border-3 relative z-10 transition-all duration-300
        ${task.completed
            ? "border-green-500 bg-green-50 text-green-500 hover:shadow-md hover:shadow-green-200 hover:scale-105"
            : task.current
              ? "border-blue-500 bg-blue-50 text-blue-500 animate-slow-bounce hover:shadow-md hover:shadow-blue-200"
              : "border-gray-300 bg-white text-gray-400 hover:border-gray-400 hover:text-gray-500"
          }
      `}
      >
        {getMaterialIcon(task)}
      </div>

      {/* Task Details */}
      <div
        className={`
        flex-1 bg-white rounded-2xl p-4 shadow
        border-2 transition-all duration-200
        ${task.completed
            ? "border-green-200 hover:border-green-300 hover:shadow-md"
            : task.current
              ? "border-blue-200 hover:border-blue-300 hover:shadow-md"
              : "border-gray-200 hover:border-gray-300"
          }
      `}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-base">{task.title}</h3>
          {task.completed && <span className="text-green-500 transform transition-transform hover:scale-110">✅</span>}
        </div>

        <div className="text-sm text-gray-600 mb-3 flex items-center gap-1.5">
          {task.typeIcon} {task.description}
        </div>

        {/* Task Button */}
        <div className="flex justify-between items-center">
          <button
            className={`
            py-2 px-4 rounded-full text-sm font-bold text-white flex items-center gap-1 whitespace-nowrap transition-all cursor-pointer 
            ${task.completed ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
          `}
            onClick={onClick}
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
  )
}
