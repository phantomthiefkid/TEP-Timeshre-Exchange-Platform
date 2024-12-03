import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
import Navigation from "../../components/Navbar/navigation";
import Footer from "../../components/Footer/footer";
import { getAllFaqs } from "../../service/public/faqService/faqAPI";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Hàm cuộn lên đầu
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const getFaqs = async () => {
    try {
      const data = await getAllFaqs();
      if (data.status === 200) {
        setFaqs(data.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFaqs();
  }, []);

  if (loading) {
    return <SpinnerWaiting />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const FAQItems = ({ title, description, isOpen, onClick }) => (
    <div className="border shadow border-gray-200 rounded-lg overflow-hidden mb-4 transition-all duration-300">
      {/* Header Button */}
      <button
        onClick={onClick}
        className="w-full text-left p-5 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 transition-colors"
      >
        <div className="flex items-center">
          <FaQuestionCircle className="text-blue-500 mr-3 text-lg" />
          <span className="text-xl font-medium text-blue-600">{title}</span>
        </div>
        {isOpen ? (
          <FaChevronUp className="text-blue-500 transition-transform transform rotate-180" />
        ) : (
          <FaChevronDown className="text-gray-500 transition-transform transform rotate-0" />
        )}
      </button>

      {/* Animated Dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="p-6 bg-gray-50">
          <p className="text-gray-700 leading-relaxed text-lg">{description}</p>
        </div>
      </div>
    </div>
  );


  return (
    <>
      <Navigation />
      <div className=" min-h-screen relative">
        <div className="mx-auto text-center py-10">
          <h1 className="text-4xl font-medium text-gray-700 drop-shadow-md">
            Câu hỏi thường gặp
          </h1>
          <p className="text-lg text-gray-500 mt-4 max-w-4xl mx-auto">
            Dưới đây là một số câu hỏi thường gặp mà chúng tôi nhận được từ khách
            hàng và đối tác của chúng tôi. Nếu bạn không tìm thấy câu trả lời ở
            đây, vui lòng liên hệ với chúng tôi.
          </p>
        </div>
        <div className="max-w-5xl mx-auto mt-8 p-8 bg-white">
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
        {showScrollTopButton && (
          <button
            className="fixed bottom-6 right-1/2 bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl focus:outline-none transition-transform duration-300 flex items-center justify-center"
            onClick={scrollToTop}
            title="Quay lại đầu trang"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>

        )}
      </div>
      <Footer />

    </>
  );
};

export default FAQ;
