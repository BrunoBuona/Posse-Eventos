import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import AdminButton from "../AdminButton/AdminButton";
import "./AdminNav.css";

export default function AdminNav({ isMobile, menuIsOpen }) {
  return (
    <AnimatePresence>
      {(!isMobile || (isMobile && menuIsOpen)) && (
        <motion.div
          className="AdminNav"
          initial={{ x: -768 }}
          animate={{ x: 0 }}
          exit={{ x: -768 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <AdminButton to="/admin/home" name="Inicio" />
          <AdminButton to="/admin/concerts" name="Eventos" />
          <AdminButton to="/admin/artists" name="Artistas" />
          <AdminButton to="/admin/drinks" name="Bebidas" />
          <AdminButton to="/admin/venues" name="Localizaciones" />
          <div className="mt-auto">
            <AdminButton to="/" name="Volver al sitio web" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
