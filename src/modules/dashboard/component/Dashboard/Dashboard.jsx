import React, { useContext } from 'react';
import Navbar from '../../../shared/component/Navbar/Navbar';
import { Sidebar } from 'react-pro-sidebar';
import Header from '../../../shared/component/Header/Header';
import { AuthContext } from '../../../Context/AuthContext';
import { Link } from 'react-router-dom';
const Dashboard = () => {
    let {loginData}=useContext(AuthContext)
   
    return <>
    <Header title1={'Welcome'} title2={loginData?.userName} descreption={"This is a welcoming screen for the entry of the application , you can now see the options"}/>

   <div className="dash-container p-4 m-4">
   <div className="category-add d-flex justify-content-between align-items-center my-3">
            <div className="category-title">
                <h3>Fill the <span className='text-success h3'>Resipe </span> !</h3>
                <p className='text-muted'>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
            </div>
            <Link to={'recipes'}><button className='btn btn-success px-5'>Fill Recipe <i class="fa fa-arrow-right" aria-hidden="true"></i></button></Link> 
        </div>
   </div>
  
    </>
}

export default Dashboard;
