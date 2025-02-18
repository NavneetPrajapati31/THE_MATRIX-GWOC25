import React from "react";
import "../styles/PaymentPolicy.css";
import Footer from "../includes/Footer";
import Navbar from "../includes/Navbar";

const PaymentPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="policy-container">
        <div className="payment-policy">
          <h1>Payment Policy</h1>
          <p>
            Please read the Payment Policy carefully before placing an order. By
            using kashvifashion.com and/or placing an order, you agree to be
            bound by the terms below.
          </p>
          <h2>Order Process</h2>
          <p>
            Once you have found a saree you want to buy, select your size and
            click on "ADD TO CART". Please note that measurements follow two
            size alteration options:
          </p>
          <ul>
            <li>
              <strong>Standard Measurement:</strong> Product delivery time is
              minimized as we try to get the product dispatched as per the
              estimated date on our website.
            </li>
            <li>
              <strong>Custom Measurement:</strong> Dispatch date will be
              extended to 20-30 days. Custom measurements provide a better fit.
            </li>
          </ul>
          <h2>Payment</h2>
          <p>
            We accept all major credit cards / debit cards and payments through
            PayPal.
          </p>
          <h2>Shipping & Delivery</h2>
          <p>
            We only deliver within India. Free shipping is applicable on all
            saree orders. Please check our shipping policy for more details.
          </p>
          <h2>Cancellation</h2>
          <p>
            Orders can be canceled within 24 hours. Any accepted cancellation
            beyond this time is at the discretion of kashvifashion.com and
            refunds are issued as store credit.
          </p>
          <h2>Refunds</h2>
          <p>
            Canceled orders within 24 hours result in a credit voucher. Refunds
            are processed within 7 business days. Products bought during a sale
            are not eligible for refunds.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPolicy;
