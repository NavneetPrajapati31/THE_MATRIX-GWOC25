import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BoltSharpIcon from "@mui/icons-material/BoltSharp";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/productcard.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, userId }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  console.log(userId);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/wishlist-related/get/${userId}`
        );
        const data = await response.json();
        // setIsWishlisted(data.wishlist.includes(product._id));
        setIsWishlisted(data.wishlist.some((i) => i._id === product._id));
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    if (userId) {
      fetchWishlist();
    }
  }, [userId, product._id]);

  const handleWishlistToggle = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/wishlist-related/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: product._id }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.success) {
        setIsWishlisted((prev) => !prev);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div className="product-card">
      {/* Wishlist Icon */}
      <div className="wishlist-icon" onClick={handleWishlistToggle}>
        {isWishlisted ? (
          <FavoriteIcon fontSize="medium" />
        ) : (
          <FavoriteBorderOutlinedIcon fontSize="medium" />
        )}
      </div>

      {/* Product Image */}
      <Link
        to={`/product-details/${product._id}`}
        style={{ textDecoration: "none" }}
      >
        <img
          src={product.images[0]}
          alt="Green Khaddi Georgette Bandhani Saree"
          className="product-img"
        />

        {/* Product Details */}
        {/* Product Name & Price */}

        <p className="wishlist-item-name text-start">{product.name}</p>
        <p
          className="wishlist-item-price text-start"
          style={{ marginTop: "0" }}
        >
          MRP <span className="price">₹{product.price.toLocaleString()}</span>
        </p>
      </Link>

      {/* Ready to Ship Badge */}
      <div className="ready-to-ship text-start">
        <BoltSharpIcon fontSize="xs" /> Ready To Ship
      </div>
    </div>
  );
};

export default ProductCard;
