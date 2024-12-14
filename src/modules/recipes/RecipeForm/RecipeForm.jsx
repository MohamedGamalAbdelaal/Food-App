import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, Link, useNavigate } from 'react-router-dom';
const RecipeForm = () => {
    const params= useParams()
    let {register,formState:{errors},handleSubmit}=useForm()
    const [categoryList, setCategoryList] = useState([])
    const [tagsList, setTagsList] = useState([])
    const navigate=useNavigate()
    const onSubmit=async(data) => {
        try {
            const response=await axios.post('https://upskilling-egypt.com:3006/api/v1/Recipe/',data,{
                headers:{ Authorization: localStorage.getItem('token')}
              })
              navigate('/dashboard/recipeList')
            console.log(response);
            
        } catch (error) {
            console.log(error);
            
        }
       
        
          
    }
    const getTags=async()=>{
        try {
            let response=await axios.get('https://upskilling-egypt.com:3006/api/v1/tag/',{
                headers:{ Authorization: localStorage.getItem('token')}
              })
              setTagsList(response.data)
              console.log(response.data);
              
              
        } catch (error) {
            console.log(error);
            
        }
    }
    const getCategory=async()=>{
        try {
            let response=await axios.get('https://upskilling-egypt.com:3006/api/v1/Category/',{
                headers:{ Authorization: localStorage.getItem('token')}
              })
              setCategoryList(response.data.data)
              console.log("5",response.data);
              
              
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() => {
        getTags()
        getCategory()
    }, []);
    return <>
     <div className="header-section d-flex justify-content-between align-items-center m-4 p-4 rounded-2 ">
        <div className="header-content ">
            <h3>Fill the <span className='text-success'> Recipes</span> !</h3>
            <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
        </div>
        <Link to={'recipes'} className=''><button className='btn btn-success px-5'>All Recipes <i className="fa fa-arrow-right" aria-hidden="true"></i></button></Link>
     </div>
     <form onSubmit={handleSubmit(onSubmit)} className='rceipe-form m-4'>
     <div className="input-group mb-1">
               <input 
                  type="text" className="form-control" placeholder="Enter Recipe" aria-label="Enter Recipe" aria-describedby="basic-addon1"
                  {...register("name",
                   {required:"name is required"}
                          )}
                          />
      </div>
     {errors.name && <span className="text-danger">{errors.name.message}</span>}
      <div>
        <select
        {...register("tagId",
            // {required:"tag is required"}
                   )}
        className='input-group'>
            <option value="Tag">Tag</option>
            {tagsList?.map((tag,index)=>
            <option key={index} value={tag?.id}>{tag?.name}</option>
            )}
        </select>
      </div>
      {errors.tagId && <span className="text-danger">{errors.tagId?.message}</span>}
     <div className="input-group mb-1">
               <input 
                  type="text" className="form-control" placeholder="Price" aria-label="Price" aria-describedby="basic-addon1"
                  {...register("price",
                   {required:"price is required"}
                          )}
                          />
      </div>
     {errors.price && <span className="text-danger">{errors.price?.message}</span>}
     
     <div>
        <select {...register("categoriesIds",
                //    {required:"Category is required"}
                          )}        
        className='input-group'>
            <option value="Category">Category</option>
            {categoryList?.map((cat,index)=>
            <option key={index} value={cat?.id}>{cat?.name}</option>
            )}
            
        </select>
      </div>
      {errors.categoriesIds && <span className="text-danger">{errors.categoriesIds?.message}</span>}

      <div className="input-group mb-1">
               <textarea 
                   className="form-control" placeholder="description" aria-label="descripion" aria-describedby="basic-addon1"
                  {...register("description",
                   {required:"description is required"}
                          )}
                          />
      </div>
     {errors.descripion && <span className="text-danger">{errors.descripion?.message}</span>}

     <div className="input-group mb-1">
               <input type='file'
                   className="form-control"  aria-label="image" aria-describedby="basic-addon1"
                  {...register("recipeImage",
                          )}
                          />
      </div>

     <div className="buttons d-flex justify-content-center align-items-center mt-4">
        <button className='btn btn-outline-success px-5 me-5'>Cancel</button>
        <button className='btn btn-success px-3 px-5'>Save</button>
     </div>
     </form>
    
    </>
}

export default RecipeForm;
