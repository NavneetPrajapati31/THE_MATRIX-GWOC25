import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Left Section - Categories & Information */}
      <div className="footer-left">
        <div className="footer-column">
          <h3>DESIGNER WEAR</h3>
          <ul>
            <li>Salwar Kameez</li>
            <li>Sarees</li>
            <li>Lehengas</li>
            <li>Gowns</li>
            <li>Kidswear</li>
            <li>Saree Blouse</li>
            <li>Kurtis</li>
            <li>IndoWestern Styles</li>
            <li>Mens</li>
            <li>Accessories</li>
            <li>Bridal Dresses</li>
            <li>Celebrity Wear</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>ABOUT US</h3>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Blog</li>
            <li>Web Stories</li>
            <li>Press</li>
            <li>Careers</li>
            <li>KALKI Boutique</li>
            <li>Fashion Show</li>
            <li>Buying Guide</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>POLICIES</h3>
          <ul>
            <li>Terms & Conditions</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Privacy Policy</li>
            <li>Payment Policy</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>MY ACCOUNT</h3>
          <ul>
            <a href="/dashboard">Shopping Bag</a>
            <a href="/dashboard">Wishlist</a>
            <a href="/dashboard">Order History</a>
            <a href="/dashboard">Order Tracking</a>
            <a href="/dashboard">Login as Developer</a>
          </ul>
        </div>
      </div>

      {/* Right Section - Payment & Contact */}
      <div className="footer-right">
        <div className="payment-section">
          <h3>SAFE & SECURE PAYMENT</h3>
          <div className="payment-icons">
            {/* Place your payment icons here */}
          </div>
        </div>

        <div className="social-media">
          <h3>FOLLOW US</h3>
          <div className="social-icons">
            {/* Place your social media icons here */}
          </div>
        </div>

        {/* Contact & Email Sections */}
        <div className="contact-email-container">
          <div className="contact-section text-start">
            <h3>GET IN TOUCH</h3>
            <p>+91 (22) 4890 0416 (INDIA)</p>
            <p>+1 (408) 520 9415 (US)</p>
            <p>+44 (20) 7193 0887 (UK)</p>
            <p>+61 (02) 8006 4667 (AUS)</p>
          </div>

          <div className="email-section text-start">
            <h3>EMAIL US ON</h3>
            <p>kashvicreation10@gmail.com</p>
          </div>
        </div>
      </div>

      <p style={{ marginLeft: "auto", fontSize: "12px" }}>
        &copy; Kashvi Creation All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
