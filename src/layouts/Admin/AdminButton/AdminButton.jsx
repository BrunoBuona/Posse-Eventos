import React from 'react'
import { NavLink } from 'react-router-dom'
import "./AdminButton.css"

export default function AdminButton({to, name}) {
  return (
    <NavLink className={({isActive}) => isActive ? "isActive" : "AdminButton"} to={to}>
      <div className='w-100 p-3'>
        <p className="text-white m-0">{name}</p>
      </div>
    </NavLink>
  )
}
