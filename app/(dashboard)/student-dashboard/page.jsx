"use client";

import { buildUrl } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";

// Dashboard Components
import DailyCalendar from "@/components/DailyCalendar";
import ErrorState from "@/components/errorState";
import LoadingState from "@/components/loadingState";
import ArchiveButton from "@/components/studentDashboard/archiveButton";
import BottomNavigation from "@/components/studentDashboard/bottomNav";
import ExtraMaterials from "@/components/studentDashboard/extraMaterials";
import DashboardHeader from "@/components/studentDashboard/header";
import LearningPath from "@/components/studentDashboard/learningPath";

// Modal Components
import ArchiveModal from "@/components/modal/studentArchive/archive-modal";
import MaterialPreviewModal from "@/components/studentDashboard/modals/MaterialPreviewModal";
import TaskModal from "@/components/studentDashboard/modals/TaskModal";

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
  const [extraMaterialsOpen, setExtraMaterialsOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [extraMaterials, setExtraMaterials] = useState([]);
  const [archiveMaterials, setArchiveMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Derived state for learning path (today's tasks)
  const learningPath = contents.filter((content) => {
    const contentDate = new Date(content.date);
    const today = new Date();
    return contentDate.toDateString() === today.toDateString() && !content.isExtraMaterial;
  });

  // Progress calculations
  const completedTasks = learningPath.filter((task) => task.completed).length;
  const totalTasks = learningPath.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

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
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
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

  // Generate calendar data
  useEffect(() => {
    const generateCalendarData = () => {
      try {
        // Generate basic calendar structure (7 days)
        const today = new Date();
        const days = [];

        for (let i = -3; i <= 3; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);

          // Check if there are any contents for this day
          const hasTask = contents.some((content) => {
            const contentDate = new Date(content.date);
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
        setSelectedDay(days.find((day) => day.isToday));
      } catch (error) {
        console.error("Error generating calendar data:", error);
        setError("Failed to generate calendar");
      }
    };

    if (contents.length > 0) {
      generateCalendarData();
    }
  }, [contents]);

  // Fetch all contents
  useEffect(() => {
    const fetchContents = async () => {
      if (!session) return;

      try {
        setIsLoading(true);
        const url = buildUrl(process.env.NEXT_PUBLIC_BACKEND_URL);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch contents");
        }

        const data = await response.json();
        setContents(data);

        // Process materials
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Extra materials: isExtraMaterial is true
        const extra = data.filter((item) => item.isExtraMaterial === true);

        // Archive materials: isExtraMaterial is false and date is older than today
        const archive = data.filter((item) => {
          const itemDate = new Date(item.date);
          itemDate.setHours(0, 0, 0, 0);
          return !item.isExtraMaterial && itemDate < today;
        });

        setExtraMaterials(extra);
        setArchiveMaterials(archive);
      } catch (error) {
        console.error("Error fetching contents:", error);
        setError("Failed to load contents");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContents();
  }, [session]);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  // Handle task click
  const handleTaskClick = async (task) => {
    try {
      // Fetch the latest task data when clicked
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${task._id}`
      );

      if (response.ok) {
        const updatedTask = await response.json();
        setSelectedTask(updatedTask);
      } else {
        // If fetch fails, use the existing task data
        setSelectedTask(task);
      }

      setIsTaskPopupOpen(true);
    } catch (error) {
      console.error("Error fetching task details:", error);
      // Fall back to using the existing task data
      setSelectedTask(task);
      setIsTaskPopupOpen(true);
    }
  };

  // Handle task completion
  const handleCompleteTask = async (taskId) => {
    try {
      // Update the task in the local state
      setContents((prevContents) =>
        prevContents.map((content) =>
          content._id === taskId ? { ...content, completed: true } : content
        )
      );
      setIsTaskPopupOpen(false);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

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

  // Handle material click
  const handleMaterialClick = (material) => {
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
      // For videos (any screen size) or any material on desktop: preview
      setSelectedMaterial(previewMaterial);
      setIsMaterialPreviewOpen(true);
    } else {
      // For non-video materials on mobile: download
      const link = document.createElement("a");
      link.href = previewMaterial.url;
      link.download = previewMaterial.name;
      link.click();
    }
  };

  // Handle archive modal close with optional material selection
  const handleArchiveModalClose = (material = null) => {
    setIsArchiveModalOpen(false);

    // If a material was selected in the archive, preview it
    if (material) {
      handleMaterialClick(material);
    }
  };

  // Loading state
  if (isLoading && !userData && contents.length === 0) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return <ErrorState error={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>ÖğrenYap - Çocuklar İçin Eğitim Uygulaması</title>
        <meta name="description" content="Çocuklar için eğitim platformu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto bg-white min-h-screen shadow-lg relative overflow-hidden pb-20">
        {/* Main container with 3-column layout for desktop */}
        <div className="lg:flex lg:flex-row lg:justify-center">
          {/* Main content - centered when sidebar is hidden */}
          <div className="lg:w-3/4 mx-auto">
            {/* Header */}
            <DashboardHeader
              userData={userData}
              session={session}
              currentDate={currentDate}
              completedTasks={completedTasks}
              totalTasks={totalTasks}
              progressPercentage={progressPercentage}
            />

            {/* Main Content */}
            <div className="px-5 py-4 md:px-6">
              {/* Calendar Component */}
              <DailyCalendar
                days={calendarData}
                selectedDay={selectedDay}
                onSelectDay={handleDaySelect}
              />

              {/* Learning Path Section */}
              <LearningPath
                learningPath={learningPath}
                completedTasks={completedTasks}
                totalTasks={totalTasks}
                onTaskClick={handleTaskClick}
              />

              {/* Extra Materials Toggle Section */}
              <ExtraMaterials
                extraMaterials={extraMaterials}
                extraMaterialsOpen={extraMaterialsOpen}
                setExtraMaterialsOpen={setExtraMaterialsOpen}
                onMaterialClick={handleMaterialClick}
                isMobile={isMobile}
              />

              {/* Archive Button Section */}
              <ArchiveButton onClick={() => setIsArchiveModalOpen(true)} />
            </div>
          </div>
        </div>

        {/* Bottom Navigation - Only visible on mobile and tablet */}
        <BottomNavigation />
      </div>

      {/* MODALS  */}

      {/* Task Popup Modal */}
      <AnimatePresence>
        {isTaskPopupOpen && selectedTask && (
          <TaskModal
            task={selectedTask}
            onClose={() => setIsTaskPopupOpen(false)}
            onCompleteTask={handleCompleteTask}
            onMaterialClick={handleMaterialClick}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>

      {/* Material Preview Modal */}
      <AnimatePresence>
        {isMaterialPreviewOpen && selectedMaterial && (
          <MaterialPreviewModal
            material={selectedMaterial}
            onClose={() => setIsMaterialPreviewOpen(false)}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>

      {/* Archive Modal */}
      <AnimatePresence>
        {isArchiveModalOpen && (
          <ArchiveModal
            onClose={handleArchiveModalClose}
            materials={archiveMaterials}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
