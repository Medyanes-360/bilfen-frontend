"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MATERIALS_DATA } from "@/data/teacherDashboardMockData";
import Header from "@/components/teacherDashboard/header";
import MaterialList from "@/components/teacherDashboard/materialList";
import Calendar from "@/components/teacherDashboard/calendar";
import { motion, AnimatePresence } from "framer-motion";
import ArchiveModal from "@/components/modal/archiveModal";
import { getSession } from "next-auth/react";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [extraMaterials, setExtraMaterials] = useState([]);

  const [user, setUser] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  const [isOpen, setIsOpen] = useState(true);
  const [isExtraOpen, setIsExtraOpen] = useState(true);

  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    updateMaterialsForDate(today);
    filterExtraMaterials();
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        setUser(session.user);
      }
    };

    fetchSession();

    const today = new Date();
    const formattedDate = today.toLocaleDateString("tr-TR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setCurrentDate(formattedDate);
  }, []);


  const updateMaterialsForDate = (date) => {
    const formatted = formatDate(date);
    const filtered = MATERIALS_DATA.filter(
      (material) =>
        material.date === formatted && material.isExtraMaterial === false
    );
    setMaterials(filtered);
  };

  const filterExtraMaterials = () => {
    const filtered = MATERIALS_DATA.filter(
      (material) => material.isExtraMaterial === true
    );
    setExtraMaterials(filtered);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header - Sabit pozisyonlu */}
        <Header user={user} currentDate={currentDate} />

        {/* Ana içerik bölümü */}
        <div className="flex flex-1 pt-0">
          {/* Ana içerik - Ortalaması düzeltildi */}
          <main className="flex-1 overflow-auto p-4 md:p-6 w-full">
            <div className="mx-auto max-w-4xl md:max-w-3xl lg:max-w-4xl">
              {/* Mobilde görünen mini başlık */}
              <div className="md:hidden text-center mb-4">
                <h2 className="font-bold text-gray-800">
                  Merhaba, {user ? user.name : "Misafir"}
                </h2>
                <p className="text-xs text-gray-500">{currentDate}</p>
              </div>

              {/* Takvim Kartı */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-2">📅</span>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Takvim
                    </h2>
                  </div>
                  <Link
                    href="#"
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    Tümünü Gör ›
                  </Link>
                </div>

                <Calendar selectedDate={selectedDate} />
              </div>

              <div className="flex justify-end gap-4 mb-4">
                <button
                  onClick={() => setShowArchive(true)}
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
                        <MaterialList materials={materials} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
        <ArchiveModal onClose={() => setShowArchive(false)} visibleDays={7} />
      )}
    </>
  );
}
