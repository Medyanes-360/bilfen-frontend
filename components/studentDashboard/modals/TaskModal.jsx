"use client"

import { motion } from "framer-motion"
import { ExternalLink, Download } from "lucide-react"

export default function TaskModal({ task, onClose, onCompleteTask, onMaterialClick, isMobile }) {
  if (!task) return null

  return (
    <motion.div
      key="task-popup"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg m-auto">
        <h2 className="text-xl font-bold mb-4">{task.title}</h2>
        <p className="text-gray-700 mb-6">{task.description}</p>

        {task.materials?.length > 0 && (
          <>
            <h3 className="font-bold text-lg mb-2">Materyaller</h3>
            <ul className="space-y-2 mb-4">
              {task.materials.map((material, index) => (
                <li key={index} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-lg">
                    {material.url && (material.url.endsWith(".mp4") || material.url.endsWith(".webm")) ? "🎬" : "📄"}
                  </div>
                  <button
                    onClick={() => onMaterialClick(material)}
                    className="flex-1 text-left text-blue-500 hover:text-blue-700 transition-colors cursor-pointer "
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

        {/* Complete Task Button - Only show if task is not completed */}
        {!task.completed && (
          <div className="mb-4">
            <button
              onClick={() => onCompleteTask(task._id)}
              className="cursor-pointer w-full py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
            >
              Görevi Tamamla
            </button>
          </div>
        )}

        <div className="flex justify-end">
          <button
            className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            onClick={onClose}
          >
            Kapat
          </button>
        </div>
      </div>
    </motion.div>
  )
}
