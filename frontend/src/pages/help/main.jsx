import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function HelpMain() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        if (pathname === "/help" || pathname === "/help/") {
            navigate("/help/help")
        }
    })

    return (
        <div>
            <Outlet />
        </div>
    )
}
