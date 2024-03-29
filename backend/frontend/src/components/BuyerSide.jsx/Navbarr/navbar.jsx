import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleBackdrop from "../../Components/fullPageLoader";
import MainPageDataContext from "../GlobalData/MainPage";
import { useCount } from "../GlobalData/cartContext/cartData";
import logo from "./hg2r.png";
import NavBar from "./nav";
import "./navbar.css";

const Navbarr = React.memo(() => {
  const navigate = useNavigate();
  const {state}=useCount();
  const { data, isLoading, isError,_isLoading} = useContext(MainPageDataContext);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [smallImagesVisible, setSmallImagesVisible] = useState(true);

  if (_isLoading) {
    return <SimpleBackdrop/>;
  }
  if (isError) {
    return <p></p>;
  }
 
  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };
  function Navigator(name, id, e) {
    e.preventDefault();
    // navigate("/product-section", { state: { name: name, id: id } });
    navigate(`/product-section?name=${name}&id=${id}`);

  }
  


  return (
    <>
      {smallImagesVisible && <NavBar />}

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex" >
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon custom"></span>
          </button>

          {/* Logo */}
          <div className="d-flex">
            <a className="navbar-brand padd" href="#">
              <img
                className="logoS "
                src={logo}
                alt="logo"
                onClick={() => {
                  navigate("/");
                }}
              />
            </a>
          </div>
          <div className="my-2 mx-2 my-lg-0 seq-ord">
            <a href="#" className="p-2">
              <i
                className="fas fa-search"
                id="bag-Icon"
                onClick={toggleSearch}
              ></i>
              {isSearchOpen && (
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search..."
                  onBlur={() => setSearchOpen(false)}
                />
              )}
            </a>
            <a href="#" className="p-2">
              <i className="fa fa-heart-o" id="bag-Icon" aria-hidden="true"></i>
            </a>

            <a href="/context/chkout" className="p-2 parent-cart-alert">
              {/* <Link path="/context/chkout"> */}
              <i
                className="fas fa-shopping-cart"
                id="bag-Icon"
                aria-hidden="true"
                // onClick={handleCart}
              ></i>
              {state.count > 0 && (<span className="cart-alert">{state.count}</span>)}
              {/* </Link> */}
            </a>
          </div>

          {/* All the tags */}
          <div
            className="collapse navbar-collapse seq-ord-2"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto pl-4">
              <li className="nav-item dropdown pl-md-2">
                <a
                  className="nav-link active dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  NEW IN
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {data[1][2]["New Collection"].map((item, index) => (
                    <a
                      onClick={() => Navigator(item.subBrandName, 2, event)}
                      className="dropdown-item"
                      key={index}
                      href="#"
                      data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                    >
                      {item.subBrandName}
                    </a>
                  ))}
                </div>
              </li>
              <li className="nav-item dropdown pl-md-2">
                <a
                  className="nav-link active dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  SUMMER
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {data[1][3]["Summer Collection"].map((item, index) => (
                    <a
                      onClick={() => Navigator(item.subBrandName, 2, event)}
                      className="dropdown-item"
                      key={index}
                      data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                      href="#"
                    >
                      {item.subBrandName}
                    </a>
                  ))}
                </div>
              </li>
              <li className="nav-item dropdown pl-md-2">
                <a
                  className="nav-link active dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  WINTER
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {data[1][4]["Winter Collection"].map((item, index) => (
                    <a
                      onClick={() => Navigator(item.subBrandName, 2, event)}
                      className="dropdown-item"
                      data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                      key={index}
                      href="#"
                    >
                      {item.subBrandName}
                    </a>
                  ))}
                </div>
              </li>

              {/* shops by brands */}
              <li className="nav-item dropdown pl-md-2">
                <a
                  className="nav-link active dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  SHOP BY BRANDS
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {data[0].map((item, index) => (
                    <a
                      onClick={() => Navigator(item.brandName, 1, event)}
                      className="dropdown-item"
                      key={index}
                      href="#"
                      data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                    >
                      {item.brandName}
                    </a>
                  ))}
                </div>
              </li>

              <li className="nav-item dropdown pl-md-2">
                <a
                  className="nav-link active dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  WEDDING COLLECTION
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {data[1][0]["Wedding Collection"].map((item, index) => (
                    <a
                      onClick={() => Navigator(item.subBrandName, 2, event)}
                      className="dropdown-item"
                      key={index}
                      href="#"
                      data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                    >
                      {item.subBrandName}
                    </a>
                  ))}
                </div>
              </li>
              <li className="nav-item dropdown pl-md-2">
                <a
                  className="nav-link active dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  SALE
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {data[1][1]["Sale"].map((item, index) => (
                    <a
                      onClick={() => Navigator(item.subBrandName, 2, event)}
                      className="dropdown-item"
                      key={index}
                      data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                      href="#"
                    >
                      {item.subBrandName}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {!smallImagesVisible && <NavBar />}
    </>
    //
    // </>
  );
});

export default Navbarr;
