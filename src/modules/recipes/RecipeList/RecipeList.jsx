import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../../Services/api";
import Header from "../../shared/component/Header/Header";
import NoData from "./../../shared/component/NoData/NoData";
import axios from "axios";
import DeletConfirmation from "./../../shared/component/Delet-Confirmation/Delet-Confirmation";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Nodata from "../../../assets/Images/model.svg";
import { AuthContext } from "./../../Context/AuthContext";
import { IMAGE_URL } from './../../../Services/api/apiURL';
const RecipeList = () => {
  let { loginData } = useContext(AuthContext);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [selectedId, setSelectedId] = useState(0);
  const [nameValue, setNameValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [catValue, setCatValue] = useState("");
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };
  const [Updateshow, setUpdateShow] = useState(false);
  const handleUpdateClose = () => setUpdateShow(false);
  const [selectedUpdateId, setSelectedUpdateId] = useState(0);
  const [selectedUpdateName, setSelectedUpdateName] = useState("");

  const handleUpdateShow = (id, name) => {
    setSelectedUpdateId(id);
    setSelectedUpdateName(name);
    setUpdateShow(true);
  };

  let getRecipe = async (pageNumber, pageSize, name, tagId, catId) => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/?",
        {
          params: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            name: name,
            tagId: tagId,
            categoryId: catId,
          },
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setRecipeList(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFun = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${selectedId}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      handleClose();
      getData();
      toast.success("Delete Category Successfly");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const getCategory = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/",
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setCategoryList(response.data.data);
      console.log("5", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTags = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag/",
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setTagsList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addFav = async (id) => {
    try {
      let response = await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe/`,
        {
          recipeId: id,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      console.log("8", response);
    } catch (error) {
      console.log(error);
    }
  };
  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getRecipe(1, 5, input.target.value, tagValue, catValue);
  };
  const getTagValue = (input) => {
    setTagValue(input.target.value);
    getRecipe(1, 5, nameValue, input.target.value, catValue);
  };
  const getCatValue = (input) => {
    setCatValue(input.target.value);
    getRecipe(1, 5, nameValue, tagValue, input.target.value);
  };
  useEffect(() => {
    getRecipe();
    getCategory();
    getTags();
    addFav();
  }, []);
  return (
    <>
      <Header
        title1={"Recipe"}
        title2={"item"}
        descreption={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
       
      <div className="categories-container p-4">
        <div className="search-container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                onChange={getNameValue}
              />
            </div>
            <div className="col-md-3">
              <select className="form-control" onChange={getCatValue}>
                <option value="Category">Categories</option>
                {categoryList?.map((cat, index) => (
                  <option key={index} value={cat?.id}>
                    {cat?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-control" onChange={getTagValue}>
                <option value="Tags">Tags</option>
                {tagsList?.map((tag, index) => (
                  <option key={index} value={tag?.id}>
                    {tag?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="category-add d-flex justify-content-between align-items-center my-3">
          <div className="category-title">
            <h3>Recipes Table Details</h3>
            <p className="text-muted">You can check all details</p>
          </div>
          <Link to={"newRecipe"}>
            <button className="btn btn-success px-5">Add New Recipe</button>
          </Link>
        </div>
        <DeletConfirmation
          show={show}
          deletItem={"Recipe"}
          handleClose={handleClose}
          deleteFun={deleteFun}
        />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {recipeList.length > 0 ? (
              recipeList.map((recipe, indx) => (
                <tr key={indx}>
                  <td>{recipe.name}</td>
                  <td className="text-center w-25 h-25">
                    <div className="w-25 h-25">
                    {recipe.imagePath ? (
                      <img className="w-100 h-100"src={`${IMAGE_URL}/${recipe.imagePath}`} alt="" />
                    ) : (
                      <img className="w-100 h-100" src={Nodata} />
                    )}
                    </div>
                   
                  </td>
                  <td>{recipe.price}</td>
                  <td>{recipe.description}</td>
                  <td>{recipe.category[0]?.name}</td>
                  {loginData?.userGroup == "SuperAdmin" ? (
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
                           onClick={() =>
                             handleUpdateShow(recipe.id, recipe.name)
                           }
                         >
                           <i className="fa fa-edit text-success"></i> Edit
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
                  ) : (
                    <td>
                      <i
                        class="fa fa-heart text-danger"
                        aria-hidden="true"
                        onClick={() => {
                          addFav(recipe.id);
                        }}
                      ></i>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>
        <div className="pagenation-section d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {arrayOfPages.map((pageNo) => (
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    onClick={() => getRecipe(pageNo, 3)}
                  >
                    {pageNo}
                  </a>
                </li>
              ))}

              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default RecipeList;
