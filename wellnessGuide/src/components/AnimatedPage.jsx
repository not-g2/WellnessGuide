import { motion } from "framer-motion";

const pageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    exit: {
        opacity: 0,
        y: -15,
        scale: 0.98,
        transition: {
            duration: 0.4,
            ease: "easeInOut",
        },
    },
};

const AnimatedPage = ({ children }) => (
    <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen bg-[#FFF2E6] text-[#3A0E2B]"
    >
        {children}
    </motion.div>
);

export default AnimatedPage;
