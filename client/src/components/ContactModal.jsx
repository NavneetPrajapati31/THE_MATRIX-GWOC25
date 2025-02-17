import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import {
  Modal,
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "../styles/contactmodal.css"; // Custom CSS for responsiveness
const temp = import.meta.env.VITE_BACKEND_URL;

function ContactModal({ show, onHide }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    telephone: "",
    review: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${temp}/orders-related/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({ fullName: "", email: "", telephone: "", review: "" });
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSuccessMessage("");
        onHide();
      }, 3000);
    }
  };

  if (!show) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="contact-modal"
    >
      <Modal.Body className="p-4 rounded">
        <Container fluid>
          <Row className="contact-row">
            {/* Left Section */}
            <Col xs={12} md={6} className="contact-left p-3">
              <h2 className="fw-light fs-4 mb-4">Get in Touch</h2>

              {[
                {
                  icon: "bi-telephone-fill",
                  title: "CALL US",
                  details: ["+91 93764 21333", "+91 72909 09696"],
                },
                {
                  icon: "bi-envelope-fill",
                  title: "MAIL US",
                  details: ["info@kalkifashion.com"],
                },
                {
                  icon: "bi-whatsapp",
                  title: "WHATSAPP",
                  details: ["+91 9920012474"],
                },
              ].map((item, index) => (
                <Card key={index} className="border-0 shadow-sm mb-2 p-2">
                  <Card.Body className="d-flex align-items-center gap-2">
                    <i className={`bi ${item.icon} fs-6 text-muted`}></i>
                    <div>
                      <h3 className="fw-light fs-6 mb-1">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="small text-muted mb-0">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Col>

            {/* Right Section */}
            <Col xs={12} md={6} className="contact-right p-3 bg-light rounded">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="fw-light fs-4">Contact Us</h2>
                {successMessage && (
                  <p className="text-success small mb-0">{successMessage}</p>
                )}
                <Button
                  variant="link"
                  onClick={onHide}
                  className="p-0 text-dark"
                >
                  <i className="bi bi-x-lg fs-6"></i>
                </Button>
              </div>

              <Form onSubmit={handleSubmit}>
                {[
                  { name: "fullName", label: "Full Name", type: "text" },
                  { name: "email", label: "Email Address", type: "email" },
                  { name: "telephone", label: "Telephone", type: "tel" },
                ].map(({ name, label, type }) => (
                  <Form.Group key={name} className="mb-2">
                    <Form.Label className="small text-muted">
                      {label}
                    </Form.Label>
                    <Form.Control
                      name={name}
                      type={type}
                      required
                      value={formData[name]}
                      onChange={handleChange}
                      className="border-light shadow-sm"
                    />
                  </Form.Group>
                ))}

                <Form.Group className="mb-3">
                  <Form.Label className="small text-muted">
                    Add Review
                  </Form.Label>
                  <Form.Control
                    name="review"
                    as="textarea"
                    rows={3}
                    value={formData.review}
                    onChange={handleChange}
                    className="border-light shadow-sm"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 rounded-3 py-2"
                  style={{ backgroundColor: "black", borderColor: "black" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default ContactModal;
