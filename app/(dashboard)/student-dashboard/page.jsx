"use client";

import { buildUrl } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState, useMemo, useCallback } from "react";

// Dashboard Components
import DailyCalendar from "@/components/DailyCalendar";
import ErrorState from "@/components/errorState";
import LoadingState from "@/components/loadingState";
import ArchiveButton from "@/components/studentDashboard/archiveButton";
import BottomNavigation from "@/components/studentDashboard/bottomNav";
import DashboardHeader from "@/components/studentDashboard/header";
import LearningPath from "@/components/studentDashboard/learningPath";

// Modal Components
import ArchiveModal from "@/components/modal/studentArchive/archive-modal";
import MaterialPreviewModal from "@/components/studentDashboard/modals/MaterialPreviewModal";
import TaskModal from "@/components/studentDashboard/modals/TaskModal";

// ModalCompletion hook
import { useModalCompletion } from "@/hooks/useModalCompletion";

export default function Home() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [contents, setContents] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isMaterialPreviewOpen, setIsMaterialPreviewOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [archiveMaterials, setArchiveMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessSettings, setAccessSettings] = useState(null);
  const [selectedDayContents, setSelectedDayContents] = useState([]);

  // Memoize the task completion callback
  const handleCompleteTask = useCallback(async (taskId) => {
    try {
      // update the selected day contents only
      setSelectedDayContents((prevContents) =>
        prevContents.map((content) => {
          if (content._id === taskId) {
            // completed this specific task
            return { ...content, completed: true };
          }
          return content;
        })
      );
      setIsTaskPopupOpen(false);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  }, []);

  // modalCompletion hook with memoized callback
  const { onOpen, onClose } = useModalCompletion(
    30000,
    useCallback(() => {
      if (selectedTask) {
        handleCompleteTask(selectedTask._id);
      }
    }, [selectedTask, handleCompleteTask])
  );

  // memoize derived values
  const learningPath = useMemo(() => {
    return contents.filter((content) => {
      const contentDate = new Date(content.publishDateStudent);
      const today = new Date();
      return contentDate.toDateString() === today.toDateString();
    });
  }, [contents]);

  // memoize progress calculations
  const { completedTasks, totalTasks, progressPercentage } = useMemo(() => {
    const completed = learningPath.filter((task) => task.completed).length;
    const total = learningPath.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    return {
      completedTasks: completed,
      totalTasks: total,
      progressPercentage: percentage,
    };
  }, [learningPath]);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Set current date
  useEffect(() => {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(now.toLocaleDateString("tr-TR", options));
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!session) return;

      try {
        setIsLoading(true);
        const url = buildUrl(process.env.NEXT_PUBLIC_BACKEND_URL);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  // Fetch access settings
  useEffect(() => {
    const fetchAccessSettings = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/access-settings`
        );
        if (response.ok) {
          const data = await response.json();
          setAccessSettings(data);
        }
      } catch (error) {
        console.error("Error fetching access settings:", error);
      }
    };

    fetchAccessSettings();
  }, []);

  // Generate calendar data
  useEffect(() => {
    const generateCalendarData = () => {
      try {
        const today = new Date();
        const days = [];

        for (let i = -15; i <= 15; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);

          const hasTask = contents.some((content) => {
            const contentDate = new Date(content.publishDateStudent);
            return contentDate.toDateString() === date.toDateString();
          });

          days.push({
            date: date,
            day: date.getDate(),
            weekday: date.toLocaleDateString("tr-TR", { weekday: "short" }),
            isToday: i === 0,
            hasTask: hasTask,
          });
        }

        setCalendarData(days);

        // today is the selected day on initial load
        if (!selectedDay) {
          const todayDay = days.find((day) => day.isToday);
          setSelectedDay(todayDay);

          // today's contents
          if (todayDay) {
            const todayContents = contents.filter((content) => {
              const contentDate = new Date(content.publishDateStudent);
              return contentDate.toDateString() === todayDay.date.toDateString()
            });

            setSelectedDayContents(todayContents);
          }
        }
      } catch (error) {
        console.error("Error generating calendar data:", error);
        setError("Failed to generate calendar");
      }
    };

    if (contents.length > 0) {
      generateCalendarData();
    }
  }, [contents, selectedDay]);

  // Fetch all contents
  useEffect(() => {
    const fetchContents = async () => {
      if (!session) return;

      try {
        setIsLoading(true);

        const url = buildUrl(process.env.NEXT_PUBLIC_BACKEND_URL, {
          isPublished: true,
          ageGroup: "3-4 yaş",
          isExtra: false,
        });

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch contents");
        }

        const data = await response.json();

        setContents(data);

        // archive materials -- include ALL past materials
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const archive = data.filter((item) => {
          const itemDate = new Date(item.publishDateStudent);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate < today;
        });

        setArchiveMaterials(archive);
        console.log("Archive: ", archiveMaterials);
      } catch (error) {
        console.error("Error fetching contents:", error);
        setError("Failed to load contents");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContents();
  }, [session]);

  // Memoize the day selection handler
  const handleDaySelect = useCallback(
    (day) => {
      setSelectedDay(day);

      if (day) {
        const selectedDate = day.date.toDateString();
        const dayContents = contents.filter((content) => {
          const contentDate = new Date(content.publishDateStudent);
          return contentDate.toDateString() === selectedDate;
        });

        setSelectedDayContents(dayContents);
      }
    },
    [contents]
  );

  // Memoize the task click handler
  const handleTaskClick = useCallback(
    async (task) => {
      try {
        const fileUrl = task?.fileUrl;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/file/view?fileUrl=${fileUrl}`
        );

        if (response.ok) {
          const updatedTask = await response.json();
          setSelectedTask(updatedTask);
        } else {
          setSelectedTask(task);
        }

        setIsTaskPopupOpen(true);
        onOpen();
      } catch (error) {
        console.error("Error fetching task details:", error);
        setSelectedTask(task);
        setIsTaskPopupOpen(true);
        onOpen();
      }
    },
    [onOpen]
  );

  // Memoize the task modal close handler
  const handleTaskModalClose = useCallback(() => {
    onClose();
    setIsTaskPopupOpen(false);
  }, [onClose]);

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (isTaskPopupOpen || isMaterialPreviewOpen || isArchiveModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isTaskPopupOpen, isMaterialPreviewOpen, isArchiveModalOpen]);

  // Memoize the material click handler
  const handleMaterialClick = useCallback(
    (material) => {
      if (!material) {
        console.error("Material is undefined or null:", material);
        return;
      }

      const materialUrl = material?.url || material?.content;

      if (!materialUrl) {
        console.error("Material URL or content is missing:", material);
        return;
      }

      const isVideo =
        materialUrl.endsWith(".mp4") ||
        materialUrl.endsWith(".webm") ||
        materialUrl.endsWith(".mov") ||
        material.type === "video";

      const previewMaterial = {
        name: material.name || material.title || "Untitled Material",
        url: materialUrl,
        type: material.type || "document",
      };

      if (isVideo || !isMobile) {
        setSelectedMaterial(previewMaterial);
        setIsMaterialPreviewOpen(true);
      } else {
        const link = document.createElement("a");
        link.href = previewMaterial.url;
        link.download = previewMaterial.name;
        link.click();
      }
    },
    [isMobile]
  );

  // Memoize the archive modal close handler
  const handleArchiveModalClose = useCallback(
    (material = null) => {
      setIsArchiveModalOpen(false);

      if (material) {
        handleMaterialClick(material);
      }
    },
    [handleMaterialClick]
  );

  // Loading state
  if (isLoading && !userData && contents.length === 0) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return (
      <ErrorState error={error} onRetry={() => window.location.reload()} />
    );
  }

  // pass accessSettings to the ArchiveModal
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>ÖğrenYap - Çocuklar İçin Eğitim Uygulaması</title>
        <meta name="description" content="Çocuklar için eğitim platformu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto bg-white min-h-screen shadow-lg relative overflow-hidden pb-20">
        <div className="lg:flex lg:flex-row lg:justify-center">
          <div className="lg:w-3/4 mx-auto">
            <DashboardHeader
              userData={userData}
              session={session}
              currentDate={currentDate}
              completedTasks={completedTasks}
              totalTasks={totalTasks}
              progressPercentage={progressPercentage}
            />

            <div className="px-5 py-4 md:px-6">
              <DailyCalendar
                days={calendarData}
                selectedDay={selectedDay}
                onSelectDay={handleDaySelect}
                accessSettings={accessSettings}
              />

              <LearningPath
                learningPath={learningPath}
                completedTasks={completedTasks}
                totalTasks={totalTasks}
                onTaskClick={handleTaskClick}
                selectedDay={selectedDay}
                selectedDayContents={selectedDayContents}
              />

              <ArchiveButton onClick={() => setIsArchiveModalOpen(true)} />
            </div>
          </div>
        </div>

        <BottomNavigation />
      </div>
      
      <AnimatePresence>
        {isTaskPopupOpen && selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={handleTaskModalClose}
          onCompleteTask={handleCompleteTask}
          onMaterialClick={handleMaterialClick}
          isMobile={isMobile}
          setSelectedDayContents={setSelectedDayContents}
          setContents={setContents}
          setIsTaskPopupOpen={setIsTaskPopupOpen}
        />
        )}
      </AnimatePresence>


      <AnimatePresence>
        {isMaterialPreviewOpen && selectedMaterial && (
          <MaterialPreviewModal
            material={selectedMaterial}
            onClose={() => setIsMaterialPreviewOpen(false)}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isArchiveModalOpen && (
          <ArchiveModal
            materials={archiveMaterials}
            accessSettings={accessSettings}
            onClose={handleArchiveModalClose}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
