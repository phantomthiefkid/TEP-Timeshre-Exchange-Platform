import React, { useEffect, useState } from 'react';
import CreateResortBasic from './CreateResortBasic';
import CreateResortAmenity from './CreateResortAmenity';
import CreateUnitType from './CreateUnitType';
import { createResortByTSC, createResortUnitType } from '../../../service/tsCompanyService/tsCompanyAPI';
import { useDispatch } from "react-redux";
import { setResortId } from "../../../redux/ResortSlice/Resort";
import { toast, Toaster } from 'react-hot-toast';
import Loading from '../../../components/LoadingComponent/loading';

const CreateResort = () => {
  const [step, setStep] = useState(1); // Quản lý bước hiện tại
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
        toast.success("Tạo mới thành công. Vui lòng nhập loại phòng!", { duration: 2000 });
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
    return (<Loading />)
  }

  return (
    <div className="w-full p-10 bg-white">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-6">Thêm mới Resort</h2>
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
