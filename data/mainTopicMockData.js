const mainTopicMockData = [
  {
    id: 1,
    mainTopic: "Sistemi nasıl kullanabilirim?",
    icon: "🎓",
    subTopics: [
      {
        id: 1,
        title: "Sistemi nasıl kullanabilirim?",
        description:
          "Sistemimiz öğretmen, öğrenci ve veli profillerine göre farklı arayüzler sunar. Giriş yaptıktan sonra kullanıcı rolünüze uygun araçlara ulaşabilirsiniz.",
      },
      {
        id: 2,
        title: "Giriş bilgilerimi unuttum, ne yapmalıyım?",
        description:
          "Giriş ekranında yer alan 'Şifremi Unuttum' seçeneğine tıklayarak şifrenizi sıfırlayabilirsiniz.",
      },
      {
        id: 3,
        title: "Veli olarak sistemde neleri görebilirim?",
        description:
          "Veliler çocuklarının ders programını, sınav notlarını ve ödev durumlarını görebilir.",
      },
      {
        id: 4,
        title: "Sistemde kullanıcı rollerini kim belirliyor?",
        description:
          "Kullanıcı rolleri (öğretmen, öğrenci, veli) okul yönetimi tarafından atanır ve doğrulanır.",
      },
      {
        id: 5,
        title: "Mobil uygulamanız var mı?",
        description:
          "Evet, sistemimizin iOS ve Android uygulamaları vardır. Uygulama üzerinden bildirimleri alabilir ve dersleri takip edebilirsiniz.",
      },
      {
        id: 6,
        title: "Sistemde kullanıcı rollerini kim belirliyor?",
        description:
          "Kullanıcı rolleri (öğretmen, öğrenci, veli) okul yönetimi tarafından atanır ve doğrulanır.",
      },
      {
        id: 7,
        title: "Mobil uygulamanız var mı?",
        description:
          "Evet, sistemimizin iOS ve Android uygulamaları vardır. Uygulama üzerinden bildirimleri alabilir ve dersleri takip edebilirsiniz.",
      },
    ],
  },
  {
    id: 2,
    mainTopic: "Eğitim içeriği hakkında sorular",
    icon: "📘",
    subTopics: [
      {
        id: 1,
        title: "Hangi dersler sistemde mevcut?",
        description:
          "Sistemimizde temel dersler ve destekleyici aktiviteler bulunmaktadır.",
      },
      {
        id: 2,
        title: "İçerikler yaşa ve sınıfa uygun mu?",
        description:
          "Tüm içerikler pedagojik uzmanlar tarafından uygun şekilde tasarlanmıştır.",
      },
      {
        id: 3,
        title: "Canlı dersler var mı?",
        description:
          "Evet, öğretmenler canlı ders planlayabilir ve öğrenciler katılım sağlayabilir.",
      },
      {
        id: 4,
        title: "İçerikler hangi sıklıkla güncelleniyor?",
        description:
          "Müfredat güncellemeleri ve dönemsel etkinliklerle içerikler düzenli olarak yenilenir.",
      },
    ],
  },
  {
    id: 3,
    mainTopic: "Sınavlar ve başarı takibi",
    icon: "📊",
    subTopics: [
      {
        id: 1,
        title: "Sınav sonuçlarını nereden görebilirim?",
        description:
          "Öğrenci ve veli panellerinden sonuçlara ve detaylı analizlere ulaşabilirsiniz.",
      },
      {
        id: 2,
        title: "Öğrenci başarısı nasıl takip edilir?",
        description:
          "Grafiksel gösterimler ve raporlar aracılığıyla öğrenci performansı analiz edilir.",
      },
      {
        id: 3,
        title: "Seviye belirleme sınavı yapılıyor mu?",
        description:
          "Evet, dönem başlarında seviye belirleme sınavları uygulanmaktadır.",
      },
    ],
  },
  {
    id: 4,
    mainTopic: "Ödev ve etkinlikler",
    icon: "📝",
    subTopics: [
      {
        id: 1,
        title: "Ödevler nasıl veriliyor ve teslim ediliyor?",
        description:
          "Öğrenciler ödevlerini sistem üzerinden alır ve teslim eder. Takip sistemiyle eksik ödevler kolayca görülür.",
      },
      {
        id: 2,
        title: "Etkinlikler nasıl duyuruluyor?",
        description:
          "Tüm okul içi ve dışı etkinlikler sistemin takvim modülünde yer alır.",
      },
      {
        id: 3,
        title: "İnteraktif etkinlikler var mı?",
        description:
          "Oyunlaştırılmış öğrenme araçları ve etkileşimli quiz'ler sistemde mevcuttur.",
      },
      {
        id: 4,
        title: "Öğretmenler etkinlik önerisi ekleyebilir mi?",
        description:
          "Evet, öğretmenler etkinlik önerilerini sistem üzerinden paylaşabilir.",
      },
    ],
  },
  {
    id: 5,
    mainTopic: "Gizlilik ve güvenlik",
    icon: "🔒",
    subTopics: [
      {
        id: 1,
        title: "Verilerim güvende mi?",
        description:
          "KVKK ve GDPR kurallarına uygun şekilde veri koruma sağlıyoruz.",
      },
      {
        id: 2,
        title: "Çocukların bilgileri nasıl korunuyor?",
        description:
          "Tüm bilgiler sadece yetkili kullanıcılarla paylaşılır ve sistem dışında erişilemez.",
      },
    ],
  },
  {
    id: 6,
    mainTopic: "Okul ve öğretmenlerle iletişim",
    icon: "📞",
    subTopics: [
      {
        id: 1,
        title: "Öğretmenle nasıl iletişim kurabilirim?",
        description:
          "Mesajlaşma modülü sayesinde doğrudan iletişim kurabilirsiniz.",
      },
      {
        id: 2,
        title: "Okul duyurularını nereden takip edebilirim?",
        description: "Tüm duyurular ana sayfadaki duyuru panelinde yer alır.",
      },
      {
        id: 3,
        title: "Şikayet ve önerileri nasıl bildirebilirim?",
        description:
          "Geri bildirim formunu doldurarak öneri ve şikayetlerinizi paylaşabilirsiniz.",
      },
      {
        id: 4,
        title: "Öğretmen veli görüşmeleri nasıl ayarlanıyor?",
        description:
          "Sistem üzerinden uygun zaman dilimi seçerek randevu oluşturabilirsiniz.",
      },
    ],
  },
  {
    id: 7,
    mainTopic: "Abonelik ve teknik destek",
    icon: "💡",
    subTopics: [
      {
        id: 1,
        title: "Sisteme abonelik nasıl çalışıyor?",
        description:
          "Yıllık veya dönemlik planlarla okul bazlı abonelik sistemi uygulanmaktadır.",
      },
      {
        id: 2,
        title: "Teknik destek nasıl alınır?",
        description:
          "Canlı destek, e-posta ve yardım merkezi üzerinden destek alabilirsiniz.",
      },
      {
        id: 3,
        title: "Destek saatleriniz nedir?",
        description:
          "Hafta içi 09:00 - 18:00 saatleri arasında destek sunmaktayız.",
      },
    ],
  },
];

export default mainTopicMockData;
