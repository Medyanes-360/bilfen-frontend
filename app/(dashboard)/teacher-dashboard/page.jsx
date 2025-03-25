"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MATERIALS_DATA } from "@/data/teacherDashboardMockData";
import Header from "@/components/teacherDashboard/header";
import MaterialList from "@/components/teacherDashboard/materialList";
import Calendar from "@/components/teacherDashboard/calendar";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [materials, setMaterials] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    updateMaterialsForDate(today);
  }, []);
  
  const handleDateChange = (dateObj) => {
    setSelectedDate(dateObj);
    updateMaterialsForDate(dateObj);
  };
  
  const updateMaterialsForDate = (date) => {
    const formatted = formatDate(date);
    const filtered = MATERIALS_DATA.filter(
      (material) => material.date === formatted
    );
    setMaterials(filtered);
  };
  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header - Sabit pozisyonlu */}
      <Header
        dropdownRef={dropdownRef}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
      />

      {/* Ana içerik bölümü */}
      <div className="flex flex-1 pt-0">
        {/* Ana içerik - Ortalaması düzeltildi */}
      <main className="flex-1 overflow-auto p-4 md:p-6 w-full">
          <div className="mx-auto max-w-4xl md:max-w-3xl lg:max-w-4xl">
            {/* Mobilde görünen mini başlık */}
            <div className="md:hidden text-center mb-4">
              <h2 className="font-bold text-gray-800">
                Merhaba, Ayşe Öğretmen
              </h2>
              <p className="text-xs text-gray-500">23 Mart 2025, Cuma</p>
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

              <Calendar
                selectedDate={selectedDate}
                onSelectDate={handleDateChange}
              />
            </div>

            {/* Materyaller Kartı */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center p-4 border-b border-gray-100">
                <span className="text-blue-600 mr-2">📚</span>
                <h2 className="text-lg font-semibold text-gray-800">
                  Dijital Materyaller
                </h2>
              </div>

              <div className="p-4">
                <MaterialList materials={materials} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
