import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/cartpage.css";
import { Link } from "react-router-dom";

export default function CartProduct({ product, onRemove, onQuantityChange }) {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    onQuantityChange(product.productId, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onQuantityChange(product.productId, quantity - 1);
    }
  };

  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    const calculateDeliveryDate = () => {
      let today = new Date();
      let deliveryDays = 5; // Assume default 5 days shipping time

      // Check if the product has a special delivery timeline
      if (product.deliveryDays) {
        deliveryDays = product.deliveryDays;
      }

      // Add business days (excluding weekends)
      let count = 0;
      while (count < deliveryDays) {
        today.setDate(today.getDate() + 1);
        if (today.getDay() !== 0 && today.getDay() !== 6) {
          count++;
        }
      }

      setDeliveryDate(today.toDateString()); // Format: "Mon Feb 19 2025"
    };

    calculateDeliveryDate();
  }, [product]);

  return (
    <div className="cart-item d-flex mb-3">
      <Link to={`/product-details/${product.productId._id}`}>
        <img src={product.image} alt="Saree" className="cart-image" />
      </Link>

      <div className="cart-details ms-4">
        <h5 style={{ textAlign: "start", fontSize: "15px", fontWeight: "400" }}>
          {product.name}
        </h5>
        <div
          className="d-flex align-items-center mt-3"
          style={{ fontSize: "12px" }}
        >
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={handleDecrease}
          >
            -
          </button>
          <span className="mx-2">{quantity}</span>
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <div className="text-start mt-3" style={{ fontSize: "12px" }}>
          <a href="#" className="text-dark" style={{ textDecoration: "none" }}>
            Remove
          </a>{" "}
          |{" "}
          <a href="#" className="text-dark" style={{ textDecoration: "none" }}>
            Add to Wishlist
          </a>
        </div>

        <p className="mt-3 text-start" style={{ fontSize: "13px" }}>
          Est Delivery: Thursday, 13 Feb 2025
        </p>
      </div>
      <div className="ms-auto text-end d-flex" style={{ fontSize: "15px" }}>
        <p style={{ color: "grey", marginRight: "10px", marginTop: "1px" }}>
          MRP
        </p>
        <p style={{ fontSize: "16px", fontWeight: "400" }}>
          {" "}
          ₹{product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
