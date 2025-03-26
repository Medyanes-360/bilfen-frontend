"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// /access-settings get req

function generateCalendarDays(centerDate = new Date(), range = 7) {
  const days = [];

  for (let i = -range; i <= range; i++) {
    const date = new Date(centerDate);
    date.setDate(centerDate.getDate() + i);

    const isToday = date.toDateString() === new Date().toDateString();

    days.push({
      id: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
      dayName: date.toLocaleDateString("tr-TR", { weekday: "short" }),
      monthName: date.toLocaleDateString("tr-TR", { month: "long" }),
      dayNumber: date.getDate(),
      year: date.getFullYear(),
      fullDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()), // local midnight
      isToday,
      isPast: !isToday && date < new Date(new Date().setHours(0, 0, 0, 0)),
    });
  }

  return days;
}

const Calendar = ({ selectedDate, onSelectDate }) => {
  const scrollRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const days = useMemo(() => generateCalendarDays(), []);
  const todayIndex = days.findIndex((day) => day.isToday);

  const todayRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (scrollRef.current && todayRef.current) {
      const containerWidth = scrollRef.current.offsetWidth;
      const todayWidth = todayRef.current.offsetWidth;
      const scrollPosition =
        todayRef.current.offsetLeft - containerWidth / 2 + todayWidth / 2;

      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [mounted, days, todayIndex]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const getGradientStyle = (index) => {
    const distance = Math.abs(index - todayIndex);

    if (index < todayIndex) {
      const opacity = Math.min(0.1 + distance * 0.1, 0.5);
      return {
        background: `rgba(160, 174, 192, ${opacity})`,
        color: `rgba(74, 85, 104, ${0.7 + opacity * 0.3})`,
      };
    } else if (index > todayIndex) {
      const opacity = Math.min(0.1 + distance * 0.08, 0.4);
      return {
        background: `rgba(66, 153, 225, ${opacity})`,
        color: `rgba(44, 82, 130, ${0.8 + opacity * 0.2})`,
      };
    }

    return {
      background: "linear-gradient(to bottom, #FF9F43, #FF7A00)",
      color: "white",
    };
  };

  return (
    <div className="relative w-full px-2 py-2 select-none">
      <button
        onClick={() => handleScroll("left")}
        className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-500 hover:text-blue-600 rounded-full h-10 w-10 shadow-md hover:shadow-lg items-center justify-center z-10 transition-all duration-300 border border-gray-100 hover:border-blue-200 cursor-pointer"
        aria-label="Sola kaydır"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto py-5 px-2 md:px-10 no-scrollbar"
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
      >
        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          @keyframes pulse-border {
            0% {
              box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.4);
            }
            70% {
              box-shadow: 0 0 0 6px rgba(66, 153, 225, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(66, 153, 225, 0);
            }
          }

          .day-today {
            animation: pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}</style>

        {days.map((day, index) => {
          const gradientStyle = getGradientStyle(index);
          const isSelected =
            selectedDate &&
            new Date(selectedDate).toDateString() ===
              day.fullDate.toDateString();

          return (
            <button
              key={day.id}
              id={`day-${day.id}`}
              ref={index === todayIndex ? todayRef : null}
              onClick={() => onSelectDate(day.fullDate)}
              className={`
                flex flex-col items-center justify-center p-2 sm:p-3 min-w-[70px] sm:min-w-[85px] rounded-xl
                transition-all duration-300 ease-in-out cursor-pointer
                hover:shadow-md hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400
                ${day.isToday ? "day-today" : ""}
                ${
                  isSelected
                    ? "transform -translate-y-1 shadow-lg border-2 border-blue-400 scale-105"
                    : "shadow-sm border border-gray-200 hover:border-blue-200"
                }
              `}
              style={gradientStyle}
            >
              <span className="text-xs sm:text-sm font-medium mb-1">
                {day.dayName}
              </span>
              <span className="text-xl sm:text-2xl font-bold mb-1">
                {day.dayNumber}
              </span>
              {day.isToday && (
                <div className="hidden sm:flex items-center px-2 py-1 bg-gray-800 bg-opacity-25 rounded-full">
                  <span className="text-xs font-medium">Bu gün</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => handleScroll("right")}
        className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-500 hover:text-blue-600 rounded-full h-10 w-10 shadow-md hover:shadow-lg items-center justify-center z-10 transition-all duration-300 border border-gray-100 hover:border-blue-200 cursor-pointer"
        aria-label="Sağa kaydır"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 transform transition-transform duration-300 hover:scale-110"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Calendar;
