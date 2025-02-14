import "../styles/newproducts.css"; // Import custom CSS

const products = [
  {
    img: "https://www.koskii.com/cdn/shop/files/koskii-purple-stonework-semicrepe-designer-saree-saus0034824_purple_1_1_1400x.jpg?v=1719829414",
    title: "Light Blue Crushed Tissue Saree Embro...",
    price: "₹ 11,995",
  },
  {
    img: "https://www.koskii.com/cdn/shop/files/koskii-purple-stonework-semicrepe-designer-saree-saus0034824_purple_1_1_1400x.jpg?v=1719829414",
    title: "Green Bandhani Lehenga Set With Za...",
    price: "₹ 23,799",
  },
  {
    img: "https://www.koskii.com/cdn/shop/files/koskii-purple-stonework-semicrepe-designer-saree-saus0034824_purple_1_1_1400x.jpg?v=1719829414",
    title: "Royal Blue Bandhani Lehenga Set Wit...",
    price: "₹ 23,799",
  },
  {
    img: "https://www.koskii.com/cdn/shop/files/koskii-purple-stonework-semicrepe-designer-saree-saus0034824_purple_1_1_1400x.jpg?v=1719829414",
    title: "Beige Palazzo Set With Beads Sequin...",
    price: "₹ 22,499",
  },
  {
    img: "https://www.koskii.com/cdn/shop/files/koskii-purple-stonework-semicrepe-designer-saree-saus0034824_purple_1_1_1400x.jpg?v=1719829414",
    title: "Orange Floral Print Pleated Gown Wit...",
    price: "₹ 20,990",
  },
];

const NewProducts = () => {
  return (
    <div className="container">
      <h2
        className="text-center"
        style={{
          fontSize: "22px",
          fontWeight: "400",
          marginTop: "90px",
          marginBottom: "20px",
        }}
      >
        New Arrivals
      </h2>

      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img
              src={product.img}
              alt={product.title}
              className="product-img"
            />
            {/* Product Name & Price */}
            <p className="wishlist-item-name text-start">{product.title}</p>
            <p
              className="wishlist-item-price text-start"
              style={{ marginTop: "0" }}
            >
              MRP <span className="price">{product.price}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
