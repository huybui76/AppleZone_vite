import Homepage from "../pages/HomePage/Homepage";

import ProductsPage from "../pages/ProductsPage/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
// import SignInPage from "../pages/SignInPage/SignInPage";
// import SignUpPage from "../pages/SignUpPage/SignUpPage";
import Cart from "../pages/Cart/Cart";
import Dashboard from "../pages/DashBoard/DashBoardPage";
import ProductTypePage from "../pages/ProductTypePage/ProductTypePage";
import OrderSuccessPage from "../pages/OrderSuccess/OrderSuccessPage";
import FindPage from "../pages/FindPage/FindPage";
export const routes = [
  {
    path: '/',
    page: Homepage,
    isNavbar: true,
    isFooter: true


  },
  {
    path: '/order-success',
    page: OrderSuccessPage,
    isNavbar: false,
    isFooter: false
  },

  {
    path: '/products/:id',
    page: ProductsPage,
    isNavbar: true,
    isFooter: true
  },
  // {
  //   path: '/SignIn',
  //   page: SignInPage,
  //   isNavbar: false,
  //   isFooter: true
  // },
  // {
  //   path: '/SignUp',
  //   page: SignUpPage,
  //   isNavbar: false,
  //   isFooter: true
  // },
  {
    path: '/dashboard',
    page: Dashboard,
    isNavbar: true,
    isFooter: false
  },
  {
    path: '/find/:searchValue',
    page: FindPage,
    isNavbar: true,
    isFooter: false
  },
  {
    path: '*',
    page: NotFoundPage
  },
  {
    path: '/cart',
    page: Cart,
    isNavbar: false,
    isFooter: false
  },
  {
    path: '/products-type/:product',
    page: ProductTypePage,
    isNavbar: true
  }
]
