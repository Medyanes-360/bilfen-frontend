// data/mockData.js
export const mockUserData = {
  id: 1,
  name: 'Ayşe',
  avatar: '👧',
  completedTasks: 13,
  totalTasks: 20
};

export const mockLearningPathData = [
  {
    id: 1,
    title: 'Matematik Bulmacası',
    description: 'Eğlenceli sayı oyunları',
    date: "2025-03-23",
    icon: '🧮',
    typeIcon: '🎮',
    completed: true,
    current: false,
    isNew: false
  },
  {
    id: 2,
    title: 'Günlük Okuma Etkinliği',
    description: '"Küçük Kaşifler" hikayesi',
    date: "2025-03-23",
    icon: '📚',
    typeIcon: '📖',
    completed: true,
    current: false,
    isNew: false
  },
  {
    id: 3,
    title: 'Bilim Deneyi İzleme',
    description: 'Mıknatısların gücü (5 dk)',
    date: "2025-03-23",
    icon: '🧪',
    typeIcon: '🎬',
    completed: false,
    current: true,
    isNew: true
  },
  {
    id: 4,
    title: 'İngilizce Çalışması',
    description: 'Hayvan isimleri aktivitesi',
    date: "2025-03-22",
    icon: '🇬🇧',
    typeIcon: '🧩',
    completed: false,
    current: false,
    isNew: false
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
export const mockCalendarData = [
  {
    id: 1,
    date: 19,
    dayName: 'Pts',
    isPast: true,
    isToday: false,
    tasksDone: 15,
    totalTasks: 18
  },
  {
    id: 2,
    date: 20,
    dayName: 'Sal',
    isPast: true,
    isToday: false,
    tasksDone: 14,
    totalTasks: 16
  },
  {
    id: 3,
    date: 21,
    dayName: 'Çar',
    isPast: true,
    isToday: false,
    tasksDone: 16,
    totalTasks: 17
  },
  {
    id: 4,
    date: 22,
    dayName: 'Per',
    isPast: true,
    isToday: false,
    tasksDone: 12,
    totalTasks: 15
  },
  {
    id: 5,
    date: 23,
    dayName: 'Cum',
    isPast: false,
    isToday: true,
    tasksDone: 13,
    totalTasks: 20
  },
  {
    id: 6,
    date: 24,
    dayName: 'Cmt',
    isPast: false,
    isToday: false,
    tasksDone: 0,
    totalTasks: 12
  },
  {
    id: 7,
    date: 25,
    dayName: 'Paz',
    isPast: false,
    isToday: false,
    tasksDone: 0,
    totalTasks: 10
  },
  {
    id: 8,
    date: 26,
    dayName: 'Pts',
    isPast: false,
    isToday: false,
    tasksDone: 0,
    totalTasks: 15
  },
  {
    id: 9,
    date: 27,
    dayName: 'Sal',
    isPast: false,
    isToday: false,
    tasksDone: 0,
    totalTasks: 14
  }
];