"use client";
import ErrorState from "@/components/errorState";
import LoadingState from "@/components/loadingState";
import ArchiveModal from "@/components/modal/archiveModal";
import Calendar from "@/components/teacherDashboard/calendar";
import Header from "@/components/teacherDashboard/header";
import MaterialList from "@/components/teacherDashboard/materialList";
import { buildUrl } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { getSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  });
  const [dailyMaterials, setDailyMaterials] = useState([]);
  const [extraMaterials, setExtraMaterials] = useState([]);
  const [archiveMaterials, setArchiveMaterials] = useState([]);

  const [user, setUser] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  const [visibleDays, setVisibleDays] = useState(null);

  const [isOpen, setIsOpen] = useState(true);
  const [isExtraOpen, setIsExtraOpen] = useState(true);
  const [showArchive, setShowArchive] = useState(false);

  const [error, setError] = useState(null);
  const [appReady, setAppReady] = useState(false);
  const [archiveLoadingStatus, setArchiveLoadingStatus] = useState("idle");

  useEffect(() => {
    (async () => {
      try {
        // Get session
        const user = await fetchSession();

        // Fetch all data
        await Promise.all([fetchVisibleDays(), fetchExtraMaterials(user)]);

        setAppReady(true);
      } catch (err) {
        console.error("App yüklenirken hata: ", err);
        setError("Bir hata oluştu");
      }
    })();
  }, []);

  useEffect(() => {
    if (!user || !selectedDate) return;

    const runFetch = async () => {
      try {
        await fetchDailyMaterials(user, selectedDate);
      } catch (err) {
        console.error("App yüklenirken hata: ", err);
        setError("Bir hata oluştu");
      }
    };

    runFetch();
  }, [user, selectedDate]);

  const fetchSession = async () => {
    const session = await getSession();
    if (!session) throw new Error("Oturum bulunamadı");
    setUser(session.user);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const formattedDate = today.toLocaleDateString("tr-TR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setCurrentDate(formattedDate);

    return session.user;
  };

  const fetchVisibleDays = async () => {
    try {
      const url = buildUrl(process.env.NEXT_PUBLIC_BACKEND_URL, {}, "api/access-settings");

      const res = await fetch(url);

      if (!res.ok) {
        setError(res.status);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setVisibleDays({
        past: data.teacherDays,
        future: data.teacherDaysFuture,
        archiveStart: data.startedDate,
        archiveEnd: data.endDate,
      });
    } catch (error) {
      console.log("Hata: ", error.message);
    }
  };

  const fetchDailyMaterials = async (user, date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);

    const startDate = formatDate(start);
    const endDate = formatDate(nextDay);

    try {
      const url = buildUrl(
        process.env.NEXT_PUBLIC_BACKEND_URL,
        {
          isPublished: true,
          isExtra: false,
          branch: user?.branch,
          startDate: startDate,
          endDate: endDate,
        },
        "api/contents"
      );

      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      console.log(data);
      setDailyMaterials(data);
    } catch (error) {
      console.error("Error fetching daily materials:", error.message);
      setError(error.message);
    }
  };

  const fetchExtraMaterials = async (user) => {
    try {
      const url = buildUrl(
        process.env.NEXT_PUBLIC_BACKEND_URL,
        {
          isPublished: true,
          isExtra: true,
          branch: user?.branch,
        },
        "api/contents"
      );

      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        setError(res.status);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setExtraMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error.message);
      setError(error.message);
    }
  };

  const fetchArchiveMaterials = useCallback(
    async (user) => {
      if (!visibleDays?.archiveStart || !visibleDays?.archiveEnd) return;

      const start = new Date(visibleDays.archiveStart);
      const end = new Date(visibleDays.archiveEnd);
      end.setHours(23, 59, 59, 999);

      const formattedStart = formatDate(start);
      const formattedEnd = formatDate(end);

      setArchiveLoadingStatus("pending");

      const timeoutId = setTimeout(() => {
        setArchiveLoadingStatus("error");
      }, 10000);

      try {
        const url = buildUrl(
          process.env.NEXT_PUBLIC_BACKEND_URL,
          {
            isPublished: true,
            isExtra: false,
            branch: user?.branch,
            rangeStartDate: formattedStart,
            rangeEndDate: formattedEnd,
          },
          "api/contents"
        );

        const res = await fetch(url, { cache: "no-store" });
        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();
        setArchiveMaterials(data);
        setArchiveLoadingStatus("success");
      } catch (error) {
        console.error("Error fetching archive materials:", error.message);
        setError(error.message);
        setArchiveLoadingStatus("error");
      }
    },
    [visibleDays, user?.branch]
  );

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleOpenArchive = () => {
    setShowArchive(true);
    fetchArchiveMaterials(user);
  };

  // Loading state
  if (!appReady && !error) {
    return <LoadingState role="teacher" />;
  }

  // Error state
  if (error) {
    return <ErrorState role="teacher" error={error} onRetry={() => window.location.reload()} />;
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
                    <h2 className="text-lg font-semibold text-gray-800">Takvim</h2>
                  </div>
                </div>

                <Calendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  visibleDays={visibleDays}
                />
              </div>

              <div className="flex justify-end gap-4 mb-4">
                <button
                  onClick={handleOpenArchive}
                  className="cursor-pointer px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition">
                  Arşiv
                </button>
              </div>

              {/* Materyaller Kartı */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="cursor-pointer flex items-center justify-between p-4 border-b border-gray-100 w-full"
                  aria-label="Toggle extra materials">
                  {/* Sabit Başlık */}
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-2">📚</span>
                    <h2 className="text-lg font-semibold text-gray-800">Dijital Materyaller</h2>
                  </div>

                  <div className="text-gray-400 transition">
                    <span
                      className={`inline-block transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}>
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
                      className="overflow-hidden">
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
                    aria-label="Toggle extra materials">
                    {/* Sabit Başlık */}
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">➕</span>
                      <h2 className="text-lg font-semibold text-gray-800">Extra Materyaller</h2>
                    </div>

                    <div className="text-gray-400 transition">
                      <span
                        className={`inline-block transform transition-transform duration-300 ${
                          isExtraOpen ? "rotate-180" : "rotate-0"
                        }`}>
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
                        className="overflow-hidden">
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
          archiveStart={visibleDays.archiveStart}
          archiveEnd={visibleDays.archiveEnd}
          materials={archiveMaterials}
          isLoading={archiveLoadingStatus === "pending"}
          isError={archiveLoadingStatus === "error"}
          onRetry={() => fetchArchiveMaterials(user)}
          onClose={() => setShowArchive(false)}
        />
      )}
    </>
  );
}
