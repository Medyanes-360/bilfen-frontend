import Icons from "@/public/icons/Icons";

const ScrollToTopButton = ({ show }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div
      onClick={scrollToTop}
      className={`cursor-pointer w-18 h-18 fixed bottom-8 right-8 bg-orange rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
     <Icons.UpIcon className="text-white hover:text-darklila w-12 h-12 duration-500 transition"/>
    </div>
  );
};

export default ScrollToTopButton;