import { useEffect, useState } from "react";
import "../styles/orderContainer.css";

const OrderContainer = () => {
  const temp = import.meta.env.VITE_BACKEND_URL;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${temp}/orders-related/admin/orders`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `${temp}/orders-related/admin/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  console.log(orders);

  return (
    <div className="orders-container-yash">
      {orders.map((order) => (
        <div className="order-card-yash">
          <div className="order-image" key={order._id}>
            {order.products.map((item, index) => (
              <div className="saree-id-img">
                <span className="saree-id-admin bold">
                  {" "}
                  Saree-Id: {item.product.sareeId}
                  <img
                    key={index}
                    src={item.product.image || "fallback-image-url"}
                    alt={item.product.title}
                    className="order-product-image"
                  />
                </span>
              </div>
            ))}
          </div>

          {/* Order Details */}
          <div className="order-details">
            <p className="order-items">
              {order.products.map((item, index) => (
                <span key={index}>
                  {item.product.title} x {item.quantity}
                  {index !== order.products.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p className="order-address">
              <strong>{order.address.name || "Unnamed User"}</strong>
            </p>
            <p>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state} - {order.address.pincode}
            </p>
          </div>

          {/* Order Summary */}
          <div className="order-summary admin-summary">
            <p>
              <strong>Items:</strong> {order.products.length}
            </p>
            <p>
              <strong>Total:</strong> ${order.totalAmount}
            </p>
            <p>
              <strong>Method:</strong> {order.paymentMethod.toUpperCase()}
            </p>
            <p>
              <strong>Payment:</strong> {order.paymentStatus}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Order Status Dropdown */}
          <div className="order-status">
            <select
              className="order-status-dropdown"
              value={order.orderStatus || "Pending"}
              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>

            {/* Status Action Buttons */}
            {order.orderStatus === "Pending" && (
              <button
                className="status-btn confirm"
                onClick={() => updateOrderStatus(order._id, "Confirmed")}
              >
                Confirm Order
              </button>
            )}

            {order.orderStatus === "Confirmed" && (
              <button
                className="status-btn pack"
                onClick={() => updateOrderStatus(order._id, "Packed")}
              >
                Pack Order
              </button>
            )}

            {order.orderStatus === "Packed" && (
              <button
                className="status-btn ship"
                onClick={() => updateOrderStatus(order._id, "Shipped")}
              >
                Ship Order
              </button>
            )}

            {order.orderStatus === "Shipped" && (
              <button
                className="status-btn deliver"
                onClick={() => updateOrderStatus(order._id, "Delivered")}
              >
                Deliver Order
              </button>
            )}

            {order.orderStatus === "Delivered" && (
              <span className="delivered-status">✅ Order Delivered</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderContainer;
