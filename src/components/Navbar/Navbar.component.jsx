import React, { useContext, useState } from "react";
import { Container } from "../../constants/container";
import { useTheme } from "styled-components";
import {
  NavBarContainer,
  NavBarContainerWrap,
  NavbarIconsContainer,
  NavItemsContainer,
} from "./Navbar.style";
import secondaryLogo from "../../assets/logos/logo-secondary.svg";
import primaryLogo from "../../assets/logos/logo-primary.svg";
import Logo from "../../assets/logos/Tatilogo.png"
import SearchBar from "../SearchBar/SearchBar.component";
import ShopCategories from "../ShopCategories/ShopCategories.component";
import CartSidebar from "../CartSidebar/CartSidebar.component";
import { useHistory, useLocation } from "react-router";
import {
  faBars,
  faSearch,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menubar from "../Menubar/Menubar.component";
import useWindowDimensions from "../../utils/windowDimentions";
// import { UserContext } from "../../App";
import useAuth from "../../hooks/useAuth";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const { user, products } = useContext(UserContext);
  const { user, products, logOut } = useAuth();
  const [loggedInUser, setLoggedInUser] = user;
  const [cartProducts, setCartProducts] = products;
  const history = useHistory();
  const { pathname } = useLocation();
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [shopCategoriesOpen, setShopCategoriesOpen] = useState(false);
  const [cartSidebarOpen, setCartSidebarState] = useState(false);
  const [mobileMenubar, setMobileMenubar] = useState(false);
  const { height, width } = useWindowDimensions();
  const theme = useTheme();

  return pathname === "/checkout" ? null : (
    <>
      <NavBarContainerWrap>
        <Container>
          <NavBarContainer>
            {/*---------- Mobile Hamburger Menu---------- */}

            <FontAwesomeIcon
              className="hamburger__icon"
              icon={faBars}
              size="2x"
              onClick={() => setMobileMenubar(true)}
            />

            {/*---------- Mobile Hamburger Menu---------- */}
            <img
              src={
                Logo
                // theme.colors.primary === "#231f20" ? secondaryLogo : primaryLogo
              }
              alt="tatiartant"
              className="nav__logo"
              onClick={() => history.push("/")}
            />

            <NavbarIconsContainer>
              {/* <img
                src={searchIcon}
                alt=""
                onClick={() => setSearchBarOpen(true)}
              />

              <img
                src={shoppingIcon}
                alt=""
                onClick={() => setCartSidebarState(true)}
              />

              <img
                src={personIcon}
                onClick={() => history.push("/account")}
                alt=""
              /> */}
              <FontAwesomeIcon
                icon={faSearch}
                onClick={() => setSearchBarOpen(true)}
              />
              <span>
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  onClick={() => setCartSidebarState(true)}
                />
                {cartProducts.length ? (
                  <div className="">{cartProducts.length} </div>
                ) : null}
              </span>
              {/* <Button variant="primary">
                <span> <FontAwesomeIcon
                icon={faUser}
                onClick={() => history.push("/account")}
              /></span>
              </Button> */}
              {loggedInUser?.email ?
                <Link >
                   <small
                  onClick={() => history.push("/account")}
                >{loggedInUser.displayName} </small>
                </Link>
                :
                <Link to="/sign-in">
                  <Button variant="outline-secondary">Login</Button>
                </Link>
            
            }
            </NavbarIconsContainer>

            <NavItemsContainer>
              <div>
                <p
                  onMouseOver={() => setShopCategoriesOpen(false)}
                  onClick={() => history.push("/")}
                >
                  Home
                </p>
              </div>

              <div>
                <p
                  onMouseOver={() => {
                    setSearchBarOpen(false);
                    setShopCategoriesOpen(true);
                  }}
                  onClick={() => history.push("/products/all-products")}
                >
                  Shop
                </p>
              </div>

              <div>
                <p
                  onMouseOver={() => setShopCategoriesOpen(false)}
                  onClick={() => history.push("/about-us")}
                >
                  About Us
                </p>
              </div>

              <div>
                <p
                  onMouseOver={() => setShopCategoriesOpen(false)}
                  onClick={() => history.push("/contact-us")}
                >
                  Contact Us
                </p>
              </div>
            </NavItemsContainer>
          </NavBarContainer>
        </Container>
      </NavBarContainerWrap>

      {/* ====================={Search Bar, Sidebar}========================= */}

      <SearchBar searchBarState={[searchBarOpen, setSearchBarOpen]} />

      {width > 768 && (
        <ShopCategories
          shopCategoriesState={[shopCategoriesOpen, setShopCategoriesOpen]}
        />
      )}

      <CartSidebar sidebarState={[cartSidebarOpen, setCartSidebarState]} />
      {/* ====================={Search Bar, Sidebar}========================= */}

      {width <= 768 && (
        <Menubar mobileMenubarState={[mobileMenubar, setMobileMenubar]} />
      )}
    </>
  );
};

export default Navbar;
