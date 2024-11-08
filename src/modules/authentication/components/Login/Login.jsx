import React from 'react';
import Logo from "../../../../assets/Images/Logo1.png";
import { Link ,useNavigate} from "react-router-dom";
import{ useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = () => {
    let navigate=useNavigate()
    let {register,formState:{errors},handleSubmit}=useForm()
    const onSubmit=async (data) => {
        try {
            let res=await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login",data)
           console.log(res);
           toast.success('loged in successfuly ')
           navigate('/dashboard')

        } catch (error) {
            toast.error(error.response.data.message)
            navigate('/register')
        }
          
    }
    return <>
    <div className="Auth-container">
        <div className="container-fluid bg-overlay">
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="col-lg-4 col-md-6 bg-white rounded rounded-2 px-5 py-3 ">
                    <div className="logo-container text-center">
                        <img className="w-75" src={Logo} alt="" />
                    </div>
                    <div className="title my-4">
                    <h3 className="h5 my-2">Log In</h3>
                    <p className="text-muted">Welcome Back! Please enter your details</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-1">
                       <span className="input-group-text" id="basic-addon1"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                          <input 
                          type="text" className="form-control" placeholder="Enter Your E-Mail" aria-label="Enter Your E-Mail" aria-describedby="basic-addon1"
                          {...register("email",
                            {required:"email is required",
                                pattern:{value:/[^@]+@[^@]+\.[a-zA-Z]{2,6}/,message:"email is envalid"}
                            }
                          )}
                          />
                    </div>
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                    <div className="input-group mt-3">
                       <span className="input-group-text" id="basic-addon1"><i className="fa fa-key" aria-hidden="true"></i></span>
                          <input 
                          type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"
                          {...register("password",{required:"password is required"})}
                          />
                    </div>
                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                    <div className="links d-flex justify-content-between mt-3">
                        <Link className="text-decoration-none text-muted" to="/register">Register Now ?</Link>
                        <Link className="text-decoration-none text-success" to="/forgetPass">Forget Password ?</Link>
                    </div>

                    <button className="bg-success text-white w-100 form-control my-4 p-2"> Login</button>
                    </form>
                </div>
                
            </div>
        </div>
    </div>
    </>
}

export default Login;
