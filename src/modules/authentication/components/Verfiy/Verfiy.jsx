import Logo from "../../../../assets/Images/Logo1.png";
import { Link ,useNavigate} from "react-router-dom";
import{ useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-toastify';

const Verfiy = () => {
   const navigate=useNavigate()
    const{register,formState:{errors},handleSubmit}=useForm()
    const verfiySubmit=async(data)=>{
      try {
        let response=await axios.put('https://upskilling-egypt.com:3006/api/v1/Users/verify',data)
        toast.success('Verfiy Successfully')
        navigate('/login')
        navi
      } catch (error) {
        toast.error(error.data.message)
      }
    }
    return <>
   <div className="Auth-container">
        <div className="container-fluid bg-overlay">
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="col-lg-4 col-md-6 bg-white rounded rounded-2 px-5 py-3 w-50">
                    <div className="logo-container text-center">
                        <img className="w-75" src={Logo} alt="" />
                    </div>
                    <div className="title my-4">
                    <h3 className="h3 my-2"> Verfiy Account</h3>
                    <p className="text-muted">Please Enter Your Otp  or Check Your Inbox</p>
                    </div>
                    <form onSubmit={handleSubmit(verfiySubmit)}>
                    <div className="input-group mb-1 ">
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
                          type="text" className="form-control" placeholder="OTP" aria-label="code" aria-describedby="basic-addon1"
                          {...register("code",{required:"code is required"})}
                          />
                    </div>
                    {errors.code && <span className="text-danger">{errors.code.message}</span>}
                        <button className="bg-success text-white w-100 form-control my-4 p-2"> Submit</button>
                    </form>
                </div>
                
            </div>
        </div>
    </div>
    </>
}

export default Verfiy;
