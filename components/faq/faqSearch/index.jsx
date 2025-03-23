const FaqSearch = () => {
  return (
    <div className="flex flex-col items-left sm:p-6">
      {/* Başlık */}
      <p className="text-xl text-center sm:text-start sm:text-2xl font-Inter font-medium sm:font-bold text-purple-400 mb-4 leading-6 sm:leading-[54px]">
        Nasıl size yardımcı olabiliriz?
      </p>

      {/* Arama Kutusu */}
      <div
        className="flex items-center w-full max-w-[539px] rounded-full gap-[10px]"
        style={{
          boxShadow:
            "-20px 20px 40px -4px #919EAB3D, 0px 0px 2px 0px #919EAB3D",
        }}
      >
        {/* Input */}
        <input
          type="text"
          placeholder="Aramak istediğiniz konuyu yazın"
          className="flex-1 text-sm bg-transparent focus:outline-none ml-5 pr-2"
        />

        {/* Buton */}
        <button className="flex items-center justify-center px-6 py-3 gap-3 text-[#fff] bg-[#7534FF] rounded-full hover:bg-purple-700 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m-3.65.85a7.5 7.5 0 1 1 7.5-7.5 7.5 7.5 0 0 1-7.5 7.5z"
            />
          </svg>
          <span className="hidden sm:block text-[16px] font-medium font-poppins leading-6">
            Arama
          </span>
        </button>
      </div>
    </div>
  );
};

export default FaqSearch;
