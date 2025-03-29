// data/mockData.js
export const mockUserData = {
  id: 1,
  name: 'Ayşe',
  avatar: '☺️',
  completedTasks: 13,
  totalTasks: 20
};

export const mockLearningPathData = [
  {
    id: 1,
    title: 'Matematik Bulmacası',
    description: 'Eğlenceli sayı oyunları',
    materials: [
      { name: "Matematik Bulmacası", url: "/document.pdf" },
      { name: "Matematik Bulmacası", url: "/document.pdf" },
    ],
    date: "2025-03-29",
    icon: '🧮',
    typeIcon: '🎮',
    completed: true,
    current: false,
    isExtraMaterial: true
  },
  {
    id: 2,
    title: 'Günlük Okuma Etkinliği',
    description: '"Küçük Kaşifler" hikayesi',
    materials: ["document.pdf", "document.pdf"],
    date: "2025-03-29",
    icon: '📚',
    typeIcon: '📖',
    completed: true,
    current: false,
    isExtraMaterial: true
  },
  {
    id: 3,
    title: 'Bilim Deneyi İzleme',
    description: 'Mıknatısların gücü (5 dk)',
    materials: [
      { name: 'Mıknatısların gücü (5 dk)', url: "/example-video.mp4" },
      { name: "Matematik Bulmacası", url: "/document.pdf" },
    ],
    date: "2025-03-29",
    icon: '🧪',
    typeIcon: '🎬',
    completed: false,
    current: true,
    isExtraMaterial: false
  },
  {
    id: 4,
    title: 'İngilizce Çalışması',
    description: 'Hayvan isimleri aktivitesi',
    date: "2025-03-29",
    icon: '🇬🇧',
    typeIcon: '🧩',
    completed: false,
    current: false,
    isExtraMaterial: true
  }
];

export const mockRecommendationsData = [
  {
    id: 1,
    title: 'Güneş Sistemi Keşfi',
    description: 'Gezegenler hakkında eğlenceli bilgiler',
    type: 'Video',
    typeIcon: '🎬',
    contentIcon: '🪐'
  },
  {
    id: 2,
    title: 'Kodlama Macerası',
    description: 'Basit kodlama mantığını öğreten eğlenceli oyun',
    type: 'Oyun',
    typeIcon: '🎮',
    contentIcon: '💻'
  },
  {
    id: 3,
    title: 'Orman Dostları',
    description: 'Doğa ve dostluk konulu eğlenceli bir hikaye',
    type: 'Hikaye',
    typeIcon: '📖',
    contentIcon: '🌳'
  },
  {
    id: 4,
    title: 'Dinozorlar Dünyası',
    description: 'Dinozorlar hakkında interaktif bir sunum',
    type: 'Video',
    typeIcon: '🎬',
    contentIcon: '🦖'
  },
  {
    id: 5,
    title: 'Uzay Macerası',
    description: 'Uzay yolculuğu hakkında eğlenceli içerik',
    type: 'Oyun',
    typeIcon: '🎮',
    contentIcon: '🚀'
  }
];

// Günlük takvim verisi

export const generateCalendarData = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based index for months
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month

  const dayNames = ['Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']; // day names
  const calendarData = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    calendarData.push({
      id: day,
      date: day,
      dayName: dayNames[date.getDay()], // Get the day name
      isPast: day < today.getDate(), // Check if the day is in the past
      isToday: day === today.getDate(), // Check if the day is today
      tasksDone: Math.floor(Math.random() * 20), // Example: Random tasks done
      totalTasks: Math.floor(Math.random() * 20) + 10, // Example: Random total tasks
    });
  }

  return calendarData;
};

// Export dynamic calendar data
export const mockCalendarData = generateCalendarData();