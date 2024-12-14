import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../../shared/component/Header/Header";
import { toast } from "react-toastify";
import DeletConfirmation from "../../../shared/component/Delet-Confirmation/Delet-Confirmation";
import NoData from "../../../shared/component/NoData/NoData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";

const CategoriesList = () => {
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  ///////////////////////////////////////////////////
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [selectedId, setSelectedId] = useState(0);
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };
  //////////////////(Add))///////////////////////////////
  const [Addshow, setAddShow] = useState(false);
  const handleAddClose = () => setAddShow(false);
  const [selectedAddId, setSelectedAddId] = useState(0);
  const handleAddShow = (id) => {
    setSelectedAddId(id);
    setAddShow(true);
  };
  ///////////////////////////////////////////////////
  const [Updateshow, setUpdateShow] = useState(false);
  const handleUpdateClose = () => setUpdateShow(false);
  const [selectedUpdateId, setSelectedUpdateId] = useState(0);
  const [selectedUpdateName, setSelectedUpdateName] = useState("");

  const handleUpdateShow = (id, name) => {
    setSelectedUpdateId(id);
    setSelectedUpdateName(name);
    setUpdateShow(true);
  };
  ///////////////////////////////////////////////////
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
  /////////////////////////////////////////////////////
  const [categeroyList, setcategeroyList] = useState([]);
  const [arrayOfPages, setArrayOfPages] = useState([]);

  let getData = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=5&pageNumber=1",
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setcategeroyList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  ////////////////////////////////////////////////////////
  useEffect(() => {
    getData();
  }, []);
  ///////////////////////////////////////////////////////
  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/Category/`,
        data,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      toast.success("Add Successfuly");
      getData();
      handleAddClose();
      console.log(response.data.data);
    } catch (error) {
      toast.error(error.messa);
    }
  };
  ///////////////////////////////////////////////////////
  const onSubmitUpdate = async (data) => {
    try {
      let response = await axios.put(
        `https://upskilling-egypt.com:3006/api/v1/Category/${selectedUpdateId}`,
        data,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      toast.success("Update Successfuly");
      getData();
      handleUpdateClose();
      console.log(response.data.data);
    } catch (error) {
      toast.error(error.messa);
    }
  };
  const [nameValue, setNameValue] = useState("");
  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getData(1, 5, input.target.value);
  };
  return (
    <>
      <Header
        title1={"Categories"}
        title2={"item"}
        descreption={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <div className="categories-container p-4">
        <div className="category-add d-flex justify-content-between align-items-center">
          <div className="category-title">
            <h3>Categories Table Details</h3>
            <p className="text-muted">You can check all details</p>
          </div>
          <button className="btn btn-success px-5" onClick={handleAddShow}>
            Add New Category
          </button>
        </div>
        <></>
        <DeletConfirmation
          show={show}
          deletItem={"Category"}
          handleClose={handleClose}
          deleteFun={deleteFun}
        />
        <Modal show={Addshow} onHide={handleAddClose}>
          <Modal.Header closeButton>Add Item</Modal.Header>
          <Modal.Body className=" flex-column d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-1">
                <span className="input-group-text" id="basic-addon1"></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category Name"
                  aria-label="Category Name"
                  aria-describedby="basic-addon1"
                  {...register("name", { required: "name is required" })}
                />
              </div>
              {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
              )}

              <button className="bg-success text-white w-100 form-control my-4 p-2">
                {" "}
                Save
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
        {/* //////////////////////////////////////////////////////////////////////////////////////// */}
        <Modal show={Updateshow} onHide={handleUpdateClose}>
          <Modal.Header closeButton>Update Item</Modal.Header>
          <Modal.Body className=" flex-column d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmitUpdate)}>
              <div className="input-group mb-1">
                <span className="input-group-text" id="basic-addon1"></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder={selectedUpdateName}
                  aria-label="Category Name"
                  aria-describedby="basic-addon1"
                  {...register("name", { required: "email is required" })}
                />
              </div>
              {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
              )}

              <button className="bg-warning text-white w-100 form-control my-4 p-2">
                {" "}
                Update
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
        {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={getNameValue}
            />
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th
                className="d-flex justify-content-end align-items-center"
                scope="col"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {categeroyList.length > 0 ? (
              categeroyList.map((product, indx) => (
                <tr key={indx}>
                  <td>{product.name}</td>

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
                            handleUpdateShow(product.id, product.name)
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
                    onClick={() => getData(pageNo, 2)}
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

export default CategoriesList;
