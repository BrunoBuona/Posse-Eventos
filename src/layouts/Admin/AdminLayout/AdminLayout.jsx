import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import AdminMenuButton from '../../../components/AdminMenuButton/AdminMenuButton'
import AdminNav from '../AdminNav/AdminNav'
import "./AdminLayout.css"

export default function AdminLayout() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  useEffect(() => {
    setMenuIsOpen(false);
  }, [location])
  const toggleMenu = () => {
    setMenuIsOpen(value => !value);
  }
  return (
    <div className={`AdminLayout`}>
      <AdminMenuButton toggleMenu={toggleMenu} menuIsOpen={menuIsOpen} />
      <AdminNav menuIsOpen={menuIsOpen} isMobile={isMobile} />
      <div className='AdminMain p-5'>
      <Outlet />
      </div>
    </div>
  )
}
