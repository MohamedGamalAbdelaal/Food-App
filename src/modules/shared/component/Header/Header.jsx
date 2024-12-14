import React from 'react';
import Vector from '../../../../assets/Images/Group 48102098.png'
const Header = ({title1,title2,descreption}) => {
    return <>
    <div className="header-container m-4 d-flex justify-content-between align-items-center p-5 rounded-3 text-white">
        <div className="header-content">
        <span className='h1 pe-2 '>{title1}</span ><span className='h3 text1'>{title2}</span>
        <p className='mt-4'>{descreption}</p>
        </div>
        <div className="header-image">
            <img src={Vector} alt="" />
        </div>
        </div>
    </>
}

export default Header;
