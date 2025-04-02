"use client"

import { Calendar } from "lucide-react"

export default function ArchiveButton({ onClick }) {
  return (
    <div className="mb-8">
      <button
        onClick={onClick}
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
  )
}
