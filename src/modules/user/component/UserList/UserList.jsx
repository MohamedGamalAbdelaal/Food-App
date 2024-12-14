import React, { useEffect, useState } from "react";
import Header from "./../../../shared/component/Header/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import NoData from "./../../../shared/component/NoData/NoData";
import Nodata from "../../../../assets/Images/model.svg";
import { IMAGE_URL } from "../../../../Services/api/apiURL";
const UserList = () => {
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [userList, setUserList] = useState([]);
  const getUsers = async () => {
    const response = await axios.get(
      "https://upskilling-egypt.com:3006/api/v1/Users/",
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    setUserList(response.data.data);
    setArrayOfPages(
      Array(response.data.totalNumberOfPages)
        .fill()
        .map((_, i) => i + 1)
    );
    console.log(response.data.data);
  };
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Header
        title1={"User"}
        title2={"List"}
        descreption={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <div className="category-add d-flex justify-content-between align-items-center me-4 ms-4">
        <div className="category-title">
          <h3>Users Table Details</h3>
          <p className="text-muted">You can check all details</p>
        </div>
        <Link to={"newRecipe"}>
          <button className="btn btn-success px-5">Add New User</button>
        </Link>
      </div>
      <div className="users-container p-4">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center" scope="col">
                {" "}
                Name
              </th>
              <th className="text-center" scope="col">
                Image
              </th>
              <th className="text-center" scope="col">
                Phone Number
              </th>
              <th className="text-center" scope="col">
                Email
              </th>
              <th className="text-center" scope="col">
                Country{" "}
              </th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {userList.length > 0 ? (
              userList.map((user, indx) => (
                <tr key={indx}>
                  <td className="text-center">{user.userName}</td>
                  <td className="text-center w-25 h-25">
                    <div className="w-25 h-25 m-auto">
                      {user.imagePath ? (
                        <img
                          className="w-100 h-100"
                          src={`${IMAGE_URL}/${user.imagePath}`}
                          alt=""
                        />
                      ) : (
                        <img className="w-100 h-100" src={Nodata} />
                      )}
                    </div>
                  </td>
                  <td className="text-center">{user.phoneNumber}</td>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center">{user.country}</td>
                  <td>
                     <div className="dropdown text-end">
                       <i
                         className="fa-solid fa-ellipsis text-center"
                         type="button"
                         data-bs-toggle="dropdown"
                         aria-expanded="false"
                       ></i>
 
                       <ul className="dropdown-menu">
                         <li className="dropdown-item">
                           <i className="fa-solid fa-eye text-success"></i> View
                         </li>
                         <li
                           className="dropdown-item"
                           onClick={() => handleShow(product.id)}
                         >
                           <i className="fa fa-trash text-success"></i> Delete
                         </li>
                       </ul>
                     </div>
                   </td>
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>
        
      </div>
    </>
  );
};

export default UserList;
