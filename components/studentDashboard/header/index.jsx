"use client"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { useState } from "react"

export default function DashboardHeader({
  userData,
  session,
  currentDate,
  completedTasks,
  totalTasks,
  progressPercentage,
}) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <header className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-5 md:p-6 rounded-b-3xl md:rounded-none relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden rounded-b-3xl md:rounded-none">
        <div className="absolute w-20 h-10 md:w-24 md:h-12 bg-white/20 rounded-full top-4 left-[10%]"></div>
        <div className="absolute w-16 h-8 md:w-20 md:h-10 bg-white/20 rounded-full top-10 left-[70%]"></div>

        {/* Animated bubbles */}
        <div className="absolute w-6 h-6 bg-white/10 rounded-full top-20 left-[20%] animate-float-slow"></div>
        <div className="absolute w-8 h-8 bg-white/10 rounded-full top-5 left-[50%] animate-float-medium"></div>
        <div className="absolute w-4 h-4 bg-white/10 rounded-full top-16 left-[80%] animate-float-fast"></div>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative group">
            <div className="w-16 h-16 rounded-full border-3 border-white bg-orange-100 flex items-center justify-center text-3xl transition-transform transform group-hover:scale-110">
              {userData?.avatar || "👤"}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold flex flex-col gap-2">
              <h2 className="font-bold">Merhaba, {userData?.name || session?.user?.name || "Misafir"}</h2>
              <p className="text-xs">{currentDate}</p>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="mt-2 sm:mt-0 self-end sm:self-center">
          <button
            className="group relative overflow-hidden rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 transition-all duration-300 hover:bg-white/20 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-orange-500 cursor-pointer"
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="absolute inset-0 overflow-hidden">
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            </span>

            <span className="relative flex items-center gap-2">
              <LogOut
                className={`h-4 w-4 transition-all duration-300 ${isHovering ? "text-red-300 rotate-12" : "text-white"}`}
              />
              <span className="hidden sm:inline font-medium">Çıkış Yap</span>
            </span>
          </button>
        </div>
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
                className={`w-2 h-2 rounded-full ${(index + 1) * 20 <= progressPercentage ? "bg-white" : "bg-white/30"
                  } ${(index + 1) * 20 <= progressPercentage ? "scale-100" : "scale-75"} transition-all`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
