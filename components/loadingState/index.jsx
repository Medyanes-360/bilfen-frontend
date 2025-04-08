export default function LoadingState({ role = "student" }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div
          className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
            role === "student" ? "border-orange-500" : "border-blue-500"
          } mx-auto mb-4`}
        ></div>
        <p className="text-gray-600">Yükleniyor...</p>
      </div>
    </div>
  );
}
