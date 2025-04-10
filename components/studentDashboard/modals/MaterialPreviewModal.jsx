"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

export default function MaterialPreviewModal({ material, onClose, isMobile }) {
  if (!material) return null

  return (
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
          <h2 className="text-lg sm:text-xl font-bold">{material.name}</h2>
          <div className="flex gap-2">
            {material.url &&
              !material.type === "video" &&
              !(material.url.endsWith(".mp4") || material.url.endsWith(".webm")) && (
                <button
                  onClick={() => {
                    const link = document.createElement("a")
                    link.href = material.url
                    link.download = material.name
                    link.click()
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>İndir</span>
                </button>
              )}
            <button
              className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm cursor-pointer "
              onClick={onClose}
            >
              <span>Kapat</span>
            </button>
          </div>
        </div>

        <div className="flex-grow w-full h-[60vh] sm:h-[70vh] overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          {material.url &&
          (material.url.endsWith(".mp4") || material.url.endsWith(".webm") || material.type === "video") ? (
            <ReactPlayer
              url={material.url}
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
              src={material.url || "about:blank"}
              className="w-full h-full border-0"
              title={material.name}
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </motion.div>
  )
}
