"use client";

export default function ErrorState({ role = "student", error, onRetry }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <div className="text-4xl mb-4">😕</div>
        <h2 className="text-xl font-bold text-red-500 mb-2">Bir hata oluştu</h2>
        <button
          onClick={onRetry}
          className={`cursor-pointer px-4 py-2 text-white rounded-lg ${
            role === "student" ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-500 hover:bg-blue-600"
          } transition-colors`}
        >
          Yeniden Dene
        </button>
      </div>
    </div>
  );
}
