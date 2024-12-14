import { useContext, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Menue from "../../../../assets/Images/3.png"
import { AuthContext } from './../../../Context/AuthContext';
const SideBar = () => {
let {loginData}=useContext(AuthContext)
  const [toggleMenu, settoggleMenu] = useState(false)
  const changeToggle=()=>{
    settoggleMenu(!toggleMenu)
  } 
  const logOut=()=>{
localStorage.removeItem('token')

  }
    return <>
    <div className="sidebar-container2">
    <Sidebar collapsed={toggleMenu}>
  <Menu>
    
    <MenuItem icon={<img  src={Menue} alt="" />} className='logo-menue-item' onClick={changeToggle} component={<Link to="/dashboard"/>} > </MenuItem>
    <MenuItem icon={<i className="fa fa-home" aria-hidden="true"></i>} component={<Link to="/dashboard"/>} > Home </MenuItem>
   {loginData?.userGroup=="SuperAdmin"?<MenuItem icon={<i className="fa-solid fa-users"></i>} component={<Link to="/dashboard/users"/>} >Users </MenuItem>:""} 
    <MenuItem icon={<i className="fa-solid fa-book-open"></i>} component={<Link to="/dashboard/recipeList"/>} > Recipes </MenuItem>
    {loginData?.userGroup=="SuperAdmin"?<MenuItem icon={<i className="fa-solid fa-layer-group"></i>} component={<Link to="/dashboard/categoriesList"/>} >Categories </MenuItem>:""}
    {loginData?.userGroup!="SuperAdmin"?<MenuItem icon={<i className="fa-solid fa-heart"></i>} component={<Link to="/dashboard/favourite"/>}>Favourite</MenuItem>:""}
    <MenuItem icon={<i className="fa-solid fa-unlock"></i>} component={<Link to="/dashboard/changePass"/>} >Change Password </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>} onClick={logOut} component={<Link to="/login"/>} > LogOut</MenuItem>
  </Menu>
</Sidebar>;
    </div>
    
    </>
}

export default SideBar;
