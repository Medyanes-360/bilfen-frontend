"use client"

// pages/index.js
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/**
 * JSON Verileri
 * -------------
 * Günler ve materyaller için JSON formatında mock veriler
 */

// Günler verisi
const DAYS_DATA = [
  // Geçmiş 7 gün
  {
    id: 1,
    name: 'Çar',
    date: 16,
    month: 3,
    year: 2025,
    isToday: false,
    isPast: true
  },
  {
    id: 2,
    name: 'Per',
    date: 17,
    month: 3,
    year: 2025,
    isToday: false,
    isPast: true
  },
  {
    id: 3,
    name: 'Cum',
    date: 18,
    month: 3,
    year: 2025,
    isToday: false,
    isPast: true
  },
  {
    id: 4,
    name: 'Cmt',
    date: 19,
    month: 3,
    year: 2025,
    isToday: false,
    isPast: true
  },
  {
    id: 5,
    name: 'Pzr',
    date: 20,
    month: 3,
    year: 2025,
    isToday: false,
    isPast: true
  },
  {
    id: 6,
    name: 'Pzt',
    date: 21,
    month: 3,
    year: 2025,
    isToday: false,
    isPast: true
  },
  {
    id: 7,
    name: 'Sal',
    date: 22,
    month: 3,
    year: 2025,
    isToday: false,
    isPast: true
  },
  // Bugün
  {
    id: 8,
    name: 'Çar',
    date: 23,
    month: 3,
    year: 2025,
    isToday: true,
    isPast: false
  },
  // Gelecek 7 gün
  {
    id: 9,
    name: 'Per',
    date: 24,
    month: 3,
    year: 2025,
    isToday: false,
    isPast: false
  },
  {
    id: 10,
    name: 'Cum',
    date: 25,
    month: 3,
    year: 2025,
    isToday: false,
    isPast: false
  },
  {
    id: 11,
    name: 'Cmt',
    date: 26,
    month: 3,
    year: 2025,
    isToday: false,
    isPast: false
  },
  {
    id: 12,
    name: 'Pzr',
    date: 27,
    month: 3,
    year: 2025,
    isToday: false,
    isPast: false
  },
  {
    id: 13,
    name: 'Pzt',
    date: 28,
    month: 3,
    year: 2025,
    isToday: false,
    isPast: false
  },
  {
    id: 14,
    name: 'Sal',
    date: 29,
    month: 3,
    year: 2025,
    isToday: false,
    isPast: false
  },
  {
    id: 15,
    name: 'Çar',
    date: 30,
    month: 3,
    year: 2025,
    isToday: false,
    isPast: false
  }
];

// Materyaller verisi
const MATERIALS_DATA = [
  {
    id: 1,
    title: 'Matematik Giriş Videosu',
    description: 'Matematik dersine giriş için temel kavramlar',
    type: 'video',
    duration: '15 dakika',
    date: '2025-03-23',
    session: 'morning',
    viewed: true
  },
  {
    id: 2,
    title: 'Cebirsel İfadeler - Ders Notları',
    description: 'Cebirsel ifadeler hakkında detaylı açıklamalar',
    type: 'document',
    duration: '5 sayfa',
    date: '2025-03-23',
    session: 'morning',
    viewed: false
  },
  {
    id: 3,
    title: 'Cebirsel İfadeler - Eğitsel Oyun',
    description: 'Kavramları pekiştirmek için etkileşimli aktiviteler',
    type: 'game',
    duration: '25 dakika',
    date: '2025-03-23',
    session: 'afternoon',
    viewed: false
  },
  {
    id: 4,
    title: 'Cebirsel İfadeler - Çalışma Kağıdı',
    description: 'Öğrencilerin anlama düzeyini ölçmek için değerlendirme',
    type: 'quiz',
    duration: '2 sayfa',
    date: '2025-03-23',
    session: 'afternoon',
    viewed: false
  },
  // 22 Mart için materyaller
  {
    id: 5,
    title: 'Dil Bilgisi Örnekleri',
    description: 'Türkçe dil bilgisi kuralları ve örnekler',
    type: 'document',
    duration: '8 sayfa',
    date: '2025-03-22',
    session: 'morning',
    viewed: true
  },
  {
    id: 6,
    title: 'Okuma Becerisi Geliştirme',
    description: 'Hızlı ve anlayarak okuma teknikleri',
    type: 'video',
    duration: '18 dakika',
    date: '2025-03-22',
    session: 'afternoon',
    viewed: true
  },
  // 24 Mart için materyaller
  {
    id: 7,
    title: 'Fen Bilimleri - Periyodik Tablo',
    description: 'Elementlerin özellikleri ve periyodik tablo',
    type: 'video',
    duration: '22 dakika',
    date: '2025-03-24',
    session: 'morning',
    viewed: false
  },
  {
    id: 8,
    title: 'Kimya Deneyi Simülasyonu',
    description: 'Kimyasal reaksiyonları gözlemleme',
    type: 'game',
    duration: '30 dakika',
    date: '2025-03-24',
    session: 'afternoon',
    viewed: false
  }
];

