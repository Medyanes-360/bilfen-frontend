// components/DailyCalendar.js
import React, { useRef, useEffect } from 'react';

const DailyCalendar = ({ days, selectedDay, onSelectDay }) => {
  // Sadece 3 geçmiş, bugün ve 3 gelecek gün gösterelim (toplam 7 gün)
  const visibleDays = days.filter(day => {
    if (day.isToday) return true;
    
    // Bugünün konumunu bul
    const todayIndex = days.findIndex(d => d.isToday);
    const dayIndex = days.findIndex(d => d.id === day.id);
    
    // Bugünden 3 gün önce ve 3 gün sonrası
    return dayIndex >= todayIndex - 3 && dayIndex <= todayIndex + 3;
  });

  const scrollRef = useRef(null);

  // Sayfa yüklendiğinde bugünün ortada olmasını sağla
  useEffect(() => {
    if (scrollRef.current) {
      const todayElement = scrollRef.current.querySelector('[data-today="true"]');
      if (todayElement) {
        // Bugünün elementi görünüm alanının ortasında olacak şekilde kaydır
        const containerWidth = scrollRef.current.offsetWidth;
        const todayElementLeft = todayElement.offsetLeft;
        const todayElementWidth = todayElement.offsetWidth;
        
        // Bugün'ü merkeze konumlandırmak için kaydırma miktarı
        const scrollAmount = todayElementLeft - (containerWidth / 2) + (todayElementWidth / 2);
        
        scrollRef.current.scrollLeft = scrollAmount;
      }
    }
  }, []);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-orange-600 flex items-center gap-2">
          <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center transition-transform hover:scale-110">📅</span>
          Günlük Takvim
        </h2>
        <button className="text-sm text-orange-500 font-medium hover:text-orange-600 transition-colors flex items-center gap-1">
          <span>Tümünü Gör</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="relative">
        <div 
          ref={scrollRef}
          className="overflow-x-auto pb-2 hide-scrollbar md:overflow-visible"
        >
          <div className="flex gap-3 w-max md:w-full md:gap-2 md:justify-between">
            {visibleDays.map((day) => (
              <div 
                key={day.id}
                data-today={day.isToday ? "true" : "false"}
                onClick={() => onSelectDay(day)}
                className={`
                  flex flex-col items-center px-3 py-3 rounded-xl cursor-pointer transition-all duration-200
                  w-[80px] flex-shrink-0 md:w-auto md:flex-1
                  ${day.isToday 
                    ? 'bg-gradient-to-b from-orange-400 to-orange-500 text-white shadow-md shadow-orange-200' 
                    : day.isPast 
                      ? 'bg-gray-100 hover:bg-gray-200' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }
                  ${day.id === selectedDay.id && !day.isToday 
                    ? 'ring-2 ring-orange-300 shadow-md' 
                    : 'hover:shadow-sm hover:translate-y-[-2px]'
                  }
                  ${day.isPast ? 'opacity-90 hover:opacity-100' : ''}
                `}
              >
                <div className={`
                  text-sm font-medium
                  ${day.isToday ? 'text-white/90' : 'text-gray-600'}
                `}>
                  {day.dayName}
                </div>
                
                <div className={`
                  w-10 h-10 md:w-9 md:h-9 rounded-full flex items-center justify-center my-1.5
                  ${day.isToday 
                    ? 'bg-white text-orange-500 font-bold shadow-inner' 
                    : day.isPast 
                      ? 'bg-white text-gray-700 font-medium' 
                      : 'bg-white/70 text-gray-500'
                  }
                  ${day.id === selectedDay.id && !day.isToday ? 'ring-1 ring-orange-200' : ''}
                  transition-transform duration-200 hover:scale-110
                `}>
                  {day.date}
                </div>
                
                {day.isToday ? (
                  <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full text-white font-medium truncate max-w-full">
                    Bugün
                  </span>
                ) : day.isPast ? (
                  <div className="h-1.5 w-10 md:w-8 bg-gray-200 rounded-full overflow-hidden mt-1">
                    <div 
                      className="h-full bg-green-400 rounded-full"
                      style={{ width: `${(day.tasksDone / day.totalTasks) * 100}%` }}
                    ></div>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400 italic truncate max-w-full">Yakında</span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile Scroll Indicators */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full shadow-md flex items-center justify-center text-gray-500 cursor-pointer z-10 md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full shadow-md flex items-center justify-center text-gray-500 cursor-pointer z-10 md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {/* Today's Focus Section */}
      <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-100 flex items-center gap-3">
        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
          🎯
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-700">Bugünün Odak Noktası</h3>
          <p className="text-xs text-gray-600">Tamamlanacak görevlere odaklan!</p>
        </div>
        <button className="text-xs font-medium bg-orange-200 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-300 transition-colors">
          Göster
        </button>
      </div>
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default DailyCalendar;