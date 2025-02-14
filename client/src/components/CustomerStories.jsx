import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/CustomerStories.css";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const reviews = [
  {
    name: "Sant Das",
    location: "Sydney, Australia",
    review:
      "Every detail wowed! At the wedding, it stole the show; friends are eyeing KASHVI's collection online after this buzz.",
  },
  {
    name: "Romika Nigam",
    location: "Mumbai, India",
    review:
      "KASHVI made my bridal journey a dream! Stunning bridal wear, impeccable service; felt extraordinary, like a princess.",
  },
  {
    name: "Arjun Mehta",
    location: "New Delhi, India",
    review:
      "The craftsmanship is just amazing. My wedding look was elevated with the perfect outfit from KASHVI.",
  },
  {
    name: "Meera Kapoor",
    location: "London, UK",
    review:
      "I felt like a queen in my bridal lehenga. The attention to detail is truly outstanding!",
  },
  {
    name: "Rajiv Sharma",
    location: "Toronto, Canada",
    review:
      "Best wedding collection ever! My suit was elegant, stylish, and perfectly tailored.",
  },
  {
    name: "Aisha Khan",
    location: "Dubai, UAE",
    review:
      "Absolutely stunning outfits! I received so many compliments on my wedding day.",
  },
];

const imageURL =
  "https://www.koskii.com/cdn/shop/files/koskii-purple-stonework-semicrepe-designer-saree-saus0034824_purple_1_1_1400x.jpg?v=1719829414";

const CustomerStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerSlide = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextReview = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + reviewsPerSlide) % reviews.length
    );
  };

  const prevReview = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - reviewsPerSlide + reviews.length) % reviews.length
    );
  };

  return (
    <div className="customer-stories mb-5">
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "400",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        Customer Stories
      </h2>
      <div className="carousel-container">
        <button className="stories-prev-btn" onClick={prevReview}>
          <ArrowBackIosNewOutlinedIcon />
        </button>

        <div className="slider-wrapper">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              className="slider"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {reviews
                .slice(currentIndex, currentIndex + reviewsPerSlide)
                .map((review, index) => (
                  <div key={index} className="review-box">
                    <img
                      src={imageURL}
                      alt="Customer"
                      className="review-image"
                    />
                    <div className="review-content">
                      <p className="review-text">"{review.review}"</p>
                      <p style={{ marginBottom: "0", fontWeight: "500" }}>
                        {review.name}
                      </p>
                      <p className="location">{review.location}</p>
                    </div>
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <button className="stories-next-btn" onClick={nextReview}>
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export default CustomerStories;
