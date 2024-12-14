import React, { useContext } from 'react';
import Avatar from '../../../../assets/Images/Ellipse 234.png'
import { AuthContext } from '../../../Context/AuthContext';
const Navbar = () => {
    let {loginData}=useContext(AuthContext)
    return <>
    <div className="nav-container d-flex justify-content-end align-items-center m-4 bg-light rounded-2 p-3">
        <img className='mx-3' src={Avatar} alt="" />
        <span>{loginData?.userName}</span>
    </div>
     </>
}

export default Navbar;
