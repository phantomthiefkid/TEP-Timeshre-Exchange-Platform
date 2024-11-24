import React, { useEffect, useState } from 'react';
import CreateResortBasic from './createResortBasic.jsx';
import CreateResortAmenity from './createResortAmenity.jsx';
import CreateUnitType from './createUnitType.jsx';
import { createResortByTSC, createResortUnitType } from '../../../service/tsCompanyService/tsCompanyAPI';
import { useDispatch } from "react-redux";
import { setResortId } from "../../../redux/ResortSlice/Resort";
import { toast, Toaster } from 'react-hot-toast';
import SpinnerWaiting from '../../../components/LoadingComponent/spinnerWaiting';
import { SparklesIcon } from '@heroicons/react/solid';

const CreateResort = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    resortName: "",
    logo: "",
    minPrice: 0,
    maxPrice: 0,
    address: '',
    description: '',
    resortAmenityList: [],
    imageUrls: []
  });

  const [unitType, setUnitType] = useState([]);

  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const updateUnitType = (newData) => {
    setUnitType(...newData);
   
  };
console.log("praren", formData)

  const handleNext = async () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {

      handleCreateResort();

    }
  };

  const handleCreateResort = async () => {
    try {
      setLoading(true);
      let data = await createResortByTSC(formData)

      if (data.status === 200) {
        toast.success("Tạo mới thành công. Vui lòng nhập loại phòng!", { duration: 4000 });
        setStep(3)
        const resortId = data.data.id;
        dispatch(setResortId(resortId));
        setLoading(false);
        console.log(data.data.id)
      } else {
        toast.error("Tạo thất bại!", { duration: 2000 });
      }

    } catch (error) {
      console.error("Failed to create resort:", error);
    } finally {
      setLoading(false)
    }

  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  if (loading) {
    return (<SpinnerWaiting />)
  }

  return (
    <div className="w-full bg-white">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Resort Images Section */}
      <div className="flex gap-4 mb-8">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/350288700.jpg?k=3fa03303a1b6e890b9f1dc50f00f70df2525cde1a21230c464db9a23533529bf&o=&hp=1"
          alt="Resort view 1"
          className="w-1/3 h-60 object-cover shadow-lg"
        />
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/198352021.jpg?k=e3e164187bededb636a4176381d7b687d17263c4ec36cd243a4647798b64e695&o=&hp=1"
          alt="Resort view 2"
          className="w-1/3 h-60 object-cover shadow-lg"
        />
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/588139600.jpg?k=cb99ba50cb7c74ac4e7c9e3b4843a4f5c4c07bbfd204b3dcc45a47b0c66e3e60&o=&hp=1"
          alt="Resort view 3"
          className="w-1/3 h-60 object-cover shadow-lg"
        />
      </div>

      {/* Title and Logo Section */}
      <div className="flex justify-between items-start mb-10">
        <div className="py-4 space-y-4">
          <h2 className="text-2xl font-extrabold text-sky-600 leading-tight">
            <SparklesIcon className="inline-block mr-2 h-8 w-8 text-sky-500" />
            Thêm mới một khu nghỉ dưỡng sang trọng với đầy đủ các tiện nghi và dịch vụ
          </h2>

          <span className="block text-lg text-gray-600 font-medium mt-4">
            Cung cấp các thông tin chi tiết về resort bao gồm <span className="text-blue-600 hover:text-blue-800">thông tin cơ bản</span>,
            <span className="text-blue-600 hover:text-blue-800"> tiện ích nổi bật</span>, và <span className="text-blue-600 hover:text-blue-800">các loại phòng</span> để đáp ứng nhu cầu của khách hàng.
          </span>
        </div>
        <img
          src="../src/assets/logoTEPblack.png" // Replace with your logo URL
          alt="Company Logo"
          className="w-48 object-contain"
        />
      </div>

      {/* Step Forms */}
      {step === 1 && (
        <CreateResortBasic
          onNext={handleNext}
          onUpdateData={updateFormData}
          formData={formData}
        />
      )}
      {step === 2 && (
        <CreateResortAmenity
          onNext={handleNext}
          onBack={handleBack}
          onUpdateData={updateFormData}
          formData={formData}
        />
      )}
      {step === 3 && (
        <CreateUnitType
          onBack={handleBack}
          onUpdateData={updateUnitType}
          onNext={handleNext}
          formData={unitType}
        />
      )}
    </div>

  );
};

export default CreateResort;
