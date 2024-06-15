import React, { Suspense, useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes, useLocation } from "react-router-dom";

import { MainDataProvider } from "./GlobalData/MainPage";
import { CountProvider } from "./GlobalData/cartContext/cartData";
const ImageGallery =React.lazy(()=> import("./Card/Detailcard"))
const CarrousalSectionWrapper =React.lazy(()=> import("./MainPage"))
const MainPageProducts =React.lazy(()=> import("./MainPage/MainPageProducts"))
const Navbarr =React.lazy(()=> import("./Navbarr/navbar"))
const NotificationController =React.lazy(()=> import("./Notification"))
const MainProductSection =React.lazy(()=> import("./ProductSection/mainSection"))
const AboutUs =React.lazy(()=> import("./StaticPages/AboutUs"))
const CustomTailoring =React.lazy(()=> import("./StaticPages/CustomTailoring"))
const ExchangePolicy =React.lazy(()=> import("./StaticPages/ExchangePolicy"))
const PrivacyPolicy =React.lazy(()=> import("./StaticPages/PrivacyPolicy"))
const TermsCondition =React.lazy(()=> import("./StaticPages/TermsCondiiton"))
const WhatsAppPopUp =React.lazy(()=> import("./WhatsappComponent/whatsapp"))
const Footer =React.lazy(()=> import("./footer/footer"))
import Feedback from "./staticPages/feedback"
const SubTree =React.lazy(()=> import("./useContextt/routeescomp"))
import Faqs from "./staticPages/Faqs";
import SimpleBackdrop from "../Components/fullPageLoader";

const MainLayout = ({ children }) => {
  const topRef = useRef();
  const location = useLocation();

  useEffect(() => {
    topRef.current.scrollIntoView();
  }, [location.pathname]);
  return (
    <div className="layout-content" ref={topRef}>
      <Navbarr />
      {children}
      <NotificationController />
      <WhatsAppPopUp />
      <Footer />
    </div>
  );
};

const queryClient = new QueryClient();

function MainBuyer(props) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<SimpleBackdrop/>}>
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
                  path="/product-detail/:productId/:parentCollection/:id"
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
            </Suspense>
      </QueryClientProvider>

      <WhatsAppPopUp />
    </>
  );
}

export default MainBuyer;
