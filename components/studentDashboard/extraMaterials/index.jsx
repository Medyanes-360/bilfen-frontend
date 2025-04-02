"use client"

import { ChevronDown, FileText, Video, ExternalLink, Download } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getMaterialIcon } from "@/data/iconMockData"

export default function ExtraMaterials({
  extraMaterials,
  extraMaterialsOpen,
  setExtraMaterialsOpen,
  onMaterialClick,
  isMobile,
}) {
  return (
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
                {extraMaterials.length > 0 ? (
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {extraMaterials.map((material) => (
                      <li key={material._id}>
                        <button
                          onClick={() => onMaterialClick(material)}
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
                ) : (
                  <div className="text-center py-6 text-gray-500">Ekstra materyal bulunmamaktadır.</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
