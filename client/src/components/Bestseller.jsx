import { Link } from "react-router-dom";
import "../styles/newproducts.css"; // Import custom CSS

const products = [
  {
    img: "https://www.koskii.com/cdn/shop/products/koskii-lavender-mirrorwork-net-designer-saree-saus0021303_lavender_3_1800x1800.jpg?v=1661854696",
    title: "Light Blue Crushed Tissue Saree Embro...",
    price: "₹ 11,995",
  },
  {
    img: "https://www.koskii.com/cdn/shop/products/koskii-lavender-mirrorwork-net-designer-saree-saus0021303_lavender_3_1800x1800.jpg?v=1661854696",
    title: "Green Bandhani Lehenga Set With Za...",
    price: "₹ 23,799",
  },
  {
    img: "https://www.koskii.com/cdn/shop/products/koskii-lavender-mirrorwork-net-designer-saree-saus0021303_lavender_3_1800x1800.jpg?v=1661854696",
    title: "Royal Blue Bandhani Lehenga Set Wit...",
    price: "₹ 23,799",
  },
  {
    img: "https://www.koskii.com/cdn/shop/products/koskii-lavender-mirrorwork-net-designer-saree-saus0021303_lavender_3_1800x1800.jpg?v=1661854696",
    title: "Beige Palazzo Set With Beads Sequin...",
    price: "₹ 22,499",
  },
  {
    img: "https://www.koskii.com/cdn/shop/products/koskii-lavender-mirrorwork-net-designer-saree-saus0021303_lavender_3_1800x1800.jpg?v=1661854696",
    title: "Orange Floral Print Pleated Gown Wit...",
    price: "₹ 20,990",
  },
];

const Bestseller = () => {
  return (
    <div className="container mb-5">
      <h2
        className="text-center"
        style={{
          fontSize: "1.25rem",
          fontWeight: "400",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >
        Bestseller Elegance
      </h2>

      <div className="product-grid">
        {products.map((product, index) => (
          <>
            <Link to={`/product-details/${product._id}`}>
              <div key={index} className="product-card">
                <img
                  src={product.img}
                  alt={product.title}
                  className="new-product-img"
                />
                {/* Product Name & Price */}
                <p className="wishlist-item-name ">{product.title}</p>
                <p className="wishlist-item-price " style={{ marginTop: "0" }}>
                  MRP <span className="price">X,XXX</span>
                </p>
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
};

export default Bestseller;
