import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import "./index.css";
import MainPageDataContext from "../../GlobalData/MainPage";
import ProductCard from "../../ProductSection/brandCards/brandCards";
import SimpleBackdrop from "../../../Components/fullPageLoader";

export default function MainPageProducts() {
  const [showSaleButton, setShowSalesButton] = useState(false);
  const [showFProductButton, setShowFProductButton] = useState(false);
  const navigate = useNavigate();
  const {
    mainPageProducts: { data, isLoading, isError },
    _isLoading
  } = useContext(MainPageDataContext);

  useEffect(() => {
    if (data) {
      if (data["subBrandDetails"][0]["productData"].length === 4)
        setShowSalesButton(true);
      if (data["subBrandDetails"][1]["productData"].length === 6)
        setShowFProductButton(true);
    }
  }, [data]);

  if (_isLoading) {
    return <SimpleBackdrop/>;
  }

  return (
    <>
      {data ? (
        <div>
          <div className="sub-brand-section">
            <p style={{ textAlign: "center" }}> FEATURED PRODUCTS </p>
            <div className="grid-container">
              {data["subBrandDetails"][0]["productData"].map((item, index) => {
                return (
                  <ProductCard
                    item={item}
                    key={index}
                    className={"change-height"}
                    name={item.subBrandName}
                    id={2}
                    // parentCollection={{ name: item.subBrandName, id: 2 }}
                  />
                );
              })}
            </div>
            {showSaleButton && (
              <div className="related-product-button button-padding">
                <button
                  onClick={() => {
                    navigate(`/product-section?name=${data["subBrandDetails"][0]["subBrandName"]}&id=${2}`);
                  }}
                >
                  View All
                </button>
              </div>
            )}
          </div>
         {data["subBrandDetails"][1]?.productData &&  <div className="sub-brand-section">
            <p style={{ textAlign: "center" }}>
              {" "}
              {(data["subBrandDetails"][1]["subBrandName"]).toUpperCase()}
            </p>
            <div className="grid-container">
              {data["subBrandDetails"][1]["productData"].map((item, index) => {
                return (
                  <ProductCard
                    item={item}
                    key={index}
                    id={2}
                    name={item.subBrandName}
                    className={"change-height"}
                    // parentCollection={{ name: item.subBrandName, id: 2 }}
                  />
                );
              })}
            </div>
            {showFProductButton && (
              <div className="related-product-button button-padding">
                <button
                  onClick={() => {
                    navigate(`/product-section?name=${data["subBrandDetails"][1]["subBrandName"]}&id=${2}`);
                  }}
                >
                  View All
                </button>
              </div>
            )}
          </div>}
        </div>
      ) : null}
    </>
  );
}
