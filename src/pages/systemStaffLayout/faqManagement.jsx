import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaChevronDown, FaChevronUp, FaEdit, FaQuestion, FaQuestionCircle } from "react-icons/fa";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
import AddFaqModal from "../../components/Modal/faq/addFaqModal";
import UpdateFaqModal from "../../components/Modal/faq/updateFaqModal";
import { createFaq, getAllFAQs, updateFAQById } from "../../service/systemStaffService/systemStaffAPI";

const FaqManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFaq, setSelectedFaq] = useState(null); // FAQ đang mở mô tả
  const [isOpenModal, setIsOpenModal] = useState(false); // Modal trạng thái
  const [modalFaq, setModalFaq] = useState(null); // FAQ được chỉnh sửa
  const [isCreate, setIsCreate] = useState(false);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const fetchAllFaqs = async () => {
      try {
        let data = await getAllFAQs();
        if (data.status === 200) {
          setFaqs(data.data);
          setLoading(false);

        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchAllFaqs();
  }, [flag]);

  const handleOpen = (faq) => {
    setModalFaq(faq); // Lưu FAQ để chỉnh sửa
    setIsOpenModal(true); // Mở modal
  };

  const handleClose = () => {
    setIsOpenModal(false);
  }

  const handleUpdateFaq = async (update) => {
    try {
      await updateFAQById(update).then(() => {
        toast.success("Cập nhật thông tin thành công!", { duration: 2000 })
        setFlag(!flag)
      })
    } catch (error) {
      toast.error("Có lỗi xảy ra!!!", { duration: 2000 });
      return error
    }
  }


  const handleCloseCreateModal = () => {
    setIsCreate(false)
  }

  const handleCreateFaq = async (create) => {
    try {
      let data = await createFaq(create)
      if (data.status === 200) {
        toast.success("Thêm chính sách thành công!", { duration: 2000 })
        setFlag(!flag)
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!!!", { duration: 2000 });
      return error
    }
  }

  if (loading) {
    return <SpinnerWaiting />;
  }

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="py-6 px-8 space-y-4 border-l-8 border-blue-500 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          Mục quản lý <span className="text-blue-600">FAQ</span>
        </h1>
        <h3 className="text-lg text-gray-500">
          <span className="font-semibold text-blue-600">Quản lý</span> tất cả
          các câu hỏi thường gặp và
          <span className="font-semibold text-blue-600"> cập nhật thông tin</span> tại đây.
        </h3>
      </div>
      {/* Subtitle */}
      <div className="flex justify-between py-10 px-8">
        <h3 className="text-2xl text-gray-700 font-semibold px-8">
          Sau đây là một số câu hỏi thường gặp nhất mà nhóm dịch vụ khách hàng của chúng tôi nhận được.
        </h3>
        <button onClick={() => setIsCreate(true)} className="bg-gradient-to-r flex justify-center items-center gap-2 from-blue-500 to-purple-600 text-white hover:bg-blue-700 font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200">
          <FaQuestion /> Thêm câu hỏi
        </button>
      </div>

      {/* FAQ List */}
      <div className="space-y-6 max-w-5xl mx-auto py-6 mb-6">
        {faqs.map((faq) => (
          <div
            key={faq.faqId}
            className="bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            {/* Header Section */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50">
              {/* Left Section: Icon + Title */}
              <div className="flex items-center space-x-4">
                <FaQuestionCircle className="text-blue-500 text-2xl" />
                <div>
                  <button
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600 focus:outline-none text-left transition-colors duration-300"
                    onClick={() => setSelectedFaq(selectedFaq === faq.faqId ? null : faq.faqId)} // Toggle FAQ
                  >
                    {faq.title}
                  </button>
                  <p className="text-sm text-gray-500 mt-1">  Ngày tạo:{" "}
                    {new Date(faq.createdDate).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  className="text-gray-500 hover:text-green-600 transition-colors duration-300 focus:outline-none"
                  onClick={() => handleOpen(faq)}
                >
                  <FaEdit className="text-xl" />
                </button>
                <button
                  className="text-gray-500 hover:text-blue-600 transition-colors duration-300 focus:outline-none"
                  onClick={() => setSelectedFaq(selectedFaq === faq.faqId ? null : faq.faqId)}
                >
                  {selectedFaq === faq.faqId ? (
                    <FaChevronUp className="text-xl" />
                  ) : (
                    <FaChevronDown className="text-xl" />
                  )}
                </button>
              </div>
            </div>

            {/* Description Section */}
            {selectedFaq === faq.faqId && (
              <div className="bg-gray-50 px-6 py-4 text-gray-700 leading-relaxed border-t border-gray-200">
                <p>{faq.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {isOpenModal && modalFaq && (
        <UpdateFaqModal
          isOpen={isOpenModal}
          onClose={handleClose}
          selected={modalFaq}
          onUpdate={handleUpdateFaq}
        />
      )}
      {isCreate && (<AddFaqModal isOpen={isCreate} onUpdate={handleCreateFaq} onClose={handleCloseCreateModal} />)}
    </div>
  );
};

export default FaqManagement;
