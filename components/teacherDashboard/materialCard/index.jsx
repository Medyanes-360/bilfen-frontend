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

const MaterialCard = ({ material }) => {
  const typeInfo = getTypeInfo(material.type);

  return (
    <div className="group flex border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-blue-200">
      {/* Sol renk çubuğu */}
      <div className="w-1.5 bg-blue-600 group-hover:w-2 transition-all duration-300"></div>

      <div className="flex flex-1 flex-col sm:flex-row p-4 gap-3 sm:gap-0">
        {/* İkon Alanı */}
        <div
          className={`mr-0 sm:mr-4 ${typeInfo.bgColor} ${typeInfo.color} p-3 rounded-lg flex items-center justify-center border ${typeInfo.borderColor} h-full group-hover:shadow-md transition-all duration-300 ease-in-out group-hover:scale-105 w-fit self-start`}
        >
          <div className="transform transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
            {typeInfo.icon}
          </div>
        </div>

        {/* İçerik Alanı */}
        <div className="flex-1 min-w-0">
          {/* Başlık ve rozetler */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="min-w-0 pr-1">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base flex items-center flex-wrap gap-1 truncate group-hover:text-blue-700 transition-colors duration-300">
                {material.title}

                {material.viewed && (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full whitespace-nowrap group-hover:bg-green-200 transition-colors duration-300">
                    ✓ İncelendi
                  </span>
                )}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                {material.description}
              </p>
            </div>

            <div
              className={`text-xs px-2 py-1 rounded-full ${typeInfo.bgColor} ${typeInfo.color} font-medium whitespace-nowrap group-hover:shadow-sm group-hover:scale-105 transition-all duration-300 w-fit`}
            >
              {typeInfo.label}
            </div>
          </div>

          {/* Süre, tarih, butonlar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3 sm:gap-0">
            <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-4 group-hover:text-gray-700 transition-colors duration-300">
              <span className="flex items-center whitespace-nowrap">
                {material.type === "document" ? "📄" : "⏱️"} {material.duration}
              </span>
              <span className="flex items-center whitespace-nowrap">
                📅 {material.date}
              </span>
            </div>

            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto">
              <button className="cursor-pointer w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded flex items-center justify-center text-xs sm:text-sm font-medium hover:bg-blue-700 shadow-sm hover:shadow active:shadow-inner active:scale-95 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                {typeInfo.buttonIcon}
                <span className="ml-1">{typeInfo.buttonText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;