/**
 * Header Component
 * ----------------
 * Uygulama üst kısmında görünen öğretmen profili ve tarih bilgisi
 */
function Header({ toggleSidebar }) {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md sticky top-0 z-30 transition-all duration-300">
  <div className="container mx-auto">
    <div className="flex items-center h-16 px-4">
      {/* Menü toggle butonu - hover efektli */}
      <button 
        className="md:hidden text-white text-2xl mr-4 transform transition-transform duration-300 hover:scale-110 active:scale-90 focus:outline-none"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      
      {/* Logo - animasyonlu */}
      <div className="flex items-center mr-4 group">
        <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-110 shadow-sm group-hover:shadow">
          EÖ
        </div>
        <h2 className="text-white font-semibold ml-2 hidden sm:block opacity-90 group-hover:opacity-100 transition-opacity duration-300">EğitimHub</h2>
      </div>
      
      {/* Öğretmen bilgileri - hover efektli */}
      <div className="flex items-center ml-auto">
        <div className="text-right mr-3 hidden sm:block group">
          <h1 className="font-bold group-hover:text-blue-100 transition-colors duration-300">Merhaba, Ayşe Öğretmen</h1>
          <p className="text-xs text-blue-100 group-hover:text-white transition-colors duration-300">23 Mart 2025, Cuma</p>
        </div>
        <div className="relative group">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110 shadow-sm group-hover:shadow">
            <span className="text-xl text-blue-600">👩‍🏫</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white transition-transform duration-300 group-hover:scale-110">
            7
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
  );
}


/**
 * Calendar Component
 * -----------------
 * Yatay kaydırılabilir takvim görünümü
 */
