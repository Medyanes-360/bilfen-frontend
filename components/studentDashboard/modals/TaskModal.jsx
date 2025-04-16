import { useModalCompletion } from "@/hooks/useModalCompletion";
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from "framer-motion";
import { ExternalLink, Download, X } from "lucide-react";

export default function TaskModal({
  task,
  onCompleteTask,
  onMaterialClick,
  isMobile,
  completedTasks,
  setCompletedTasks,
  setSelectedDayContents,
  setContents,
  setIsTaskPopupOpen,
  setIsModalOpen,
}) {
  if (!task) return null;



  /*   const markTaskAsCompleted = async (taskId) => {
      try {
        await fetch(`/api/contents/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: true }),
        });
  
        setIsCompleted(true);
      } catch (error) {
        console.error("Görev tamamlanamadı:", error);
      }
    }; */

  /*   const handleCompleteTask = useCallback(async (taskId) => {
      try {
        console.log('Marking task as completed:', taskId);
  
        // Update the selected day contents
        setSelectedDayContents((prevContents) => {
          const updatedContents = prevContents.map((content) => {
            if (content.id === taskId) {
              return { ...content, isCompleted: true };
            }
            return content;
          });
          return updatedContents;
        });
  
        // update the main contents state
        setContents((prevContents) => {
          const updatedContents = prevContents.map((content) => {
            if (content.id === taskId) {
              return { ...content, isCompleted: true };
            }
            return content;
          });
          return updatedContents;
        });
  
        setIsTaskPopupOpen(false); // close the modal
      } catch (error) {
        console.error("Error completing task:", error);
      }
    }, [setSelectedDayContents, setContents, setIsTaskPopupOpen]); */

  /*   useEffect(() => {
      if (timerStarted) {
        const timer = setTimeout(() => {
          if (!isCompleted) {
            markTaskAsCompleted(task._id); // auto complete task after 30 seconds
            handleCompleteTask(task._id); // update state
          }
        }, materialCheckTime);
  
        return () => clearTimeout(timer); // clean up timeout
      }
    }, [timerStarted, task._id, isCompleted, markTaskAsCompleted, handleCompleteTask]); */

  const [timerStarted, setTimerStarted] = useState(false); // timer control 
  const [isCompleted, setIsCompleted] = useState(task?.completed); // track completion 
  const materialCheckTime = 30_000;

  // Modal completion logic
  const { onOpen, onClose } = useModalCompletion(
    materialCheckTime,
    async () => {
      if (!isCompleted) {
        try {
          const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${task?.id}`;
          await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: true }),
          });

          setIsCompleted(true); // update completion status
        } catch (error) {
          console.log("Hata: ", error);
        }
      }

      return null;
    }
  );

  const handleOpenModal = async () => {
    setIsModalOpen(true); // Ensure this is passed correctly
    onOpen();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Ensure this is passed correctly
    onClose();
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

        <p className="text-gray-700 mb-6 leading-relaxed">{task.description}</p>

        {/* Complete Task Button - Only show if task is not completed */}
        {/* {!isCompleted && (
          <div className="mb-5">
            <button
              onClick={() => handleCompleteTask(task._id)}
              className="cursor-pointer w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-sm hover:shadow"
            >
              Görevi Tamamla
            </button>
          </div>
        )} */}

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
