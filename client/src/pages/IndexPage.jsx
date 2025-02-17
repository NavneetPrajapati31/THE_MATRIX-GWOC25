import Carousel from "../components/Carousel";
import Navbar from "../includes/Navbar";
import "../styles/navbar.css";

import VideoCarousel from "../components/VideoCaraousel";
import NewProducts from "../components/NewProducts";
import Footer from "../includes/Footer";
import FeaturedCollections from "../components/FeaturedCollections";
import Bestseller from "../components/Bestseller";
import Wedding from "../components/Wedding";
import InstagramBanner from "../components/InstagramBanner";
import BridalWorld from "../components/BridalWorld";
import CustomerStories from "../components/CustomerStories";
import Spinner from "../components/Spinner";

const IndexPage = () => {
  return (
    <>
      {/* <Spinner /> */}
      <Navbar />
      <Carousel />
      <VideoCarousel />
      <NewProducts type="latest" />
      <FeaturedCollections />
      <Wedding />
      <Bestseller />
      <BridalWorld />
      <InstagramBanner />
      <CustomerStories />
      <Footer />
    </>
  );
};

export default IndexPage;