// Calendar bileşeni görsel iyileştirmeleri
function Calendar({ days, selectedDate, onSelectDate }) {
  const scrollRef = useRef(null); // useRef hook'u ile scrollRef tanımlama
  
  // Bugünün indeksini bulalım
  const todayIndex = days.findIndex(day => day.isToday);
  
  useEffect(() => {
    // Sayfa yüklendiğinde bugünü ortala
    if (scrollRef.current && todayIndex !== -1) {
      const todayElement = document.getElementById(`day-${days[todayIndex].id}`);
      if (todayElement) {
        setTimeout(() => {
          const containerWidth = scrollRef.current.offsetWidth;
          const todayWidth = todayElement.offsetWidth;
          const scrollPosition = todayElement.offsetLeft - (containerWidth / 2) + (todayWidth / 2);
          
          scrollRef.current.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          });
        }, 100); // Küçük bir gecikme ile daha güvenilir scroll
      }
    }
  }, [days, todayIndex]);

  // Scroll butonlarına tıklandığında çalışacak fonksiyon
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Geçmiş ve gelecek için tonları hesapla
  const getGradientStyle = (index) => {
    const distance = Math.abs(index - todayIndex);
    
    if (index < todayIndex) {
      // Geçmiş günler - gri tonları (en uzak geçmiş en koyu)
      const opacity = Math.min(0.1 + (distance * 0.1), 0.5); // 0.1 - 0.5 arası
      return {
        background: `rgba(160, 174, 192, ${opacity})`,
        color: `rgba(74, 85, 104, ${0.7 + (opacity * 0.3)})` 
      };
    } else if (index > todayIndex) {
      // Gelecek günler - mavi tonları (en uzak gelecek en koyu)
      const opacity = Math.min(0.1 + (distance * 0.08), 0.4); // 0.1 - 0.4 arası
      return {
        background: `rgba(66, 153, 225, ${opacity})`,
        color: `rgba(44, 82, 130, ${0.8 + (opacity * 0.2)})`
      };
    }
    // Bugün için turuncu
    return {
      background: 'linear-gradient(to bottom, #FF9F43, #FF7A00)',
      color: 'white'
    };
  };

  return (
    <div className="relative w-full px-2 py-2 select-none">
      {/* Sol kaydırma butonu - geliştirilmiş hover ve transition */}
      <button 
        onClick={() => handleScroll('left')} 
        className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-500 hover:text-blue-600 rounded-full h-10 w-10 shadow-md hover:shadow-lg items-center justify-center z-10 transition-all duration-300 border border-gray-100 hover:border-blue-200"
        aria-label="Sola kaydır"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      
      <div 
        ref={scrollRef} 
        className="flex gap-3 overflow-x-auto py-5 px-2 md:px-10 no-scrollbar"
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          
          @keyframes pulse-border {
            0% { box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(66, 153, 225, 0); }
            100% { box-shadow: 0 0 0 0 rgba(66, 153, 225, 0); }
          }
          
          .day-today {
            animation: pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}</style>
        
        {days.map((day, index) => {
          const gradientStyle = getGradientStyle(index);
          const isToday = day.isToday;
          
          return (
            <button 
              id={`day-${day.id}`}
              key={day.id}
              onClick={() => onSelectDate(day.id)}
              className={`
                flex flex-col items-center justify-center p-2 sm:p-3 min-w-[70px] sm:min-w-[85px] rounded-xl 
                transition-all duration-300 ease-in-out cursor-pointer
                hover:shadow-md hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400
                ${isToday ? 'day-today' : ''}
                ${selectedDate === day.id 
                  ? 'transform -translate-y-1 shadow-lg border-2 border-blue-400 scale-105' 
                  : 'shadow-sm border border-gray-200 hover:border-blue-200'}
              `}
              style={{
                background: gradientStyle.background,
                color: gradientStyle.color
              }}
            >
              <span className="text-xs sm:text-sm font-medium mb-1">{day.name}</span>
              <span className="text-xl sm:text-2xl font-bold mb-1 transition-transform duration-300 group-hover:scale-110">{day.date}</span>
              
              {isToday && (
                <div className="flex items-center px-2 py-1 bg-gray-800 bg-opacity-25 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium">Bugün</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Sağ kaydırma butonu - geliştirilmiş hover ve transition */}
      <button 
        onClick={() => handleScroll('right')} 
        className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-500 hover:text-blue-600 rounded-full h-10 w-10 shadow-md hover:shadow-lg items-center justify-center z-10 transition-all duration-300 border border-gray-100 hover:border-blue-200"
        aria-label="Sağa kaydır"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform transition-transform duration-300 hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}


/**
 * MaterialCard Component
 * ----------------------
 * Her bir eğitim materyalini gösteren kart komponenti
 */
// MaterialCard bileşeni görsel iyileştirmeleri
function MaterialCard({ material }) {
  // İçerik türüne göre ikon ve renk belirleme
  const getTypeInfo = (type) => {
    switch(type) {
      case 'video':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
          ),
          bgColor: 'bg-green-50',
          color: 'text-green-600',
          borderColor: 'border-green-200',
          label: 'Video',
          buttonText: 'Görüntüle',
          buttonIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          )
        };
      case 'document':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          ),
          bgColor: 'bg-blue-50',
          color: 'text-blue-600',
          borderColor: 'border-blue-200',
          label: 'PDF',
          buttonText: 'Görüntüle',
          buttonIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          )
        };
      case 'game':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="11" x2="10" y2="11"></line>
              <line x1="8" y1="9" x2="8" y2="13"></line>
              <line x1="15" y1="12" x2="15.01" y2="12"></line>
              <line x1="18" y1="10" x2="18.01" y2="10"></line>
              <rect x="2" y="6" width="20" height="12" rx="2"></rect>
            </svg>
          ),
          bgColor: 'bg-orange-50',
          color: 'text-orange-600',
          borderColor: 'border-orange-200',
          label: 'Eğitsel Oyun',
          buttonText: 'Başlat',
          buttonIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )
        };
      case 'quiz':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <circle cx="12" cy="14" r="2"></circle>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
          ),
          bgColor: 'bg-purple-50',
          color: 'text-purple-600',
          borderColor: 'border-purple-200',
          label: 'Çalışma Kağıdı',
          buttonText: 'Görüntüle',
          buttonIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          )
        };
      default:
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
          ),
          bgColor: 'bg-gray-50',
          color: 'text-gray-600',
          borderColor: 'border-gray-200',
          label: 'Materyal',
          buttonText: 'Görüntüle',
          buttonIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          )
        };
    }
  };
  
  const typeInfo = getTypeInfo(material.type);
  
  // Geri bildirim bırak için ikon
  const feedbackIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
  
  return (
    <div className="group flex border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-blue-200">
      {/* Sol renk çubuğu - hover durumunda efekt */}
      <div className="w-1.5 bg-blue-600 group-hover:w-2 transition-all duration-300"></div>
      
      <div className="flex flex-1 p-3 sm:p-4">
        {/* İkon Alanı - Hover animasyonu */}
        <div className={`mr-3 sm:mr-4 ${typeInfo.bgColor} ${typeInfo.color} p-2 sm:p-3 rounded-lg flex items-center justify-center border ${typeInfo.borderColor} group-hover:shadow-md transition-all duration-300 ease-in-out group-hover:scale-105`}>
          <div className="transform transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
            {typeInfo.icon}
          </div>
        </div>
        
        {/* İçerik Alanı */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 pr-1">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base flex items-center flex-wrap truncate group-hover:text-blue-700 transition-colors duration-300">
                {material.title}
                {material.viewed && (
                  <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full whitespace-nowrap group-hover:bg-green-200 transition-colors duration-300">
                    ✓ İncelendi
                  </span>
                )}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">{material.description}</p>
            </div>
            
            <div className={`mt-2 sm:mt-0 text-xs px-2 py-1 rounded-full ${typeInfo.bgColor} ${typeInfo.color} font-medium inline-flex whitespace-nowrap group-hover:shadow-sm group-hover:scale-105 transition-all duration-300`}>
              {typeInfo.label}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 sm:mt-4">
            <div className="flex items-center text-xs sm:text-sm text-gray-500 gap-3 mb-2 sm:mb-0 group-hover:text-gray-700 transition-colors duration-300">
              <span className="flex items-center whitespace-nowrap">
                {material.type === 'document' ? 
                  <span className="mr-1">📄</span> : 
                  <span className="mr-1">⏱️</span>
                }
                {material.duration}
              </span>
              <span className="flex items-center whitespace-nowrap">
                <span className="mr-1">📅</span>
                {material.date}
              </span>
            </div>
            
            <div className="flex gap-2">
              {/* Ana buton - geliştirilmiş hover ve tıklama efektleri */}
              <button className="flex-1 cursor-pointer hover:scale-105 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 text-white rounded flex items-center justify-center text-xs sm:text-sm font-medium hover:bg-blue-700 shadow-sm hover:shadow active:shadow-inner active:scale-95 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                {typeInfo.buttonIcon}
                <span className="ml-1">{typeInfo.buttonText}</span>
              </button>
              
              {/* Geri bildirim butonu - geliştirilmiş hover ve tıklama efektleri */}
              <button className="flex-1 cursor-pointer hover:scale-105 sm:flex-none px-3 sm:px-4 py-2 border border-blue-600 text-blue-600 rounded flex items-center justify-center text-xs sm:text-sm font-medium hover:bg-blue-50 hover:text-blue-700 active:bg-blue-100 active:scale-95 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                {feedbackIcon}
                <span className="hidden sm:inline ml-1">Geri Bildirim Bırak</span>
                <span className="sm:hidden ml-1">Geri Bildirim</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * MaterialList Component
 * ----------------------
 * Materyalleri sabah ve öğle oturumları olarak gruplandıran liste
 */
function MaterialList({ materials }) {
  // Sabah ve öğleden sonra oturumlarını grupla
  const morningMaterials = materials.filter(m => m.session === 'morning');
  const afternoonMaterials = materials.filter(m => m.session === 'afternoon');
  
  if (materials.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500">
        <p>Bu tarih için materyal bulunamadı.</p>
      </div>
    );
  }
  
  return (
    <div>
      {morningMaterials.length > 0 && (
        <>
          <div className="text-sm text-gray-500 font-medium mb-4">Sabah Oturumu</div>
          <div className="space-y-4 mb-8">
            {morningMaterials.map(material => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </>
      )}
      
      {afternoonMaterials.length > 0 && (
        <>
          <div className="text-sm text-gray-500 font-medium mb-4">Öğleden Sonra Oturumu</div>
          <div className="space-y-4">
            {afternoonMaterials.map(material => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Navigation Component
 * -------------------
 * Uygulama alt kısmında yer alan navigasyon menüsü
 */
function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 py-2 z-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex justify-around">
          {/* Materyaller */}
          <Link href="#" className="flex flex-col items-center text-blue-600 relative">
            <div className="text-2xl mb-1">📚</div>
            <span className="text-xs font-medium">Materyaller</span>
            <div className="absolute -bottom-2 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
          </Link>
          
          {/* Takvim */}
          <Link href="#" className="flex flex-col items-center text-gray-500">
            <div className="text-2xl mb-1">📅</div>
            <span className="text-xs font-medium">Takvim</span>
          </Link>
          
          {/* Öğrenciler */}
          <Link href="#" className="flex flex-col items-center text-gray-500 relative">
            <div className="text-2xl mb-1">👩‍🎓</div>
            <span className="text-xs font-medium">Öğrenciler</span>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">3</div>
          </Link>
          
          {/* Ayarlar */}
          <Link href="#" className="flex flex-col items-center text-gray-500">
            <div className="text-2xl mb-1">⚙️</div>
            <span className="text-xs font-medium">Ayarlar</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// Sidebar bileşeni
// Sidebar bileşeni görsel iyileştirmeleri
function Sidebar({ activeMenu }) {
  return (
    <div className="h-full flex flex-col">
      {/* Menü Öğeleri */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          <li>
            <a href="#" className={`flex items-center px-4 py-3 ${
              activeMenu === 'materials' 
              ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 pl-3' 
              : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <span className="mr-3 text-lg">📚</span>
              <span className="font-medium">Materyaller</span>
            </a>
          </li>
          <li>
            <a href="#" className={`flex items-center px-4 py-3 ${
              activeMenu === 'calendar' 
              ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 pl-3' 
              : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <span className="mr-3 text-lg">📅</span>
              <span className="font-medium">Takvim</span>
            </a>
          </li>
          <li>
            <a href="#" className={`flex items-center px-4 py-3 ${
              activeMenu === 'students' 
              ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 pl-3' 
              : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <span className="mr-3 text-lg">👩‍🎓</span>
              <span className="font-medium">Öğrenciler</span>
              {activeMenu !== 'students' && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              )}
            </a>
          </li>
          <li>
            <a href="#" className={`flex items-center px-4 py-3 ${
              activeMenu === 'reports' 
              ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 pl-3' 
              : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <span className="mr-3 text-lg">📊</span>
              <span className="font-medium">Raporlar</span>
            </a>
          </li>
          <li>
            <a href="#" className={`flex items-center px-4 py-3 ${
              activeMenu === 'settings' 
              ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 pl-3' 
              : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <span className="mr-3 text-lg">⚙️</span>
              <span className="font-medium">Ayarlar</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Alt Profil Bölümü */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 font-medium">
            AÖ
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Ayşe Öğretmen</h3>
            <p className="text-xs text-gray-500">Matematik Öğretmeni</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Ana Sayfa
 * ---------
 * Uygulamanın ana sayfası ve tüm komponentleri birleştiren bileşen
 */
export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  useEffect(() => {
    const today = DAYS_DATA.find(day => day.isToday);
    setSelectedDate(today.id);
    
    const todaysMaterials = MATERIALS_DATA.filter(material => 
      material.date === `${today.year}-${String(today.month).padStart(2, '0')}-${String(today.date).padStart(2, '0')}`
    );
    setMaterials(todaysMaterials);
  }, []);

  const handleDateChange = (dateId) => {
    setSelectedDate(dateId);
    
    const selectedDay = DAYS_DATA.find(day => day.id === dateId);
    const selectedDateMaterials = MATERIALS_DATA.filter(material => 
      material.date === `${selectedDay.year}-${String(selectedDay.month).padStart(2, '0')}-${String(selectedDay.date).padStart(2, '0')}`
    );
    setMaterials(selectedDateMaterials);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header - Sabit pozisyonlu */}
      <header className="bg-blue-600 text-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto">
          <div className="flex items-center h-16 px-4">
            {/* Menü toggle butonu - Sadece mobil */}
            <button 
              className="md:hidden text-white text-2xl mr-4"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              ☰
            </button>
            
            {/* Logo - Her zaman görünür */}
            <div className="flex items-center mr-4">
              <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
                EÖ
              </div>
              <h2 className="text-white font-semibold ml-2 hidden sm:block">EğitimHub</h2>
            </div>
            
            {/* Öğretmen bilgileri - Sağda */}
            <div className="flex items-center ml-auto">
              <div className="text-right mr-3 hidden sm:block">
                <h1 className="font-bold">Merhaba, Ayşe Öğretmen</h1>
                <p className="text-xs text-blue-100">23 Mart 2025, Cuma</p>
              </div>
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <span className="text-xl text-blue-600">👩‍🏫</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                  7
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Ana içerik bölümü */}
      <div className="flex flex-1 pt-0">
        {/* Sidebar - Masaüstü sabit, mobilde kaydırılabilir */}
        <aside 
          className={`bg-white border-r border-gray-200 w-64 fixed md:sticky inset-y-0 left-0 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto z-20 top-16 h-[calc(100%-4rem)] md:h-auto md:top-16`}
        >
          <Sidebar activeMenu="materials" />
        </aside>
        
        {/* Ana içerik - Ortalaması düzeltildi */}
        <main className="flex-1 overflow-auto p-4 md:p-6 w-full">
          <div className="mx-auto max-w-4xl md:max-w-3xl lg:max-w-4xl">
            {/* Mobilde görünen mini başlık */}
            <div className="md:hidden text-center mb-4">
              <h1 className="font-bold text-gray-800">Merhaba, Ayşe Öğretmen</h1>
              <p className="text-xs text-gray-500">23 Mart 2025, Cuma</p>
            </div>
            
            {/* Takvim Kartı */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div className="flex items-center">
                  <span className="text-blue-600 mr-2">📅</span>
                  <h2 className="text-lg font-semibold text-gray-800">Takvim</h2>
                </div>
                <a href="#" className="text-blue-600 text-sm font-medium hover:underline">Tümünü Gör ›</a>
              </div>
              
              <div>
                <Calendar days={DAYS_DATA} selectedDate={selectedDate} onSelectDate={handleDateChange} />
              </div>
            </div>

            {/* Materyaller Kartı */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div className="flex items-center">
                  <span className="text-blue-600 mr-2">📚</span>
                  <h2 className="text-lg font-semibold text-gray-800">Dijital Materyaller</h2>
                </div>
                <a href="#" className="text-blue-600 text-sm font-medium hover:underline">Hepsini Görüntüle</a>
              </div>
              
              <div className="p-4">
                <MaterialList materials={materials} />
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Mobil karartma arka planı */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-15 backdrop-blur-sm z-10 transition-opacity duration-300 md:hidden ${
          sidebarOpen ? 'opacity-70' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
}