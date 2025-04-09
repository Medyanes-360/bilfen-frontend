import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center w-full bg-[#331d74] text-white py-6 h-36">
        <div className="text-lg flex-row justify-center items-center">
            <p className="font-light text-center">
              <span className="text-orange">BİLFEN</span> © {currentYear}. Tüm hakları saklıdır.
            </p>
        </div>
    </footer>
  );
};

export default Footer;
