import React, { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes, useLocation } from "react-router-dom";

const LazyMainProductSection = React.lazy(() =>
  import("./ProductSection/mainSection")
);
import ImageGallery from "./Card/Detailcard";
import { MainDataProvider } from "./GlobalData/MainPage";
import { CountProvider } from "./GlobalData/cartContext/cartData";
import CarrousalSectionWrapper from "./MainPage";
import MainPageProducts from "./MainPage/MainPageProducts";
import Navbarr from "./Navbarr/navbar";
import NotificationController from "./Notification";
import MainProductSection from "./ProductSection/mainSection";
import AboutUs from "./StaticPages/AboutUs";
import CustomTailoring from "./StaticPages/CustomTailoring";
import ExchangePolicy from "./StaticPages/ExchangePolicy";
import Faqs from "./staticPages/Faqs";
import PrivacyPolicy from "./StaticPages/PrivacyPolicy";
import TermsCondition from "./StaticPages/TermsCondiiton";
import WhatsAppPopUp from "./WhatsappComponent/whatsapp";
import Footer from "./footer/footer";
import Feedback from "./staticPages/feedback";
import SubTree from "./useContextt/routeescomp";

const MainLayout = ({ children }) => {
  const topRef=useRef();

  const location= useLocation();
  // const currentPageKey= location.pathname.split("/")[1];
  useEffect(() => {
  //   // Scroll the layout-content element to the top when the location changes
  //   const element = document.querySelector(".layout-content")[0];
  //   if (element) {
  //     element.scrollTop = 0;
  //   }
  //   window.scrollTo(0, 0);
  topRef.current.scrollIntoView();

  }, [location.pathname]);
  return(
  <div className="layout-content" ref={topRef}>
    <Navbarr />
      {children}
    <NotificationController />
    <WhatsAppPopUp />
    <Footer />
  </div>
)};



const queryClient = new QueryClient();

function MainBuyer(props) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <Suspense fallback={<SimpleBackdrop/>}> */}
        <div>
          <CountProvider>
            <MainDataProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    <MainLayout>
                      <CarrousalSectionWrapper />
                    </MainLayout>
                  }
                />
                <Route
                  path="/product-section"
                  element={
                    <MainLayout>
                      <MainProductSection />
                    </MainLayout>
                  }
                />
                <Route
                  path="/product-detail"
                  element={
                    <MainLayout>
                      <ImageGallery />
                    </MainLayout>
                  }
                />
                <Route
                  path="/terms-condition"
                  element={
                    <MainLayout>
                      <TermsCondition />
                    </MainLayout>
                  }
                />
                <Route
                  path="/shipping-policy"
                  element={
                    <MainLayout>
                      <PrivacyPolicy />
                    </MainLayout>
                  }
                />
                <Route
                  path="/custom-tailoring"
                  element={
                    <MainLayout>
                      <CustomTailoring />
                    </MainLayout>
                  }
                />
                <Route
                  path="/about-us"
                  element={
                    <MainLayout>
                      <AboutUs />
                    </MainLayout>
                  }
                />
                <Route
                  path="/faqs"
                  element={
                    <MainLayout>
                      <Faqs />
                    </MainLayout>
                  }
                />
                <Route path="/context/*" element={<SubTree />}></Route>
                <Route
                  path="/exchange-policy"
                  element={
                    <MainLayout>
                      <ExchangePolicy />
                    </MainLayout>
                  }
                />
                <Route
                  path="/privacy-policy"
                  element={
                    <MainLayout>
                      <PrivacyPolicy />
                    </MainLayout>
                  }
                />
                <Route
                  path="/main-products"
                  element={
                    <MainLayout>
                      <MainPageProducts />
                    </MainLayout>
                  }
                />
                <Route
                  path="/feed-form"
                  element={
                    <MainLayout>
                      <Feedback />
                    </MainLayout>
                  }
                ></Route>
              </Routes>
            </MainDataProvider>
          </CountProvider>
          <NotificationController />
        </div>
      </QueryClientProvider>
      <WhatsAppPopUp />
    </>
  );
}

export default MainBuyer;
