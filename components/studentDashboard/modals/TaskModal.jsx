"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Download, X } from "lucide-react";

export default function TaskModal({
  task,
  onClose,
  onCompleteTask,
  onMaterialClick,
  isMobile,
  completedTasks,
  setCompletedTasks,
  setSelectedDayContents,
  setContents,
  setIsTaskPopupOpen,
}) {
  if (!task) return null;

  useEffect(() => {
    return () => {
      if (task?.fileBlobUrl) {
        URL.revokeObjectURL(task.fileBlobUrl);
      }
    };
  }, [task]);

  const handleCompleteTask = useCallback(
    (taskId) => {
      try {
        console.log("Marking task as completed:", taskId);

        // Update the selected day contents
        setSelectedDayContents((prevContents) => {
          const updatedContents = prevContents.map((content) => {
            if (content._id === taskId) {
              console.log("Updating selected day contents:", content);
              return { ...content, completed: true };
            }
            return content;
          });
          console.log("Updated selected day contents:", updatedContents);
          return updatedContents;
        });

        // Update the main contents state as well
        setContents((prevContents) => {
          const updatedContents = prevContents.map((content) => {
            if (content._id === taskId) {
              console.log("Updating main contents:", content);
              return { ...content, completed: true };
            }
            return content;
          });
          console.log("Updated main contents:", updatedContents);
          return updatedContents;
        });

        setIsTaskPopupOpen(false);
      } catch (error) {
        console.error("Error completing task:", error);
      }
    },
    [setSelectedDayContents, setContents]
  );

  const handleTaskProgress = useCallback(() => {
    try {
      console.log("Marking task as in progress:", task._id);

      // Update the selected day contents
      setSelectedDayContents((prevContents) => {
        const updatedContents = prevContents.map((content) => {
          if (content._id === task._id) {
            console.log("Updating selected day contents:", content);
            return { ...content, inProgress: true };
          }
          return content;
        });
        console.log("Updated selected day contents:", updatedContents);
        return updatedContents;
      });

      // Update the main contents state as well
      setContents((prevContents) => {
        const updatedContents = prevContents.map((content) => {
          if (content._id === task._id) {
            console.log("Updating main contents:", content);
            return { ...content, inProgress: true };
          }
          return content;
        });
        console.log("Updated main contents:", updatedContents);
        return updatedContents;
      });
    } catch (error) {
      console.error("Error marking task as in progress:", error);
    }
  }, [setSelectedDayContents, setContents]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleCompleteTask(task._id);
    }, 30000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [handleCompleteTask, task._id]);

  useEffect(() => {
    handleTaskProgress();
  }, [handleTaskProgress]);

  return (
    <motion.div
      key="task-popup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 p-2 sm:p-4"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white w-full max-w-[92vw] sm:max-w-lg md:max-w-xl m-auto rounded-2xl shadow-2xl border border-gray-200 p-4 sm:p-8 max-h-[90vh] overflow-y-auto transition-all"
      >
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">{task.description}</p>

        {task.materials?.length > 0 && (
          <>
            <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-sm text-orange-600">
                📚
              </span>
              Materyaller
            </h3>
            <ul className="space-y-2 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
              {task.materials.map((material, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg">
                    {material.url &&
                    (material.url.endsWith(".mp4") ||
                      material.url.endsWith(".webm"))
                      ? "🎬"
                      : "📄"}
                  </div>
                  <button
                    onClick={() => onMaterialClick(material)}
                    className="flex-1 text-left text-blue-600 hover:text-blue-700 transition-colors cursor-pointer font-medium"
                  >
                    {material.name}
                  </button>
                  <div className="text-gray-400 hover:text-orange-500 transition-colors">
                    {(material.url &&
                      (material.url.endsWith(".mp4") ||
                        material.url.endsWith(".webm"))) ||
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
          <div className="mb-5">
            <button
              onClick={() => handleCompleteTask(task._id)}
              className="cursor-pointer w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-sm hover:shadow"
            >
              Görevi Tamamla
            </button>
          </div>
        )}

        {task?.fileBlobUrl && (
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2 text-gray-800">
              Dosya Önizleme
            </h3>
            <iframe
              src={task.fileBlobUrl}
              width="100%"
              height="500px"
              className="rounded-lg border"
            />
          </div>
        )}

        <div className="flex justify-end">
          <button
            className="cursor-pointer bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            onClick={onClose}
          >
            Kapat
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}