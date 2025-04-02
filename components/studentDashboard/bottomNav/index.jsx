export default function BottomNavigation() {
    return (
        <nav className="fixed lg:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 shadow-lg z-10">
            <div className="max-w-lg md:max-w-2xl mx-auto flex justify-around">
                {[
                    { label: "Ana Sayfa", icon: "🏠", active: true },
                    { label: "Keşfet", icon: "🧭", active: false },
                    { label: "Başarılar", icon: "🏆", active: false, badge: 3 },
                    { label: "Profil", icon: "👤", active: false },
                ].map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center relative cursor-pointer transition-transform hover:scale-110 ${item.active ? "text-orange-500" : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <div className="text-2xl mb-1">{item.icon}</div>
                        <div className="text-xs">{item.label}</div>
                        {item.badge && (
                            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                                {item.badge}
                            </div>
                        )}
                        {item.active && <div className="absolute -bottom-3 w-1.5 h-1.5 rounded-full bg-orange-500"></div>}
                    </div>
                ))}
            </div>
        </nav>
    )
}
