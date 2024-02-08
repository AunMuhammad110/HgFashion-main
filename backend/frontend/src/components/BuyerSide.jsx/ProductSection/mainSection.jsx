import { useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";

import "./index.css";
import ProductCard from "./brandCards/brandCards";
import axiosClient from "../../../apisSetup/axiosClient";
import { useRequestProcessor } from "../../../apisSetup/requestProcessor";
import SimpleBackdrop from "../../Components/fullPageLoader";

export default function MainProductSection() {
  const location = useLocation();
  const [tag, setTag] = useState("Title");
  const { mutate } = useRequestProcessor();
  const [productData, setProductData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [offsetCount, setOffsetCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const params = new URLSearchParams(location.search);
  const name = params.get('name');
  const id = params.get('id');

  useEffect(() => {
    setTag(name);
    setProductData([]);
    setOffsetCount(1);
    console.log("The location", location.state)
  }, [name,id]);

  const mutation = mutate("unique", async () => {
    try {
      const response = await axiosClient.post("/buyerSide/GetProducts", {
        locationData: {name: name, id:parseInt(id)},
        offsetCount: offsetCount,
      });
      
      console.log("The response is ", response.data);
      // Check if there are existing products
      if (productData.length > 0) {
        // Check if the first product of the response matches the last product in productData
        if (
          productData[productData.length - 1].brandName === response.data[0].brandName &&
          productData[productData.length - 1].subBrandName === response.data[0].subBrandName
        ) {
          // Append the new products to the existing productData
          setProductData([...productData, ...response.data.slice(1)]);
        } 
        else{
          setProductData(response.data);
        }
      } else {
        // If there are no existing products, set the response data as productData
        setProductData(response.data);
      }
  
      // Update showMore based on the length of response data
      setShowMore(response.data.length === 25);
    } catch (error) {
      console.error("Error:", error);
    } 
  });
  

  useEffect(() => {
    mutation.mutate();
  }, [name, offsetCount]);
  useEffect(() => {
    if (productData.length % 25 !== 0) {
      setShowMore(false);
    }
  }, [productData]);
  useEffect(() => {
    setProductData([]);
  }, [name]);
  if(mutation.isLoading){
    return <SimpleBackdrop/>
  }

  else if (productData.length === 0) {
    return (
      <div className="product-main-container">
         <h1>{tag.toUpperCase()}</h1>
        <div className="display-flex custom-no-products">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/hiragfashion-d1d40.appspot.com/o/files%2Fno-products-found.png?alt=media&token=4e0a8dbf-c25b-4611-b4f6-3188a61528b1"
            }
            alt="No Products Image"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="product-main-container">
      <h1>{tag.toUpperCase()}</h1>
      <div className="sub-product-main">
        <div className="main-card-container">
          {productData?.map((item, index) => {
            return (
              <ProductCard
                key={index}
                item={item}
                name={name}
                id={id}
              />
            );
          })}
        </div>
      </div>
      {showMore && (
        <div className="related-product-button custom-view">
          <button className="" onClick={() => setOffsetCount(offsetCount + 1)}>
            View More Products{" "}
          </button>
        </div>
      )}
    </div>
  );
}
