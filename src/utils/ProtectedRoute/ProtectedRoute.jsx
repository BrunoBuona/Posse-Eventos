import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({isAllowed, children, reDirect}) => {

        if(!isAllowed){
            return <Navigate to={reDirect}/>
        }
    return children ? children : <Outlet/>
}
