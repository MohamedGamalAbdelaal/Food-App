import Logo from "../../../../assets/Images/Logo1.png";
import { Link ,useNavigate} from "react-router-dom";
import{ useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { axiosInstance } from "../../../../Services/api";
import { baseURL, USERS_URLS } from "../../../../Services/api/apiURL";
import axios from "axios";
import Header from './../../../shared/component/Header/Header';

const ChangePass = () => {
    let navigate=useNavigate()
    let {register,formState:{errors},handleSubmit}=useForm()
    const onSubmit=async (data) => {
        try {
            let res=await axiosInstance.put(USERS_URLS.CHANGE_PASSWORD,data)
           console.log(res);
           toast.success('change successfuly ')
           navigate('/login')

        } catch (error) {
            console.log(error.res);
            
            toast.error(error.message)
           
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
                    <h3 className="h3 my-2"> Change your Password</h3>
                    <p className="text-muted">Please Enter Your Details Below</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="input-group mt-3">
                       <span className="input-group-text" id="basic-addon1"><i className="fa fa-key" aria-hidden="true"></i></span>
                          <input 
                          type="password" className="form-control" placeholder="old Password" aria-label="old Password" aria-describedby="basic-addon1"
                          {...register("oldPassword",{required:"Old password is required"})}
                          />
                    </div>
                    {errors.oldPassword && <span className="text-danger">{errors.oldPassword.message}</span>}
                    
                    <div className="input-group mt-3">
                       <span className="input-group-text" id="basic-addon1"><i className="fa fa-key" aria-hidden="true"></i></span>
                          <input 
                          type="password" className="form-control" placeholder="New Password" aria-label="new Password" aria-describedby="basic-addon1"
                          {...register("newPassword",{required:"new Password is required"})}
                          />
                    </div>
                    {errors.newPassword && <span className="text-danger">{errors.newPassword.message}</span>}
                    <div className="input-group mt-3">
                       <span className="input-group-text" id="basic-addon1"><i className="fa fa-key" aria-hidden="true"></i></span>
                          <input 
                          type="password" className="form-control" placeholder="Confirm Password" aria-label="confirm New Password" aria-describedby="basic-addon1"
                          {...register("confirmPassword",{required:"confirm New Password is required"})}
                          />
                    </div>
                    {errors.confirmNewPassword && <span className="text-danger">{errors.confirmNewPassword.message}</span>}
                    

                    <button className="bg-success text-white w-100 form-control my-4 p-2"> Change Password</button>
                    </form>
                </div>
                
            </div>
        </div>
    </div>
    </>
}

export default ChangePass;
