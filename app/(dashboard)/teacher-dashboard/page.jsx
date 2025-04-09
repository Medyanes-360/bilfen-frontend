"use client";
import { useState, useEffect } from "react";
import Header from "@/components/teacherDashboard/header";
import MaterialList from "@/components/teacherDashboard/materialList";
import Calendar from "@/components/teacherDashboard/calendar";
import { motion, AnimatePresence } from "framer-motion";
import ArchiveModal from "@/components/modal/archiveModal";
import { getSession } from "next-auth/react";
import LoadingState from "@/components/loadingState";
import ErrorState from "@/components/errorState";
import { buildUrl } from "@/lib/utils";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);

  const [materials, setMaterials] = useState([]);
  const [dailyMaterials, setDailyMaterials] = useState([]);
  const [extraMaterials, setExtraMaterials] = useState([]);
  // archiveMaterials will be soon altered
  const [archiveMaterials, setArchiveMaterials] = useState([]);

  const [user, setUser] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  const [visibleDays, setVisibleDays] = useState(2);
  const [mode, setMode] = useState("future"); // "past" | "future"

  const [isOpen, setIsOpen] = useState(true);
  const [isExtraOpen, setIsExtraOpen] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showArchive, setShowArchive] = useState(false);

  const today = new Date();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSession();
        if (session) {
          setUser(session.user);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSession();

    const formattedDate = today.toLocaleDateString("tr-TR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    if (!user) return;

    fetchMaterials(false, setMaterials);
    fetchMaterials(true, setExtraMaterials);
  }, [user]);

  useEffect(() => {
    setSelectedDate(today);
    updateMaterialsForDate(today);
  }, [materials]);

  async function fetchMaterials(isExtra = false, setter) {
    try {
      setIsLoading(true);
      const url = buildUrl(process.env.NEXT_PUBLIC_BACKEND_URL, {
        isExtra,
        branch: user.branch,
      });
      const res = await fetch(url);

      if (!res.ok) {
        setError(res.status);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setter(data);
    } catch (error) {
      console.error("Error fetching materials:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const updateMaterialsForDate = (date) => {
    const formattedDate = formatDate(date);
    const filtered = materials.filter(
      (material) => material?.publishDateTeacher === formattedDate
    );
    setDailyMaterials(filtered);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleOpenArchive = () => {
    setShowArchive(true);
    if (archiveMaterials.length === 0) {
      fetchMaterials(false, setArchiveMaterials);
    }
  };

  // Loading state
  if (isLoading && !user && dailyMaterials.length === 0) {
    return <LoadingState role="teacher" />;
  }

  // Error state
  if (error) {
    return (
      <ErrorState
        role="teacher"
        error={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header - Sabit pozisyonlu */}
        <Header user={user} currentDate={currentDate} />

        {/* Ana içerik bölümü */}
        <div className="flex flex-1 pt-0">
          <main className="flex-1 overflow-auto p-4 md:p-6 w-full">
            <div className="mx-auto max-w-4xl md:max-w-3xl lg:max-w-4xl">
              {/* Mobilde görünen mini başlık */}
              <div className="md:hidden text-center mb-4">
                <h2 className="font-bold text-gray-800 capitalize">
                  Merhaba, {user ? user.name : "Misafir"}
                </h2>
                <p className="text-xs text-gray-500">{currentDate}</p>
              </div>

              {/* Takvim Kartı */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 overflow-hidden">
                <div className="flex items-center p-4 border-b border-gray-100">
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-2">📅</span>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Takvim
                    </h2>
                  </div>
                </div>

                <Calendar selectedDate={selectedDate} />
              </div>

              <div className="flex justify-end gap-4 mb-4">
                <button
                  onClick={handleOpenArchive}
                  className="cursor-pointer px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
                >
                  Arşiv
                </button>
              </div>

              {/* Materyaller Kartı */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="cursor-pointer flex items-center justify-between p-4 border-b border-gray-100 w-full"
                  aria-label="Toggle extra materials"
                >
                  {/* Sabit Başlık */}
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-2">📚</span>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Dijital Materyaller
                    </h2>
                  </div>

                  <div className="text-gray-400 transition">
                    <span
                      className={`inline-block transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      ▼
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="extra-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-4">
                        <MaterialList materials={dailyMaterials} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Ekstra Materyaller Kartı */}
              {extraMaterials && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
                  <button
                    onClick={() => setIsExtraOpen(!isExtraOpen)}
                    className="cursor-pointer flex items-center justify-between p-4 border-b border-gray-100 w-full"
                    aria-label="Toggle extra materials"
                  >
                    {/* Sabit Başlık */}
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">➕</span>
                      <h2 className="text-lg font-semibold text-gray-800">
                        Extra Materyaller
                      </h2>
                    </div>

                    <div className="text-gray-400 transition">
                      <span
                        className={`inline-block transform transition-transform duration-300 ${
                          isExtraOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        ▼
                      </span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExtraOpen && (
                      <motion.div
                        key="extra-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-4">
                          <MaterialList materials={extraMaterials} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {showArchive && (
        <ArchiveModal
          onClose={() => setShowArchive(false)}
          visibleDays={visibleDays}
          mode={mode}
          materials={archiveMaterials}
        />
      )}
    </>
  );
}
