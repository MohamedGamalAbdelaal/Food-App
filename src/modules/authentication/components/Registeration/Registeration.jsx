import React, { useContext } from "react";
import Logo from "../../../../assets/Images/Logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContext";
const Registeration = () => {
  let { saveLoginData } = useContext(AuthContext);
  let navigate = useNavigate();
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const regSubmit = async (data) => {
    try {
        let res=await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Register",data)
       console.log(res.data.data);
       localStorage.setItem("token")
       toast.success('cheack your email')
       navigate('/verify')
       saveLoginData()
    } catch (error) {
        toast.error(error.response.data.message)
        
    }
     console.log(data)
  };
  return (
    <>
      <div className="Auth-container">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-lg-4 col-md-6 bg-white rounded rounded-2 px-5 py-3 w-75">
              <div className="logo-container text-center">
                <img className="w-50" src={Logo} alt="" />
              </div>
              <div className="title my-4">
                <h3 className="h5 my-2">Register</h3>
                <p className="text-muted">Hungry? Let's get cooking</p>
              </div>
              <form onSubmit={handleSubmit(regSubmit)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group  w-100  mb-1">
                      <span className="input-group-text" id="basic-addon1">
                        <i class="fa-solid fa-user"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="UserName"
                        aria-label="UserName"
                        aria-describedby="basic-addon1"
                        {...register("userName", {
                          required: "userName is required",
                        })}
                      />
                    </div>
                    {errors.userName && (
                      <span className="text-danger">
                        {errors.userName.message}
                      </span>
                    )}
                    <div className="input-group w-100 my-5">
                      <span className="input-group-text" id="basic-addon1">
                        <i class="fa-solid fa-flag"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="country"
                        aria-label="country"
                        aria-describedby="basic-addon1"
                        {...register("country", {
                          required: "country is required",
                        })}
                      />
                    </div>
                    {errors.country && (
                      <span className="text-danger">
                        {errors.country.message}
                      </span>
                    )}
                    <div className="input-group w-100 my-5">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-key" aria-hidden="true"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        {...register("password", {
                          required: "password is required",
                        })}
                      />
                    </div>
                    {errors.password && (
                      <span className="text-danger">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group w-100 mb-1">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your E-Mail"
                        aria-label="Enter Your E-Mail"
                        aria-describedby="basic-addon1"
                        {...register("email", {
                          required: "email is required",
                          pattern: {
                            value: /[^@]+@[^@]+\.[a-zA-Z]{2,6}/,
                            message: "email is envalid",
                          },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                    <div className="input-group  w-100 my-5">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="phoneNumber"
                        aria-label="phoneNumber"
                        aria-describedby="basic-addon1"
                        {...register("phoneNumber", {
                          required: "phoneNumber is required",
                        })}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <span className="text-danger">
                        {errors.phoneNumber.message}
                      </span>
                    )}
                    <div className="input-group  w-100 my-5">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-key" aria-hidden="true"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="confirmPassword"
                        aria-label="confirmPassword"
                        aria-describedby="basic-addon1"
                        {...register("confirmPassword", {
                          required: "confirmPassword is required",
                        })}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <span className="text-danger">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                    <div className="links d-flex justify-content-end mt-3">
                      <Link
                        className="text-decoration-none text-success h6"
                        to="/login"
                      >
                        Login Now ?
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="btns w-100 d-flex justify-content-center align-items-center my-5">
                  <button  className="btn btn-success text-center w-50 ">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registeration;
