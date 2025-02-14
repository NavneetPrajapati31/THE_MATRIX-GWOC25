import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProductListing from "./pages/ProductListing";

import "./App.css";
import ProductDetails from "./pages/ProductDetails";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout, setUser } from "./redux/state";
import AboutUs from "./pages/AboutUs";
import ContactFormModal from "./components/contactForm";
import Wishlist from "./pages/Wishlist";
import BuyNow from "./pages/BuyNow";
import OrdersPage from "./components/OrdersPage";
import BlogPage from "./pages/BlogPage";
import BlogPostDetail from "./components/BlogPostDetail";

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          const response = await fetch("http://localhost:3001/auth/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (response.ok) {
            dispatch(setUser(data.user));
          } else {
            dispatch(logout());
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          dispatch(logout());
        }
      }
    };
    fetchUser();
  }, [token, dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product-listing" element={<ProductListing />} />
          <Route
            path="/product-details/:productId"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/buy-now" element={<BuyNow />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactFormModal />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogdetails" element={<BlogPostDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
