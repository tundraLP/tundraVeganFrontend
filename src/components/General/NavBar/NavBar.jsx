import React from 'react'
import { useRedirectHome } from '../../../hooks/useRedirectHome'

const NavBar = () => {
    
    useRedirectHome();
    return (
        <div>NavBar</div>
    )
}

export default NavBar