"use client";

import { useMemo, useState, useEffect } from "react";
import { Modal } from "..";
import MaterialList from "@/components/teacherDashboard/materialList";
import { MATERIALS_DATA } from "@/data/teacherDashboardMockData";

export default function ArchiveModal({ onClose, visibleDays = 3 }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const pastDays = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= visibleDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      days.push(date);
    }
    return days;
  }, [visibleDays]);

  const formattedDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const filteredMaterials = useMemo(() => {
    if (!selectedDate) return [];
    const selectedKey = formattedDate(selectedDate);
    return MATERIALS_DATA.filter((material) => material.date === selectedKey);
  }, [selectedDate]);

  // useEffect(() => {
  //   if (pastDays.length > 0 && !selectedDate) {
  //     setSelectedDate(pastDays[0]);
  //   }
  // }, [pastDays]);

  const getMonthLabel = (date) => {
    return date.toLocaleDateString("tr-TR", { month: "long", year: "numeric" });
  };

  return (
    <Modal onClose={onClose} className="max-w-6xl w-full">
      <div className="flex items-center justify-between pb-6 border-b">
        <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
          Arşiv
        </h2>
        {selectedDate && (
          <div className="text-sm font-medium text-gray-500">
            {getMonthLabel(selectedDate)}
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row max-h-[90vh] overflow-hidden">
        {/* Left side: Days */}
        <div className="md:w-1/4 md:border-r h-[40vh] md:h-[70vh] overflow-y-auto">
          <div className="flex md:flex-col p-4 gap-3 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto no-scrollbar">
            {pastDays.map((day, index) => {
              const isSelected =
                selectedDate &&
                day.toDateString() === selectedDate.toDateString();

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    flex flex-col items-center justify-center p-2 sm:p-3 min-w-[70px] sm:min-w-[85px] rounded-xl
                    transition-all duration-300 ease-in-out cursor-pointer
                    hover:shadow-md hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400
                    ${
                      isSelected
                        ? "transform -translate-y-1 shadow-lg border-2 border-blue-400 scale-105 bg-blue-500 text-white"
                        : "shadow-sm border border-gray-200 hover:border-blue-200 bg-white text-gray-800"
                    }
                  `}
                >
                  <span className="text-xs font-medium mb-1">
                    {day.toLocaleDateString("tr-TR", { weekday: "short" })}
                  </span>
                  <span className="text-xl font-bold">{day.getDate()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right side: Materials */}
        <div className="flex-1 h-[40vh] md:h-[70vh] overflow-y-auto p-4">
          {selectedDate ? (
            <MaterialList materials={filteredMaterials} />
          ) : (
            <p className="text-center text-gray-400 italic">Bir tarih seçin.</p>
          )}
        </div>
      </div>
      <div className="pt-6 border-t flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md text-sm bg-red-100 text-red-600 hover:bg-red-200"
        >
          Kapat
        </button>
      </div>
    </Modal>
  );
}
