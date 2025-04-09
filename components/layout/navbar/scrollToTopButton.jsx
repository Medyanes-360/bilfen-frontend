import Icons from "@/public/icons/Icons";

const ScrollToTopButton = ({ show }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={scrollToTop}
      className={`cursor-pointer w-10 h-10 md:w-14 md:h-14 fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-orange rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50 ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <Icons.UpIcon className="text-white hover:text-darklila w-6 h-6 md:w-8 md:h-8 duration-500 transition" />
    </div>
  );
};

export default ScrollToTopButton;
