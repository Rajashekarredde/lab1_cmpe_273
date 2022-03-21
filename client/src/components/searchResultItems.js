import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";
import { Col, Card, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  productsList,
  removeProductsState,
  updateProducts,
} from "../features/productsSlice";
import { selectUser } from "../features/userSlice";
import cookie from "react-cookies";
import { Link, Navigate } from "react-router-dom";
import { productOverview } from "../features/cartSlice";
import ProductOverView from "./ProductOverView";
import styled from "styled-components";

function searchResultItems() {
  const products = useSelector(getProducts);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [filterByValue, setFilterByValue] = useState(false);
  const [checked, setChecked] = useState(true);
  const [product, setProduct] = useState([]);
  const [productDup, setProductDup] = useState([]);

  useEffect(() => {
    setProduct(products);
    setProductDup(products);
  }, []);

  let filteredProducts = null;
  const filterByPrice = () => {
    if (minPrice !== 0 && maxPrice !== 100) {
      // setFilterByValue(true);
      filteredProducts = product.filter((prod) => {
        return prod.itemPrice > minPrice && prod.itemPrice < maxPrice;
      });
      setProduct(filteredProducts);
    } else {
      setProduct(products);
    }
  };

  if (sortBy === "itemPrice") {
    product.sort(function(a, b) {
      return a.itemPrice - b.itemPrice;
    });
  } else if (sortBy === "itemCount") {
    product.sort(function(a, b) {
      return a.itemCount - b.itemCount;
    });
  }

  const handleStockCheckbox = () => {
    console.log(checked);
    if (checked) {
      filteredProducts = product.filter((prod) => {
        return prod.itemCount > 0;
      });

      setProduct(filteredProducts);
    } else {
      console.log("In out of stock false " + productDup);
      setProduct(productDup);
    }
  };

  const handleOpenImage = (pro) => {
    // console.log(pro.itemId);
    // console.log(pro.itemImage);
    dispatch(productOverview(pro));
    // console.log(pro.itemCount);
    // setProductOverview(true);
    window.location.pathname = "/productOverview";
  };

  let searchPage = null;
  if (user && cookie.load("user") && product !== null) {
    searchPage = product.map((pro) => {
      return (
        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src={require("../Images/" + pro.itemImage)}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{pro.itemName}</h5>
              <p>Price: ${pro.itemPrice}</p>
              
              <ProductContainer>
              <button  
              className="button button3"
              onClick={() => {
              handleOpenImage(pro);
            }} >View Overview</button>
             </ProductContainer>
            </div>

          </div>
        </div>
      );
    });
  } else {
    // dispatch(removeProductsState());
    searchPage = (
      <div>
        <h4> No Items</h4>
      </div>
    );
  }

  let redirectVar = null;
  if (!cookie.load("user")) {
    redirectVar = <Navigate to="/home" />;
  }
  return (
    <>
      {redirectVar}
      <Navbar />
      <Hoverbar />
      <hr></hr>
<span style={{marginRight:"20px"}}>
      <div className="col-md-9">
            <div className="row">{searchPage}</div>
          </div>
          </span>

    </>
  );
}

export default searchResultItems;
const ProductContainer = styled.footer`
  .button {
    background-color: orange; /* Green */
    border: none;
    color: white;
    padding: 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
  .button3 {
    border-radius: 8px;
  }
`;