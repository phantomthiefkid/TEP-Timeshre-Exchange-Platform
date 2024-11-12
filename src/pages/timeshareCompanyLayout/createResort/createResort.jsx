import React, { useEffect, useState } from 'react';
import CreateResortBasic from './createResortBasic.jsx';
import CreateResortAmenity from './createResortAmenity.jsx';
import CreateUnitType from './createUnitType.jsx';
import { createResortByTSC, createResortUnitType } from '../../../service/tsCompanyService/tsCompanyAPI';
import { useDispatch } from "react-redux";
import { setResortId } from "../../../redux/ResortSlice/Resort";
import { toast, Toaster } from 'react-hot-toast';
import SpinnerWaiting from '../../../components/LoadingComponent/spinnerWaiting';

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
    console.log(unitType)
  };


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
    }

  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  if (loading) {
    return (<SpinnerWaiting />)
  }

  return (
    <div className="w-full p-10 bg-white">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-between">
        <div className="py-4 p-6 space-y-2">
          <h1 className="text-4xl font-bold text-gray-700">Tạo thông tin resort</h1>
          <h3 className="text-xl text-red-400">
            Thêm mới một resort và các thông tin chi tiết
          </h3>
        </div>
        <img
          src="../src/assets/logoTEPblack.png" // Replace with your logo URL
          alt="Company Logo"
          className="w-48 object-contain"
        />
      </div>
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
          onUpdateData={updateUnitType} // Pass the updateUnitType function here
          onNext={handleNext}
          formData={unitType} // Pass unitType data
        />
      )}

    </div>
  );
};

export default CreateResort;
