import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFinalCart } from "../features/cartItemsSlice";
import { selectUser } from "../features/userSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import Navbar from "./Navbar";

function Purchases() {
  const user = useSelector(selectUser);
  //   const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  
  let products = JSON.parse(localStorage.getItem("purchase"));
  
  let renderFavourites = products.map((pro) => {
    return (
      <span style={{marginLeft:"220px"}}>

      <div className="col-md-2 mb-2">
        <div className="card">
          <img
            src={require("../Images/" + pro.itemImage)}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{pro.itemName}</h5>
            <p>Price: ${pro.itemPrice}</p>
          </div>
        </div>
      </div>
      </span>
    );
  });

  return(
    <>
      <div>
        <Navbar/>
        <hr></hr>
        <h1> Your Purchased  items</h1>
        { renderFavourites }
      </div>   
    </>
  );
}

export default Purchases;
