"use client";
import { redirect, useRouter } from "next/navigation";

const Header = ({ dropdownRef, dropdownOpen, setDropdownOpen }) => {
  const router = useRouter();
  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-30">
      <div className="container mx-auto">
        <div className="flex items-center h-16 px-4">
          {/* Menü toggle butonu - Sadece mobil */}
          {/* <button
                  className="lg:hidden text-white text-2xl mr-4"
                  onClick={toggleSidebar}
                  aria-label="Toggle menu"
                >
                  ☰
                </button> */}

          {/* Logo - Her zaman görünür */}
          <div className="flex items-center mr-4">
            <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
              EÖ
            </div>
            <h2 className="text-white font-semibold ml-2 hidden sm:block">
              EğitimHub
            </h2>
          </div>

          {/* Öğretmen bilgileri - Sağda */}
          <div className="flex items-center ml-auto" ref={dropdownRef}>
            <div className="text-right mr-3 hidden sm:block">
              <h1 className="font-bold">Merhaba, Ayşe Öğretmen</h1>
              <p className="text-xs text-blue-100">23 Mart 2025, Cuma</p>
            </div>

            {/* Profil butonu */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="cursor-pointer w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl text-blue-600 shadow-sm hover:shadow-md transition-all duration-200"
                aria-label="Profil Menüsü"
              >
                👩‍🏫
              </button>

              {/* Dropdown menü */}
              <div
                className={`${
                  dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                } absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden transition-all duration-200`}
              >
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push("/");
                  }}
                  className="cursor-pointer w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 002 2h3a2 2 0 002-2V5a2 2 0 00-2-2h-3a2 2 0 00-2 2v1"
                    />
                  </svg>
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
