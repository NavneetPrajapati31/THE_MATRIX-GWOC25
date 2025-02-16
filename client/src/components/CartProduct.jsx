import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/cartpage.css";
import { Link } from "react-router-dom";

export default function CartProduct({
  product,
  onRemove,
  onQuantityChange,
  userId,
}) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/wishlist-related/get/${userId}`
        );
        const data = await response.json();
        console.log(data);
        setIsWishlisted(
          data.wishlist.some((i) => i._id === product.productId._id)
        );
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    if (userId) {
      fetchWishlist();
    }
  }, [userId, product._id]);

  const handleIncrease = async () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(product.productId, newQuantity);

    console.log();

    try {
      await fetch("http://localhost:3001/cart-related/update-quantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId: product.productId,
          quantity: newQuantity,
        }),
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDecrease = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(product.productId, newQuantity);

      try {
        await fetch("http://localhost:3001/cart-related/update-quantity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            productId: product.productId,
            quantity: newQuantity,
          }),
        });
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const handleRemove = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/cart-related/remove",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, productId: product._id }),
        }
      );
      const data = await response.json();
      console.log(product.productId);
      if (response.ok) {
        onRemove(product._id);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const [deliveryDate, setDeliveryDate] = useState("");

  const handleWishlistToggle = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/wishlist-related/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: product.productId._id }),
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

  useEffect(() => {
    const calculateDeliveryDate = () => {
      let today = new Date();
      let deliveryDays = 5;

      if (product.deliveryDays) {
        deliveryDays = product.deliveryDays;
      }

      let count = 0;
      while (count < deliveryDays) {
        today.setDate(today.getDate() + 1);
        if (today.getDay() !== 0 && today.getDay() !== 6) {
          count++;
        }
      }
      setDeliveryDate(today.toDateString());
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
          <a
            className="text-dark"
            style={{ textDecoration: "none", cursor: "pointer" }}
            onClick={() => handleRemove(product.productId)}
          >
            Remove
          </a>{" "}
          |{" "}
          <a
            className="text-dark"
            style={{ textDecoration: "none", cursor: "pointer" }}
            onClick={handleWishlistToggle}
          >
            {isWishlisted ? "Remove from wishlist" : "Add to Wishlist"}
          </a>
        </div>

        <p className="mt-3 text-start" style={{ fontSize: "13px" }}>
          Est Delivery : {deliveryDate}
        </p>
      </div>
      <div className="ms-auto text-end d-flex" style={{ fontSize: "15px" }}>
        <p style={{ color: "grey", marginRight: "10px", marginTop: "1px" }}>
          MRP
        </p>
        <p style={{ fontSize: "16px", fontWeight: "400" }}> ₹ X,XXX</p>
      </div>
    </div>
  );
}
