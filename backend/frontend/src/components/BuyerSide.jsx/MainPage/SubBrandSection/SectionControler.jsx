import MainPageDataContext from "../../GlobalData/MainPage";
import { useContext } from "react";
import SubBrandSection from "./subbrandSection";
import React from "react";
import SimpleBackdrop from "../../../Components/fullPageLoader";
const SectionController =React.memo(()=>{
  const { data, isLoading, isError,_isLoading } = useContext(MainPageDataContext);
  if (_isLoading) {
    return <SimpleBackdrop/>;
    }

    const arrayShopByBrand=data[0].map((item)=>(
        {
            subBrandName:item.brandName,
            image:item.image
        }
    ))
    const objShopByBrand={
        "Shop By Brand":arrayShopByBrand
    }
  return (
    <>    
    <SubBrandSection data={objShopByBrand} key={200} id={1}/>    
      {data[1].map((item, index) => (
        <SubBrandSection data={item} key={index} id={2}/>
      ))}
    </>
  );
});

export default SectionController;