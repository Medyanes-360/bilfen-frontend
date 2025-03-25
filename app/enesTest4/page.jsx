"use client"
import React, { useState, useEffect } from 'react';

const LoginPopupV2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tcNo, setTcNo] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Artık rastgele karakterler oluşturmuyoruz
  // Bu kısmı kaldırdık çünkü fazla emoji kullanımını azaltmak istiyoruz

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Giriş işlemini simüle et
    setTimeout(() => {
      console.log('Giriş yapılıyor:', { tcNo, password });
      setIsLoading(false);
      // setIsOpen(false); // Başarılı girişte kapatabilirsiniz
    }, 1500);
  };

  // ESC tuşu ile kapatma fonksiyonu
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  // Body scroll kilit mekanizması
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div className="font-sans">
      {/* Tetikleyici Buton */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 hover:shadow-xl transition duration-300 flex items-center cursor-pointer"
      >
        <span className="mr-2">Giriş Yap</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

      {/* Popup Overlay - Fade in/out animasyonu */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={handleOverlayClick}
        >
          {/* Popup Container */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-bounce-in border-2 border-purple-200">
            {/* Kapatma Butonu */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 hover:bg-red-100 transition-all duration-200 z-10 bg-white bg-opacity-50 rounded-full p-1 cursor-pointer"
              aria-label="Kapat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Animasyonlu Karakterler kaldırıldı */}

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-center">
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-2">Macera Başlıyor!</h2>
                <p className="text-white text-lg">Dijtal İçerikler ile hem eğlen hem öğren.</p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-gradient-to-b from-white to-purple-50">
              {/* TC Kimlik Input */}
              <div className="space-y-2">
                <label htmlFor="tcNo" className="block text-lg font-medium text-purple-700 flex items-center transition-all duration-300 hover:text-purple-900">
                  <svg className="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  T.C. Kimlik Numaran
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    id="tcNo"
                    value={tcNo}
                    onChange={(e) => {
                      // Sadece sayı girişine izin ver
                      const value = e.target.value.replace(/\D/g, '');
                      setTcNo(value);
                    }}
                    maxLength={11}
                    className="pl-4 pr-4 py-4 w-full bg-white border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-lg transition-all duration-300 shadow-sm group-hover:shadow-md hover:border-purple-400 outline-none"
                    placeholder="11 haneli kimlik numaran"
                    required
                  />
                </div>
                {tcNo.length > 0 && tcNo.length < 11 && (
                  <p className="text-orange-500 text-sm animate-pulse">T.C. Kimlik numaran tam olarak 11 rakam olmalı!</p>
                )}
              </div>

              {/* Şifre Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-lg font-medium text-purple-700 flex items-center transition-all duration-300 hover:text-purple-900">
                  <svg className="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Gizli Şifren
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-4 pr-4 py-4 w-full bg-white border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-lg transition-all duration-300 shadow-sm group-hover:shadow-md hover:border-purple-400 outline-none"
                    placeholder="Süper gizli şifreni yaz"
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xl font-bold rounded-xl shadow-lg transform hover:translate-y-px hover:shadow-xl transition-all duration-300 relative overflow-hidden cursor-pointer"
              >
                <span className={`flex justify-center items-center transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                  <span>Maceraya Atla!</span>
                </span>
                
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* Hareketli Dalgalar */}
                <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden pointer-events-none">
                  <div className="h-full w-full bg-white bg-opacity-30 animate-wave"></div>
                </div>
              </button>
            </form>

            {/* Footer Animasyonu */}
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-4">
              <div className="flex justify-center space-x-6">
                <span className="text-3xl animate-bounce delay-100">📝</span>
                <span className="text-3xl animate-bounce delay-300">📚</span>
                <span className="text-3xl animate-bounce delay-500">🎮</span>
                <span className="text-3xl animate-bounce delay-700">🧩</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Özel Stil */}
      <style jsx global>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.03);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
        
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-wave {
          animation: wave 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default LoginPopupV2;