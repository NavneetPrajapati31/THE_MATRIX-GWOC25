import "../styles/aboutus.css"; // Import the updated CSS file
import Navbar from "../includes/Navbar";
import Footer from "../includes/Footer";
import StoreLocation from "../components/StoreLocation";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
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
          <h2 className="company-name">KASHVI</h2>
          <p className="company-description text-start">
            Born in Surat, Gujarat, the heart of India’s textile industry,
            KASHVI is a premium saree brand that celebrates the timeless
            elegance of Indian heritage. Rooted in tradition yet inspired by
            modern aesthetics, we bring you an exquisite collection of sarees
            that blend craftsmanship, quality, and contemporary style. At
            KASHVI, every saree is a masterpiece, woven with passion and
            precision. From luxurious silk and intricate handloom weaves to
            lightweight daily wear and designer festive drapes, our collection
            is curated to suit every occasion. Whether you seek timeless
            classics or trendsetting designs, KASHVI ensures that each piece
            reflects grace, sophistication, and the rich cultural essence of
            India. Embrace tradition with a touch of modernity—experience the
            beauty of KASHVI sarees.
          </p>
        </div>

        {/* Vision & Mission Section */}
        <div className="vision">
          <h2 className="company-name">Vision</h2>
          <p className="company-description text-start">
            At KASHVI, we envision becoming a globally recognized name in ethnic
            fashion, redefining the saree experience for women across
            generations. Rooted in the rich textile legacy of Surat, Gujarat, we
            strive to blend tradition with innovation, making sarees not just an
            attire but an expression of culture, confidence, and individuality.
            Our goal is to create a brand that resonates with every woman,
            offering her a seamless blend of heritage craftsmanship and
            contemporary aesthetics. We aim to preserve the timeless art of
            saree weaving while embracing modern design sensibilities, ensuring
            that every KASHVI saree tells a story of elegance, authenticity, and
            impeccable craftsmanship. Through ethical sourcing, sustainable
            practices, and customer-centric designs, we aspire to set new
            benchmarks in the saree industry, making Indian ethnic fashion a
            global statement of style.
          </p>
        </div>

        <div className="mission">
          <h2 className="company-name">Mission</h2>
          <p className="company-description text-start">
            At KASHVI, our mission is to uphold the legacy of Indian textile
            artistry by offering exquisitely crafted sarees that blend tradition
            with contemporary elegance. We strive to innovate while preserving
            cultural heritage, ensuring that every saree reflects timeless
            beauty and impeccable craftsmanship. Our customer-centric approach
            focuses on delivering a seamless shopping experience, helping every
            woman find a saree that complements her style and occasion.
            Committed to empowering artisans, we support traditional weavers
            with fair wages and sustainable practices, preserving India’s rich
            weaving heritage. With a strong emphasis on ethical sourcing and
            eco-friendly production, we aim to create fashion that is
            responsible, elegant, and enduring. As we expand our reach globally,
            our vision is to make KASHVI synonymous with grace, confidence, and
            the timeless charm of Indian ethnic wear.
          </p>
        </div>

        {/* Features Section */}
        <h2 className="company-name">Features</h2>
        <div className="features">
          <div className="feature-item">
            <img
              src="https://static3.azafashions.com/uploads/product_gallery/n-k310022-0043096001650719212.JPG"
              alt="Customization"
              className="feature-icon"
            />
            <h3 className="company-name">Customization</h3>
            <p className="company-description text-start">
              Our clients experience personal attention and service from
              professional fashion consultants who help select and style each
              outfit. We tailor designs of your choice through immaculate
              tailoring because your KASHVI experience is our priority.
            </p>
          </div>
          <div className="feature-item">
            <img
              src="https://th.bing.com/th/id/R.c19d879cd1482e7efd496a14cc3273a2?rik=DHmYFMrkXq7qvQ&riu=http%3a%2f%2fwww.koskii.com%2fcdn%2fshop%2fproducts%2fkoskii-sea-green-stonework-satin-designer-saree-saus0022632_sea_green__1.jpg%3fv%3d1670485220&ehk=Hkig7iWqkVfwtyPWVdW3RB%2fuaQ1Vkp6%2f4ibOu5XI4ig%3d&risl=&pid=ImgRaw&r=0"
              alt="Collection Launches"
              className="feature-icon"
            />
            <h3 className="company-name">Collection Launches</h3>
            <p className="company-description text-start">
              Here at KASHVI, we make sure that all our designs are latest &
              thereby we bring to you collections that we launch before every
              season across our stores & online.
            </p>
          </div>
          <div className="feature-item">
            <img
              src="https://www.koskii.com/cdn/shop/files/koskii-purple-stonework-semicrepe-designer-saree-saus0034824_purple_1_1_1400x.jpg?v=1719829414"
              alt="Worldwide Shipping"
              className="feature-icon"
            />
            <h3 className="company-name">Worldwide Shipping</h3>
            <p className="company-description text-start">
              We offer free shipping on orders above USD $200 across 24
              countries. KASHVI guarantees 100% authenticity of all items with
              premium logistics partners (DHL, UPS, Blue Dart, Delhivery).
            </p>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <StoreLocation />
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
