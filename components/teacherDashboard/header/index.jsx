import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import Image from "next/image";

const Header = ({user, currentDate}) => {

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-30">
      <div className="container mx-auto">
        <div className="flex items-center h-16 px-4">
          {/* Logo */}
          <div className="flex items-center mr-4">
            <Image
              src="/images/logo-white.webp"
              alt="BİLFEN"
              width={135}
              height={80}
            />
          </div>

          {/* Sağ taraf */}
          <div className="flex items-center ml-auto gap-3">
            <div className="text-right hidden sm:block">
              <h2 className="font-bold">
                Merhaba, {user ? user.name : "Misafir"}
              </h2>
              <p className="text-xs text-blue-100">{currentDate}</p>
            </div>

            {/* Profil butonu */}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl text-blue-600 shadow-sm">
              👩‍🏫
            </div>

            {/* Çıkış butonu ikonu */}
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              className="cursor-pointer text-blue-100 hover:text-white transition-colors duration-200"
              aria-label="Çıkış Yap"
              title="Çıkış Yap"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
