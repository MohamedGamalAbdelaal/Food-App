import axios from "axios";
import Header from "./../shared/component/Header/Header";
import { useEffect, useState } from "react";
import NoData from "./../shared/component/NoData/NoData";
import Image from "../../assets/Images/3.png";
import { IMAGE_URL } from "../../Services/api/apiURL";
const Favourite = () => {
  const [favList, setFavList] = useState([]);
  const getFav = async () => {
    let response = await axios.get(
      "https://upskilling-egypt.com:3006/api/v1/userRecipe/",
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    setFavList(response.data.data);
    console.log(response.data.data);
  };
  useEffect(() => {
    getFav();
  }, []);

  return (
    <>
      <Header
        title1={"Favourite"}
        title2={"List"}
        descreption={"Save your favorite recipes for easy access."}
      />
      <div className="favourite-container p-4">
        <div className="row">
          {favList.length > 0 ? (favList.map((fav)=><div className="col-md-3">
              <div className="card-container p-2 ">
                <div class="card" className="w-100 border border-2 p-4 rounded-3">
                 {fav.recipe.imagePath?<img className="w-100" src={`${IMAGE_URL}/${fav.recipe.imagePath}`} alt="" />:<img className="w-100" src={Image} alt=""/>} 
                  <div className="card-body">
                    <h5 className="card-title">{fav.recipe.name}</h5>
                    <p className="card-text">
                     {fav.recipe.description
                     }
                    </p>
                    <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            </div>)
            
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </>
  );
};

export default Favourite;
