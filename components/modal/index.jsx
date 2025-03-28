import { motion, AnimatePresence } from "framer-motion";

export const Modal = ({ children, onClose, className = "max-w-3xl" }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="modal-bg"
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 m-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          key="modal-content"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`bg-white rounded-lg shadow-lg w-full ${className} max-h-[90vh] overflow-y-auto p-6 relative`}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
