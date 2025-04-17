import { useModalCompletion } from "@/hooks/useModalCompletion";
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from "framer-motion";
import { ExternalLink, Download, X } from "lucide-react";

export default function TaskModal({
  task,
  onCompleteTask,
  onMaterialClick,
  isMobile,
  setSelectedDayContents,
  setContents,
  setIsTaskPopupOpen,
}) {
  if (!task || !task._id) return null;

  const [timerStarted, setTimerStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task?.completed);
  const [fileUrl, setFileUrl] = useState(null);
  const materialCheckTime = 30_000;

  // Modal completion logic
  const { onOpen, onClose } = useModalCompletion(
    materialCheckTime,
    async () => {
      if (!isCompleted) {
        try {
          const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${task?._id}`;
          const response = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: true }),
          });

          if (!response.ok) {
            throw new Error('Failed to update task');
          }

          setIsCompleted(true);
          onCompleteTask(task._id);
          
          // Update the selected day contents
          setSelectedDayContents((prevContents) => {
            return prevContents.map((content) => {
              if (content._id === task._id) {
                return { ...content, completed: true };
              }
              return content;
            });
          });

          // Update the main contents state
          setContents((prevContents) => {
            return prevContents.map((content) => {
              if (content._id === task._id) {
                return { ...content, completed: true };
              }
              return content;
            });
          });
        } catch (error) {
          console.error("Error updating task:", error);
          setTimerStarted(false);
        }
      }
    }
  );

  // Fetch file when modal opens
  useEffect(() => {
    const fetchFile = async () => {
      if (task?.fileUrl) {
        try {
          // take the filename from the URL
          const filename = task.fileUrl.split('/').pop();
          console.log("Extracted filename:", filename);

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/file/view?fileUrl=${filename}`
          );

          if (response.ok) {
            const blob = await response.blob();
            const fileURL = URL.createObjectURL(blob);
            setFileUrl(fileURL);
          } else {
            console.error("File fetch response status:", response.status);
            console.error("File fetch response text:", await response.text());
          }
        } catch (error) {
          console.error("Error fetching file:", error);
        }
      }
    };

    if (!timerStarted) {
      onOpen();
      setTimerStarted(true);
      fetchFile();
    }
  }, [onOpen, timerStarted, task?.fileUrl]);

  const handleCloseModal = () => {
    onClose();
    setIsTaskPopupOpen(false);
    setFileUrl(null);
  };

  return (
    <motion.div
      key="task-popup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md md:max-w-lg m-auto border border-gray-100"
      >
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
          <button
            onClick={handleCloseModal}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700 mb-4 leading-relaxed">{task.description}</p>

          {fileUrl && (
            <div className="w-full">
              {task.type === "video" ? (
                <video
                  src={fileUrl}
                  controls
                  className="w-full rounded-lg"
                />
              ) : (
                <iframe
                  src={fileUrl}
                  className="w-full h-[600px] rounded-lg"
                  title={task.title}
                />
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            className="cursor-pointer bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            onClick={handleCloseModal}
          >
            Kapat
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}