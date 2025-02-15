export default function Carousel() {
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators mb-5">
        <button
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div
          className="carousel-item active"
          data-bs-interval="3000"
          style={{ cursor: "pointer" }}
        >
          <img
            src="https://i.pinimg.com/originals/67/0e/49/670e49f72ecd161dc2e8972b5b9ba54d.jpg"
            className="d-block w-100"
            style={{
              width: "100%", // Ensures full width
              height: "660px", // Adjust height to fit viewport
              objectFit: "cover",
              filter: "brightness(70%)",
            }}
            alt="..."
          />
          <div className="carousel-caption d-none d-md-block mb-5">
            <h6 style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)" }}>
              <i>Making Every Bride's</i>
            </h6>
            <h3>Dream Come True</h3>
          </div>
        </div>
        <div
          className="carousel-item "
          data-bs-interval="3000"
          style={{ cursor: "pointer" }}
        >
          <img
            src="https://i.pinimg.com/originals/4e/99/1e/4e991e5927f98f74ca05b507811ba539.jpg"
            className="d-block w-100"
            style={{
              width: "100%", // Ensures full width
              height: "660px", // Adjust height to fit viewport

              objectFit: "cover",
              filter: "brightness(70%)",
            }}
            alt="..."
          />
          <div className="carousel-caption d-none d-md-block mb-5">
            <h6 style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)" }}>
              <i>Curating Every</i>
            </h6>
            <h3>Wedding Emotion</h3>
          </div>
        </div>
        <div
          className="carousel-item"
          data-bs-interval="3000"
          style={{ cursor: "pointer" }}
        >
          <img
            src="https://assets.vogue.in/photos/5ce41bf11dc2676095c774db/16:9/w_1280,c_limit/Anita-Dongres-Pichhwai-Collection.jpg"
            className="d-block w-100"
            style={{
              width: "100%", // Ensures full width
              height: "660px", // Adjust height to fit viewport

              objectFit: "cover",
              filter: "brightness(70%)",
            }}
            alt="..."
          />
          <div className="carousel-caption d-none d-md-block mb-5">
            <h6 style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)" }}>
              <i>Simple celebrations, </i>
            </h6>
            <h3>Timeless memories!</h3>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
