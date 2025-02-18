import { useState } from "react";
import "../styles/FAQ.css";

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Delivery Was Attempted But I Was Unavailable. What Next?",
      answer:
        "You can reschedule the delivery or contact customer support for assistance.",
    },
    {
      question: "Does Kalkifashion.Com Offer Cash On Delivery (COD)?",
      answer:
        "COD is available for selected locations/Pin codes in India only. COD limit is up to 18000 INR. Customisation is not available for COD orders.",
    },
    {
      question: "Will I Receive A Quality Product By KALKI Fashion?",
      answer:
        "As an international brand, we adhere to strict quality and design benchmarks. Every KALKI product goes through a 5-step Quality Control process to ensure that you receive the best.",
    },
    {
      question:
        "The Order Status Is 'Delivered' But Not Received It. What Should I Do?",
      answer:
        "Please check with neighbors or contact customer support to raise a query.",
    },
    {
      question: "How To Track The Order Once Shipped?",
      answer:
        "You can track your order using the tracking link provided in the shipment confirmation email.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container" style={{ marginBlock: "80px" }}>
      <h1
        style={{
          fontSize: "1.25rem",
          fontWeight: "400",
        }}
      >
        FAQs
      </h1>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span>{openIndex === index ? "-" : "+"}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
