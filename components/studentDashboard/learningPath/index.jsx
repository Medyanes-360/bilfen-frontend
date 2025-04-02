"use client"

export default function LearningPath({ learningPath, completedTasks, totalTasks, onTaskClick }) {
  return (
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
            learningPath.map((task) => <TaskItem key={task._id} task={task} onClick={() => onTaskClick(task)} />)
          ) : (
            <div className="bg-gray-100 rounded-2xl p-6 border-2 border-dashed border-gray-300 text-center text-gray-500 italic">
              Bu gün için görev bulunmamaktadır.
            </div>
          )}
        </div>
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
          {task.completed && <span className="text-green-500 transform transition-transform hover:scale-110">✅</span>}
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
