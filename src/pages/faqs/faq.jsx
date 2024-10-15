import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../../components/Navbar/navigation";
import Footer from "../../components/Footer/footer";

const faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFaqs = async () => {
    try {
      const response = await axios.get(
        "http://35.247.160.131/api/public/faq/all"
      );
      setFaqs(response.data);
      console.log(response.data);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFaqs();
  }, []);

  const FAQItems = ({ title, description, isOpen, onClick }) => (
    <div className="border rounded-lg mb-2">
      <button
        onClick={onClick}
        className="w-full text-left p-4 flex justify-between items-center"
      >
        <span>{title}</span>
        <i className={`fas fa-chevron-${isOpen ? "up" : "down"}`}></i>
      </button>
      {isOpen && <div className="p-4 bg-gray-50">{description}</div>}
    </div>
  );

  return (
    <>
      <Navigation />
      <div className="bg-white min-h-screen">
        <div className="mx-auto mt-10">
          <h1 className="text-2xl font-bold text-center mb-4">
            Câu hỏi thường gặp
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Dưới đây là một số câu hỏi thường gặp mà chúng tôi nhận được từ
            khách hàng và đối tác của chúng tôi. Nếu bạn không tìm thấy câu trả
            lời ở đây, vui lòng liên hệ với chúng tôi.
          </p>
        </div>
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
          {faqs.map((faq, index) => (
            <FAQItems
              key={faq.faqId}
              title={faq.title}
              description={faq.description}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default faq;
