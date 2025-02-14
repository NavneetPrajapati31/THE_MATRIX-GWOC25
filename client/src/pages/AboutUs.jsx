import "../styles/aboutus.css"; // Import the updated CSS file
import Navbar from "../includes/Navbar";
import Footer from "../includes/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a href="/">Home</a> / <span>About Us</span>
        </div>

        {/* Page Title */}
        <h1 className="page-title">Learn More About Our Journey & Vision</h1>

        {/* Video Section */}
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="Company Story Video"
            allowFullScreen
          ></iframe>
        </div>

        {/* Company Info */}
        <div className="company-info">
          <h2 className="company-name">KALKI</h2>
          <p className="company-description">
            Born in Mumbai, India in 2007, KALKI evokes the very spirit of the
            city it was founded in. An upstart, innovative, and dynamic
            brand—KALKI—offers the best of contemporary, ethnic Indian fashion
            and fusion-wear styles. Staying true to the brand’s unique position
            of premium yet wearable fashion, KALKI unveils fresh collections and
            classic designs throughout the fashion calendar.
          </p>
        </div>

        {/* Vision & Mission Section */}
        <div className="vision">
          <h2>Vision</h2>
          <p>
            To be a company that is a benchmark in the Indian fashion industry
            for its offerings and experiences.
          </p>
        </div>

        <div className="mission">
          <h2>Mission</h2>
          <p>
            To be a preferred company of choice in Indian fashion globally for
            its delightful customer service, and quality product offerings by
            constantly evolving using innovation and design.
          </p>
        </div>

        {/* Features Section */}
        <h2 className="features-title">Features</h2>
        <div className="features">
          <div className="feature-item">
            <img
              src="/images/customization.jpg"
              alt="Customization"
              className="feature-icon"
            />
            <h3>Customization</h3>
            <p>
              Our clients experience personal attention and service from
              professional fashion consultants who help select and style each
              outfit. We tailor designs of your choice through immaculate
              tailoring because your KALKI experience is our priority.
            </p>
          </div>
          <div className="feature-item">
            <img
              src="/images/collection-launch.jpg"
              alt="Collection Launches"
              className="feature-icon"
            />
            <h3>Collection Launches</h3>
            <p>
              Here at KALKI, we make sure that all our designs are latest &
              thereby we bring to you collections that we launch before every
              season across our stores & online.
            </p>
          </div>
          <div className="feature-item">
            <img
              src="/images/worldwide-shipping.jpg"
              alt="Worldwide Shipping"
              className="feature-icon"
            />
            <h3>Worldwide Shipping</h3>
            <p>
              We offer free shipping on orders above USD $200 across 24
              countries. KALKI guarantees 100% authenticity of all items with
              premium logistics partners (DHL, UPS, Blue Dart, Delhivery).
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
