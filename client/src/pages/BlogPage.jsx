"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import "../styles/BlogPage.css";
import { Link } from "react-router-dom";
import Navbar from "../includes/Navbar";
import Footer from "../includes/Footer";

const blogPosts = [
  {
    id: 1,
    title: "Summer Fashion Trends 2025",
    category: "Fashion",
    image:
      "https://c4.wallpaperflare.com/wallpaper/699/664/33/model-fashion-women-wallpaper-preview.jpg",
    excerpt: "Discover the hottest styles for the upcoming summer season...",
  },
  {
    id: 2,
    title: "Sustainable Fabrics Highlight ",
    category: "Sustainability",
    image:
      "https://c4.wallpaperflare.com/wallpaper/699/664/33/model-fashion-women-wallpaper-preview.jpg",
    excerpt: "How eco-friendly materials are changing the fashion industry...",
  },
  {
    id: 3,
    title: "Accessorizing 101",
    category: "Style Tips",
    image:
      "https://c4.wallpaperflare.com/wallpaper/699/664/33/model-fashion-women-wallpaper-preview.jpg",
    excerpt:
      "Master the art of selecting the perfect accessories for any outfit...",
  },
  {
    id: 4,
    title: "Vintage Fashion Comeback",
    category: "Trends",
    image:
      "https://c4.wallpaperflare.com/wallpaper/699/664/33/model-fashion-women-wallpaper-preview.jpg",
    excerpt: "Why retro styles are making a big return in 2025...",
  },
  {
    id: 5,
    title: "Minimalist Wardrobe Guide",
    category: "Style Tips",
    image:
      "https://c4.wallpaperflare.com/wallpaper/699/664/33/model-fashion-women-wallpaper-preview.jpg",
    excerpt:
      "Simplify your closet and elevate your style with these essentials...",
  },
  {
    id: 6,
    title: "Fashion Week Highlights",
    category: "Events",
    image:
      "https://c4.wallpaperflare.com/wallpaper/699/664/33/model-fashion-women-wallpaper-preview.jpg",
    excerpt:
      "Recap of the most stunning moments from this year's Fashion Week...",
  },

  {
    id: 7,
    title: "Fashion Week Highlights",
    category: "Events",
    image:
      "https://c4.wallpaperflare.com/wallpaper/699/664/33/model-fashion-women-wallpaper-preview.jpg",
    excerpt:
      "Recap of the most stunning moments from this year's Fashion Week...",
  },

  {
    id: 8,
    title: "Fashion Week Highlights",
    category: "Events",
    image:
      "https://c4.wallpaperflare.com/wallpaper/699/664/33/model-fashion-women-wallpaper-preview.jpg",
    excerpt:
      "Recap of the most stunning moments from this year's Fashion Week...",
  },

  {
    id: 9,
    title: "Fashion Week Highlights",
    category: "Events",
    image:
      "https://c4.wallpaperflare.com/wallpaper/699/664/33/model-fashion-women-wallpaper-preview.jpg",
    excerpt:
      "Recap of the most stunning moments from this year's Fashion Week...",
  },

  {
    id: 10,
    title: "Fashion Week Highlights",
    category: "Events",
    image:
      "https://c4.wallpaperflare.com/wallpaper/699/664/33/model-fashion-women-wallpaper-preview.jpg",
    excerpt:
      "Recap of the most stunning moments from this year's Fashion Week...",
  },
];

const categories = [
  "All",
  "Fashion",
  "Sustainability",
  "Style Tips",
  "Trends",
  "Events",
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visiblePosts, setVisiblePosts] = useState(4);

  const filteredPosts = blogPosts.filter(
    (post) =>
      (selectedCategory === "All" || post.category === selectedCategory) &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    setVisiblePosts((prevVisible) =>
      Math.min(prevVisible + 4, filteredPosts.length)
    );
  };

  return (
    <>
      <Navbar />

      <div className="enhanced-blog-page">
        <div className="hero-BlogPosts-mohit">
          <img
            src="https://wallpaperaccess.com/full/318854.jpg"
            alt="Hero Background"
            className="hero-image-BlogPosts-mohit"
          />
          <div className="hero-content-BlogPosts-mohit">
            <h1>Fashion & Style Blog</h1>
            <p>
              Discover the latest trends, style tips, and sustainable fashion
              ideas
            </p>
          </div>
        </div>

        <section className="blog-controls-BlogPosts-mohit">
          <div className="search-bar-BlogPosts-mohit">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="category-filter-BlogPosts-mohit">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown size={20} />
          </div>
        </section>

        <section className="blog-grid-BlogPosts-mohit">
          {filteredPosts.slice(0, visiblePosts).map((post) => (
            <Link to="/blogdetails">
              <article key={post.id} className="blog-card-BlogPosts-mohit">
                <img src={post.image || "/placeholder.svg"} alt={post.title} />
                <div className="blog-card-content-BlogPosts-mohit">
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <div className="blog-card-footer-BlogPosts-mohit">
                    <span className="category-BlogPosts-mohit">
                      {post.category}
                    </span>
                    <div className="social-share-BlogPosts-mohit">
                      <Facebook size={16} />
                      <Twitter size={16} />
                      <Instagram size={16} />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </section>

        {visiblePosts < filteredPosts.length && (
          <button
            className="load-more-BlogPosts-mohit"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}

        <section className="newsletter-BlogPosts-mohit">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Stay updated with the latest fashion trends and style tips</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
