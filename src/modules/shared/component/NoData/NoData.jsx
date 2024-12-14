import React from 'react';
import Image from '../../../../assets/Images/model.svg'
const NoData = () => {
    return <>
    <div className="nodata-container d-flex justify-content-center mt-5 ms-5 align-items-center flex-column">
        <div className="img-container">
            <img src={Image} alt="" />
        </div>
        <h4>No Data !</h4>
        <p className='text-muted'>It looks like there’s nothing to display here yet.</p>
    </div>
    </>
}

export default NoData;
