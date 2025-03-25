"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import {
  mockUserData,
  mockLearningPathData,
  mockRecommendationsData,
  mockCalendarData,
} from "@/data/mockData";
import DailyCalendar from "@/components/DailyCalendar";
import { getSession } from "next-auth/react";

export default function Home() {
  const [userData, setUserData] = useState(mockUserData);
  const [learningPath, setLearningPath] = useState(mockLearningPathData);
  const [recommendations, setRecommendations] = useState(
    mockRecommendationsData
  );
  const [calendarData, setCalendarData] = useState(mockCalendarData);
  const [selectedDay, setSelectedDay] = useState(
    calendarData.find((day) => day.isToday)
  );

  // Progress hesaplamaları
  const completedTasks = learningPath.filter((task) => task.completed).length;
  const totalTasks = learningPath.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const handleDaySelect = (day) => {
    setSelectedDay(day);

    // Filter assignments for the selected day
    const filteredAssignments = mockLearningPathData.filter((task) => {
      if (!task.date) return false;
      const taskDate = new Date(task.date);
      return taskDate.getDate() === day.date;
    });

    setLearningPath(filteredAssignments);
  };

  const [user, setUser] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        setUser(session.user);
      }
    };

    fetchSession();

    // Set dynamic date
    const today = new Date();
    const formattedDate = today.toLocaleDateString("tr-TR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setCurrentDate(formattedDate);
  }, []);

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
          {/* Left sidebar - only visible on desktop */}

          {/* Main content - centered when sidebar is hidden */}
          <div className="lg:w-2/4 mx-auto">
            {/* Header */}
            <header className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-5 md:p-6 rounded-b-3xl md:rounded-none relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden rounded-b-3xl md:rounded-none">
                <div className="absolute w-20 h-10 md:w-24 md:h-12 bg-white/20 rounded-full top-4 left-[10%]"></div>
                <div className="absolute w-16 h-8 md:w-20 md:h-10 bg-white/20 rounded-full top-10 left-[70%]"></div>

                {/* Animated bubbles */}
                <div className="absolute w-6 h-6 bg-white/10 rounded-full top-20 left-[20%] animate-float-slow"></div>
                <div className="absolute w-8 h-8 bg-white/10 rounded-full top-5 left-[50%] animate-float-medium"></div>
                <div className="absolute w-4 h-4 bg-white/10 rounded-full top-16 left-[80%] animate-float-fast"></div>
              </div>

              <div className="relative z-10 flex items-center gap-4">
                <div className="relative group">
                  <div className="w-16 h-16 rounded-full border-3 border-white bg-orange-100 flex items-center justify-center text-3xl transition-transform transform group-hover:scale-110">
                    {userData.avatar}
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold">Merhaba!</div>
                  <div className="text-2xl font-bold flex flex-col gap-2">
                    <h2 className="font-bold">Merhaba, {user ? user.name : "Misafir"}</h2>
                    <p className="text-xs">{currentDate}</p>
                  </div>
                </div>
              </div>

              {/* New Progress Bar Design */}
              <div className="mt-5 relative z-10">
                <div className="flex justify-between mb-2 text-sm">
                  <div>Günlük İlerleme</div>
                  <div className="font-bold">
                    {completedTasks}/{totalTasks} görev
                  </div>
                </div>
                <div className="h-8 bg-white/20 rounded-full overflow-hidden relative backdrop-blur-sm">
                  {/* Progress Bar */}
                  {totalTasks > 0 ? (
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    >
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="w-full h-full bg-white/20 transform -translate-x-full animate-shimmer"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full w-0"></div>
                  )}

                  {/* Progress Star */}
                  {progressPercentage > 0 && (
                    <div
                      className="absolute top-1/2 z-10 flex items-center justify-center"
                      style={{
                        left: `${progressPercentage}%`,
                        transform: `translateX(-50%) translateY(-50%)`,
                      }}
                    >
                      <div className="text-2xl animate-bounce">⭐</div>
                    </div>
                  )}

                  {/* Progress Points */}
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-between px-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          (index + 1) * 20 <= progressPercentage
                            ? "bg-white"
                            : "bg-white/30"
                        } ${
                          (index + 1) * 20 <= progressPercentage
                            ? "scale-100"
                            : "scale-75"
                        } transition-all`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <div className="px-5 py-4 md:px-6">
              {/* Calendar Component */}
              <DailyCalendar
                days={calendarData}
                selectedDay={selectedDay}
                onSelectDay={handleDaySelect}
              />

              {/* Daily Goal Section */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl transform transition-all hover:scale-[1.02] hover:shadow-md mb-6 mt-4">
                <h3 className="font-bold mb-2">Günlük Hedef</h3>
                <p className="text-sm mb-3">
                  {totalTasks - completedTasks > 0
                    ? `${
                        totalTasks - completedTasks
                      } aktivite daha tamamla ve günlük hedefine ulaş!`
                    : "Tüm aktiviteleri tamamladın! Harika iş!"}
                </p>
                <div className="w-full bg-white/30 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-white h-full relative"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <div className="absolute top-0 bottom-0 right-0 w-2 h-2 bg-white rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>

              {/* Learning Path Section */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-orange-600 mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                    🚶
                  </span>
                  Öğrenme Yolculuğum
                </h2>

                <div className="relative px-2.5 mb-6">
                  {/* Background line */}
                  {learningPath.length > 0 && (
                    <div className="absolute top-0 bottom-0 left-[35px] w-1.5 bg-gray-200 rounded z-0"></div>
                  )}

                  {/* Progress line - only show if there are completed tasks */}
                  {completedTasks > 0 && learningPath.length > 0 && (
                    <div
                      className="absolute top-0 left-[35px] w-1.5 bg-gradient-to-b from-green-500 to-green-400 rounded z-0"
                      style={{
                        height: `${
                          (completedTasks / totalTasks) *
                          (learningPath.length * 120)
                        }px`,
                      }}
                    ></div>
                  )}

                  {/* Tasks */}
                  <div className="relative z-10 flex flex-col gap-6">
                    {learningPath.length > 0 ? (
                      learningPath.map((task, index) => (
                        <div
                          key={task.id}
                          className={`flex gap-4 items-start ${
                            task.completed
                              ? "completed"
                              : task.current
                              ? "current"
                              : ""
                          }`}
                        >
                          <div
                            className={`
                               w-[70px] h-[70px] rounded-full flex items-center justify-center text-3xl
                              border-3 relative z-10 transition-all duration-300
                              ${
                                task.completed
                                  ? "border-green-500 bg-green-50 text-green-500 hover:shadow-md hover:shadow-green-200 hover:scale-105"
                                  : task.current
                                  ? "border-blue-500 bg-blue-50 text-blue-500 animate-bounce hover:shadow-md hover:shadow-blue-200"
                                  : "border-gray-300 bg-white text-gray-400 hover:border-gray-400 hover:text-gray-500"
                              }
                            `}
                          >
                            {task.icon}
                          </div>

                          <div
                            className={`
                             flex-1 bg-white rounded-2xl p-4 shadow
                             border-2 transition-all duration-200
                             ${
                               task.completed
                                 ? "border-green-200 hover:border-green-300 hover:shadow-md"
                                 : task.current
                                 ? "border-blue-200 hover:border-blue-300 hover:shadow-md"
                                 : "border-gray-200 hover:border-gray-300"
                             }
                            `}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-bold text-base">
                                {task.title}
                                {task.isNew && (
                                  <span className="ml-2 text-xs bg-red-500 text-white py-0.5 px-2 rounded-full animate-pulse">
                                    YENİ
                                  </span>
                                )}
                              </h3>
                              {task.completed && (
                                <span className="text-green-500 transform transition-transform hover:scale-110">
                                  ✅
                                </span>
                              )}
                            </div>

                            <div className="text-sm text-gray-600 mb-3 flex items-center gap-1.5">
                              {task.typeIcon} {task.description}
                            </div>

                            <div className="flex justify-between items-center">
                              <button
                                className={`
                                    py-2 px-4 rounded-full text-sm font-bold text-white flex items-center gap-1 whitespace-nowrap transition-all
                                    ${
                                      task.completed
                                        ? "bg-green-500 hover:bg-green-600"
                                        : task.current
                                        ? "bg-blue-500 hover:bg-blue-600"
                                        : "bg-gray-400"
                                    }
                                `}
                                disabled={!task.current && !task.completed}
                              >
                                <span className="flex items-center justify-center gap-1">
                                  {task.completed ? (
                                    <>
                                      <span>✓</span> Tamamlandı
                                    </>
                                  ) : task.current ? (
                                    <>
                                      <span>▶️</span> Başlat
                                    </>
                                  ) : (
                                    <>
                                      <span>🔒</span> Kilitli
                                    </>
                                  )}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-gray-100 rounded-2xl p-6 border-2 border-dashed border-gray-300 text-center text-gray-500 italic">
                        Bu gün için görev bulunmamaktadır.
                      </div>
                    )}
                  </div>

                  {/* Coming Soon Section - only show if there are tasks */}
                  {learningPath.length > 0 && (
                    <div className="mt-3 bg-gray-100 rounded-2xl p-4 border-2 border-dashed border-gray-300 text-center text-gray-500 italic transition-all hover:bg-gray-50">
                      ⏰ Yarınki görevler hazırlanıyor...
                    </div>
                  )}
                </div>
              </section>

              {/* Recommendations Section */}
              <section className="mb-10">
                <h2 className="text-xl font-bold text-orange-600 mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                    💡
                  </span>
                  Senin İçin Öneriler
                </h2>

                {/* Fixed Scrollable Area for All Devices */}
                <div className="overflow-x-auto pb-4 -mx-5 px-5">
                  <div className="flex gap-4 w-max">
                    {recommendations.map((item) => (
                      <div
                        key={item.id}
                        className="min-w-[180px] bg-white rounded-2xl shadow-md overflow-hidden relative transition-all hover:shadow-lg hover:translate-y-[-2px]"
                      >
                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 to-orange-600"></div>
                        <div className="absolute top-2.5 left-2.5 bg-black/60 text-white text-xs py-1 px-2 rounded-full flex items-center gap-1 z-10">
                          <span className="transition-transform hover:scale-110">
                            {item.typeIcon}
                          </span>{" "}
                          {item.type}
                        </div>

                        <div
                          className={`
                              h-[100px] flex items-center justify-center text-4xl relative overflow-hidden group
                              ${
                                item.type === "Video"
                                  ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                                  : item.type === "Oyun"
                                  ? "bg-gradient-to-br from-green-400 to-green-600"
                                  : "bg-gradient-to-br from-purple-500 to-indigo-600"
                              }
                            `}
                        >
                          <span className="relative z-10 transform transition-transform group-hover:scale-125">
                            {item.contentIcon}
                          </span>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>

                        <div className="p-3 transition-all group-hover:bg-gray-50">
                          <h3 className="font-bold text-sm mb-1">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Right sidebar - only visible on desktop */}
          <div className="hidden lg:block lg:w-1/4 p-6">
            <div className="sticky top-4">
              <h2 className="text-xl font-bold text-orange-600 mb-5 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                  👋
                </span>
                Günün İpucu
              </h2>

              <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-200 transition-all hover:shadow-md hover:bg-gray-50/80">
                <p className="text-gray-700 text-sm mb-3">
                  Her gün 30 dakika okuma yaparak haftalık okuma hedefine
                  ulaşabilirsin!
                </p>
                <div className="bg-orange-100 text-orange-600 p-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-transform hover:scale-[1.01]">
                  <span className="text-xl transition-transform hover:scale-110">
                    💡
                  </span>{" "}
                  İpuçlarını takip et, daha hızlı ilerle!
                </div>
              </div>

              <h2 className="text-xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                  🔝
                </span>
                En Sevilen İçerikler
              </h2>

              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 transition-all hover:shadow-lg">
                <ul className="space-y-3">
                  {recommendations.slice(0, 3).map((item) => (
                    <li
                      key={`sidebar-${item.id}`}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-all hover:scale-[1.01]"
                    >
                      <span className="text-2xl transition-transform hover:scale-110">
                        {item.contentIcon}
                      </span>
                      <div>
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.type}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation - Only visible on mobile and tablet */}
        <nav className="fixed lg:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 shadow-lg z-10">
          <div className="max-w-lg md:max-w-2xl mx-auto flex justify-around">
            {[
              { label: "Ana Sayfa", icon: "🏠", active: true },
              { label: "Keşfet", icon: "🧭", active: false },
              { label: "Başarılar", icon: "🏆", active: false, badge: 3 },
              { label: "Profil", icon: "👤", active: false },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center relative cursor-pointer transition-transform hover:scale-110 ${
                  item.active
                    ? "text-orange-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-xs">{item.label}</div>
                {item.badge && (
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {item.badge}
                  </div>
                )}
                {item.active && (
                  <div className="absolute -bottom-3 w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
