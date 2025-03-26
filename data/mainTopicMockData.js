const mainTopicMockData = [
  {
    id: 1,
    mainTopic: "Öğrenciler İçin Sık Sorulan Sorular",
    icon: "🧒",
    subTopics: [
      {
        id: 1,
        title: "Bugünkü görevlerimi nereden görebilirim?",
        description:
          "Ana sayfada bugünün içerikleri (video, oyun, etkinlik) listelenir. Zaman çizelgesi üzerinden erişebilirsin.",
      },
      {
        id: 2,
        title: "Geçmiş günlerin içeriklerine nasıl ulaşırım?",
        description:
          "Zaman çizelgesinden geçmiş günlere tıklayarak ya da arşiv bölümünden önceki içeriklere ulaşabilirsin.",
      },
      {
        id: 3,
        title: "Görevleri tamamladığımı sistem nasıl anlıyor?",
        description:
          "Video süresinin %80’i izlenirse, belge incelenirse ya da görevde etkileşim yapılırsa görev tamamlanmış sayılır.",
      },
      {
        id: 4,
        title: "Tüm görevleri tamamladığımda ne olur?",
        description:
          "Ekranda 'Tebrikler' mesajı çıkar ve yıldız/ödül gibi geri bildirimler alırsın.",
      },
      {
        id: 5,
        title: "Giriş yaparken hata alıyorum, ne yapmalıyım?",
        description:
          "TC ve şifreni doğru yazdığından emin ol. Sorun devam ederse öğretmenine ya da okul yönetimine haber ver.",
      },
    ],
  },
  {
    id: 2,
    mainTopic: "Veliler İçin Sık Sorulan Sorular",
    icon: "👨‍👩‍👧‍👦",
    subTopics: [
      {
        id: 1,
        title: "Çocuğumun tamamladığı görevleri görebilir miyim?",
        description:
          "Evet, öğrenci panelinde günlük ilerleme çubuğu ve tamamlanan içerikler görüntülenebilir.",
      },
      {
        id: 2,
        title: "Öğretmenle nasıl iletişim kurabilirim?",
        description:
          "Sistem içerisindeki mesajlaşma modülünü kullanarak öğretmenle yazılı iletişim kurabilirsiniz.",
      },
      {
        id: 3,
        title: "Etkinlik ve duyuruları nereden takip edebilirim?",
        description:
          "Tüm okul duyuruları ve etkinlik bilgileri ana sayfa duyuru panelinden ve takvim modülünden görüntülenebilir.",
      },
      {
        id: 4,
        title: "Geri bildirimde bulunabilir miyim?",
        description:
          "Öneri ve şikayetlerinizi sistem üzerindeki geri bildirim formu aracılığıyla iletebilirsiniz.",
      },
    ],
  },
  {
    id: 3,
    mainTopic: "Öğretmenler İçin Sık Sorulan Sorular",
    icon: "👩‍🏫",
    subTopics: [
      {
        id: 1,
        title: "Hangi içeriklere erişebilirim?",
        description:
          "Sadece kendi branşınıza ve atanmış yaş grubuna ait içeriklere erişebilirsiniz.",
      },
      {
        id: 2,
        title: "İçeriklerle ilgili geri bildirim nasıl gönderilir?",
        description:
          "İçeriği inceledikten sonra panel üzerinden admin’e geri bildirim formu ile yorum yapabilirsiniz.",
      },
      {
        id: 3,
        title: "Geri bildirimlerime verilen yanıtları nasıl görebilirim?",
        description:
          "Yalnızca kendi gönderdiğiniz geri bildirimlerin durumunu görebilir ve admin yanıtlarını inceleyebilirsiniz.",
      },
      {
        id: 4,
        title: "Ek materyaller nerede ve ne kadar süre açık?",
        description:
          "Haftalık ek materyaller öğretmen panelinde görünür. Admin tarafından belirlenen süre boyunca erişebilirsiniz.",
      },
      {
        id: 5,
        title: "İçerikleri düzenleyebilir miyim?",
        description:
          "Hayır, öğretmenler içerikleri düzenleyemez veya yükleyemez; sadece inceleyip geri bildirimde bulunabilir.",
      },
    ],
  },
  {
    id: 4,
    mainTopic: "Teknik Destek ve Güvenlik",
    icon: "🛡️",
    subTopics: [
      {
        id: 1,
        title: "Verilerim güvende mi?",
        description:
          "Tüm kullanıcı verileri SSL/TLS ile şifrelenir. KVKK ve GDPR uyumluluğu sağlanmaktadır.",
      },
      {
        id: 2,
        title: "İki adımlı doğrulama var mı?",
        description:
          "Yönetici ve öğretmen hesaplarında isteğe bağlı iki adımlı doğrulama (OTP) kullanılabilir.",
      },
      {
        id: 3,
        title: "Şüpheli aktivitelerde bildirim alır mıyım?",
        description:
          "Sistemde olağandışı giriş veya riskli hareketler tespit edilirse bildirim veya e-posta ile uyarı yapılır.",
      },
      {
        id: 4,
        title: "Giriş bilgilerim güvende mi?",
        description:
          "Tüm giriş bilgileri okul yönetimi ve admin kontrolünde güvenli şekilde saklanır.",
      },
    ],
  },
  {
    id: 5,
    mainTopic: "İçerikler ve Eğitim Planı",
    icon: "📚",
    subTopics: [
      {
        id: 1,
        title: "İçerikler neye göre planlanıyor?",
        description:
          "Admin tarafından yaş grubuna, branşa ve eğitim dönemine göre içerik planlaması yapılır.",
      },
      {
        id: 2,
        title: "İçerikler ne zaman yayına alınır?",
        description:
          "İçerikler otomatik olarak belirlenen tarihte yayına alınır, zaman çizelgesine eklenir.",
      },
      {
        id: 3,
        title: "İçerikler haftalık mı günlük mü hazırlanıyor?",
        description:
          "Hem günlük akış içerikleri hem de haftalık ek materyaller ayrı ayrı hazırlanır ve planlanır.",
      },
    ],
  },
];

export default mainTopicMockData;
