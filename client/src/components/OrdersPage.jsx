import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/OrdersPage.css";
import { useSelector } from "react-redux";

const OrdersPage = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef();

  const user = useSelector((state) => state.user?.user);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${URL}/orders-related/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);
  const handlePrintInvoice = (order) => {
    const subtotal = order.products.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    const invoiceContent = `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .invoice-container { width: 80%; margin: auto; border: 1px solid #ccc; padding: 20px; border-radius: 8px; }
                .header { text-align: center; margin-bottom: 20px; }
                .header h2 { margin-bottom: 5px; }
                .header p { margin: 0; font-size: 14px; color: gray; }
                .details { margin-bottom: 20px; }
                .details p { margin: 4px 0; }
                .table-container { width: 100%; border-collapse: collapse; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background: #f8f8f8; }
                .total-container { text-align: right; margin-top: 20px; font-weight: bold; }
                .footer { text-align: center; margin-top: 30px; font-size: 14px; color: gray; }
                .qr-container { text-align: center; margin-top: 15px; }
            </style>
        </head>
        <body>
            <div class="invoice-container">
                <div class="header">
                    <h2>Kashvi Sarees</h2>
                    <p>123, Fashion Street, Surat, Gujarat, India</p>
                    <p>GST No: 24AAJCS3178L1Z2 | Contact: +91 98765 43210</p>
                </div>

                <hr/>

                <div class="details">
                    <h4>Invoice Details</h4>
                    <p><strong>Order ID:</strong> ${order._id}</p>
                    <p><strong>Date:</strong> ${new Date(
                      order.createdAt
                    ).toDateString()}</p>
                    <p><strong>Payment Status:</strong> ${
                      order.paymentStatus
                    }</p>
                </div>

                <div class="details">
                    <h4>Customer Details</h4>
                    <p><strong>Name:</strong> ${user?.name || "Guest"}</p>
                    <p><strong>Email:</strong> ${
                      user?.email || "Not Available"
                    }</p>
                    <p><strong>Phone:</strong> ${
                      user?.phone || "Not Available"
                    }</p>
                    <p><strong>Delivery Address:</strong> ${
                      order.address.street
                    }, ${order.address.city}, ${order.address.state} - ${
      order.address.pincode
    }</p>
                </div>

                <div class="table-container">
                    <h4>Product Details</h4>
                    <table>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                        ${order.products
                          .map(
                            (item, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${item.product.title}</td>
                                <td>₹${item.product.price}</td>
                                <td>${item.quantity}</td>
                                <td>₹${item.product.price * item.quantity}</td>
                            </tr>
                        `
                          )
                          .join("")}
                    </table>
                </div>

                <div class="total-container">
                    <p>Subtotal: ₹${subtotal.toFixed(2)}</p> 
                    <p><strong>Grand Total: ₹${subtotal.toFixed(2)}</strong></p>
                </div>

                <div class="footer">
                    <p>Thank you for shopping with Kashvi Sarees!</p>
                </div>
            </div>
        </body>
        </html>
        `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(invoiceContent);
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) {
    return <div className="text-center my-5">Loading orders...</div>;
  }

  return (
    <div className="container py-4 yash-orders-container">
      <h2 className="mb-3 pb-2 fw-bold yash-orders-title">
        <span className="my-title">MY</span>{" "}
        <span className="fw-bold yash-orders-highlight">ORDERS ________</span>
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="order-card p-3 border rounded shadow-sm bg-white yash-order-card"
          >
            <div className="d-flex justify-content-between align-items-center">
              <span className="yash-order-id">Order ID: {order._id}</span>
            </div>

            <div className="row align-items-center">
              <div className="col-md-2">
                <img
                  src={
                    order.products[0].product.image ||
                    "https://via.placeholder.com/80"
                  }
                  alt="Product"
                  className="img-fluid yash-order-image"
                />
              </div>

              <div className="col-md-3">
                <h5 className="fw-bold text-dark yash-order-name">
                  {order.products[0].product.title}
                </h5>
                <p className="text-muted mb-1 yash-order-details">
                  ₹{order.products[0].product.price} &nbsp; | &nbsp; Quantity:{" "}
                  {order.products[0].quantity}
                </p>
                <p className="text-secondary small yash-order-date">
                  <strong>Order Placed:</strong>{" "}
                  {new Date(order.createdAt).toDateString()}
                </p>
              </div>

              <div className="col-md-3">
                <p className="text-secondary small yash-order-delivery">
                  <strong>Delivery Details:</strong>
                  <br />
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state} - {order.address.pincode}
                </p>
              </div>

              <div className="col-md-2">
                <span
                  className={`fw-bold yash-order-status ${
                    order.orderStatus === "Pending"
                      ? "text-warning"
                      : "text-success"
                  }`}
                >
                  <span
                    className={`status-indicator me-2 yash-status-indicator ${
                      order.orderStatus === "Pending"
                        ? "bg-warning"
                        : "bg-success"
                    }`}
                  ></span>
                  {order.orderStatus}
                </span>
              </div>

              <div className="col-md-2 d-flex flex-column">
                <button className="btn btn-outline-primary yash-track-order-btn w-100">
                  Track Order
                </button>
                <button
                  className="btn btn-primary mt-2 yash-print-invoice-btn w-100"
                  onClick={() => handlePrintInvoice(order)}
                >
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
