import { AnimatePresence, motion } from "framer-motion";
import "./AdminMenuButton.css"
import React from "react";

const Path = props => (
  <motion.path fill="transparent" strokeWidth="3" stroke="white" strokeLinecap="round" {...props} />
);

export default function AdminMenuButton({toggleMenu, menuIsOpen}) {
  return (
    <AnimatePresence>
      <motion.button
        className="MenuButton"
        onClick={toggleMenu}
        aria-label="Close"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <svg width="18" height="18" viewBox="0 0 23 23">
          <Path animate={{ d: menuIsOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" }} />
          <Path d="M 2 9.423 L 20 9.423" animate={{ opacity: menuIsOpen ? 0 : 1 }} transition={{ duration: 0.1 }} />
          <Path animate={{ d: menuIsOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" }} />
        </svg>
      </motion.button>
    </AnimatePresence>
  );
}
