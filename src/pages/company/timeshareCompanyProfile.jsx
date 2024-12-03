import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/footer";
import Navigation from "../../components/Navbar/navigation";
import { Link, useParams } from "react-router-dom";
import { getTimeshareCompanyDetail } from "../../service/public/resortService/resortAPI";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { XIcon } from "@heroicons/react/solid";
const TimeshareCompanyProfile = () => {
  const { tsId } = useParams();
  const [companyDetail, setCompanyDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0); // Index of the selected image
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        const response = await getTimeshareCompanyDetail(tsId);
        if (response.status === 200) {
          setCompanyDetail(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch company detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetail();
  }, [tsId]);

   const handleOpenSwiper = (url) => {
    setModalOpen(true)
    setSelectedImage(url)
  }

  const closeModal = () => setModalOpen(false);

  if (loading) {
    return (
      <div>
        <SpinnerWaiting />
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <section className="px-32 py-14 gap-4 min-h-screen w-2/3 mx-auto border-l-2 border-r-2">
        {/* Content Block */}
        <div className="flex flex-grow">
          <div className="flex-1 w-2/3">
            <Link className="text-blue-500" to="/timesharecompanylist">
              <u>Danh sách công ty Timeshare</u>
            </Link>
            <h1 className="text-4xl font-bold text-custom-blue-text py-12">
              Công ty: {companyDetail && companyDetail.timeshareCompanyName}
            </h1>
            <p className="mt-2 w-full text-lg">
              <b className="text-xl">Giới thiệu:</b> {companyDetail && companyDetail.description}
            </p>
            <p className="mt-2 w-full text-lg">
              <b className="text-xl">Liên hệ:</b> {companyDetail && companyDetail.contact}
            </p>
          </div>

          {/* Image Block */}
          <div className="py-12 ml-36 w-1/3">
            <img
              src={companyDetail && companyDetail.logo}
              alt={companyDetail && companyDetail.timeshareCompanyName}
              className="w-full h-auto object-contain mt-10 rounded-lg shadow-lg border-2"
            />
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-5 gap-4 mt-10">
          {companyDetail &&
            companyDetail.imageUrls &&
            companyDetail.imageUrls.map((item, index) => (
              <div
                key={index}
                className="relative rounded-lg shadow-md border border-gray-200 cursor-pointer"
                onClick={() => handleOpenSwiper(item)}
              >
                <img
                  src={item}
                  alt={`Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
              </div>
            ))}
        </div>
      </section>
      {
        modalOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
            <div className=' p-2 rounded-lg max-w-5xl w-full relative'>
              <button
                className='absolute top-2 right-2 text-white p-1 rounded-full'
                onClick={closeModal}
              >
                <XIcon className='w-8' />
              </button>
              <div className='mb-4'>
                <img
                  src={selectedImage}
                  className='h-[500px] w-full object-cover rounded-lg'
                  alt={`Slide ${selectedImage}`}
                />
              </div>
              <Swiper
                spaceBetween={10}
                slidesPerView={4}
              >
                {companyDetail.imageUrls && companyDetail.imageUrls.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      className={`h-[100px] w-full object-cover rounded-lg cursor-pointer ${selectedImage === index ? 'border-4 border-blue-500' : ''}`} // Highlight the selected image
                      alt={`Thumbnail ${index}`}
                      onClick={() => setSelectedImage(image)} // Set image on click
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )
      }

      <Footer />
    </>
  );
};

export default TimeshareCompanyProfile;
