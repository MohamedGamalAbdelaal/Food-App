import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './modules/authentication/components/Login/Login';
import AuthLayout from './modules/shared/component/AuthLayout/AuthLayout';
import Registeration from './modules/authentication/components/Registeration/Registeration';
import ForgetPass from './modules/authentication/components/ForgetPass/ForgetPass';
import ResetPass from './modules/authentication/components/ResetPass/ResetPass';
import ChangePass from './modules/authentication/components/ChangePass/ChangePass';
import Dashboard from './modules/dashboard/component/Dashboard/Dashboard';
import NotFound from './modules/shared/component/NotFound/NotFound';
import RecipeList from './modules/recipes/RecipeList/RecipeList';
import RecipeData from './modules/recipes/RecipeData/RecipeData';
import CategoriesList from './modules/categories/component/CategoriesList/CategoriesList';
import CategoryData from './modules/categories/component/CategoryData/CategoryData';
import UserList from './modules/user/component/UserList/UserList';
import MasterLayout from './modules/shared/component/MasterLayout/MasterLayout';

const App = () => {
  const routes=createBrowserRouter([
    {
      path:"",element:<AuthLayout/>,errorElement:<NotFound/>,children:[
        {index:true,element:<Login/>},
        {path:"login",element:<Login/> },
        {path:"register",element:<Registeration/> },
        {path:"forgetPass",element:<ForgetPass/> },
        {path:"resetPass",element:<ResetPass/> },
        {path:"changePass",element:<ChangePass/> },
      ]
    },
    {
      path:"dashboard",element:<MasterLayout/> ,errorElement:<NotFound/>,children:[
        {index:true,element:<Dashboard/>},
        {path:"recipeList",element:<RecipeList/> },
        {path:"recipeData",element:<RecipeData/> },
        {path:"categoriesList",element:<CategoriesList/> },
        {path:"categoryData",element:<CategoryData/> },
        {path:"users",element:<UserList/> },
      ]

    }
  ])
  return <RouterProvider router={routes}></RouterProvider>
}

export default App;
