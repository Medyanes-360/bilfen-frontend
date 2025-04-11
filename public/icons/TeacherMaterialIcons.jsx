export class IconByTypeInfo {
  constructor(type) {
    this.type = type;
  }

  get icon() {
    switch (this.type) {
      case "video":
        return this.getVideoIcon();
      case "audio":
        return this.getAudioIcon();
      case "document":
        return this.getDocumentIcon();
      case "game":
        return this.getGameIcon();
      case "quiz":
        return this.getQuizIcon();
      default:
        return this.getDefaultIcon();
    }
  }

  get bgColor() {
    return (
      {
        video: "bg-green-50",
        document: "bg-blue-50",
        game: "bg-orange-50",
        quiz: "bg-purple-50",
        audio: "bg-yellow-50",
      }[this.type] || "bg-gray-50"
    );
  }

  get color() {
    return (
      {
        video: "text-green-600",
        document: "text-blue-600",
        game: "text-orange-600",
        quiz: "text-purple-600",
        audio: "text-yellow-600",
      }[this.type] || "text-gray-600"
    );
  }

  get borderColor() {
    return (
      {
        video: "border-green-200",
        document: "border-blue-200",
        game: "border-orange-200",
        quiz: "border-purple-200",
        audio: "border-yellow-200",
      }[this.type] || "border-gray-200"
    );
  }

  get label() {
    return (
      {
        video: "Video",
        document: "PDF",
        game: "Eğitsel Oyun",
        quiz: "Çalışma Kağıdı",
        audio: "Ses",
      }[this.type] || "Materyal"
    );
  }

  get buttonText() {
    return (
      {
        video: "Görüntüle",
        document: "Görüntüle",
        game: "Başlat",
        quiz: "Görüntüle",
        audio: "Dinle",
      }[this.type] || "Görüntüle"
    );
  }

  get buttonIcon() {
    const eyeIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
    const playIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    );
    const audioIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="11 5 6 9 6 15 11 19 11 5" />
        <path d="M19.5 12a4.5 4.5 0 0 0-4.5-4.5v9a4.5 4.5 0 0 0 4.5-4.5z" />
      </svg>
    );

    return this.type === "game"
      ? playIcon
      : this.type === "audio"
      ? audioIcon
      : eyeIcon;
  }

  // Icon renderers
  getVideoIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    );
  }

  getDocumentIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    );
  }

  getGameIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="6" y1="11" x2="10" y2="11" />
        <line x1="8" y1="9" x2="8" y2="13" />
        <line x1="15" y1="12" x2="15.01" y2="12" />
        <line x1="18" y1="10" x2="18.01" y2="10" />
        <rect x="2" y="6" width="20" height="12" rx="2" />
      </svg>
    );
  }

  getQuizIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <circle cx="12" cy="14" r="2" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    );
  }

  getAudioIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="11 5 6 9 6 15 11 19 11 5" />
        <path d="M19.5 12a4.5 4.5 0 0 0-4.5-4.5v9a4.5 4.5 0 0 0 4.5-4.5z" />
      </svg>
    );
  }

  getDefaultIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
      </svg>
    );
  }
}
