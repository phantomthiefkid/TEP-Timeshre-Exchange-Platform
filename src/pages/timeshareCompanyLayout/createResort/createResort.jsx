import React, { useEffect, useState } from 'react';
import CreateResortBasic from './CreateResortBasic';
import CreateResortAmenity from './CreateResortAmenity';
import CreateUnitType from './CreateUnitType';
import { createResortByTSC, createResortUnitType } from '../../../service/tsCompanyService/tsCompanyAPI';
import { useDispatch } from "react-redux";
import { setResortId } from "../../../redux/ResortSlice/Resort";
import { useNavigate } from 'react-router-dom';
const CreateResort = () => {
  const [step, setStep] = useState(1); // Quản lý bước hiện tại
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    resortName: '',
    logo: '',
    minPrice: 0,
    maxPrice: 0,
    address: '',
    description: '',
    resortAmenityList: [], // Dữ liệu tiện ích
  });

  const [unitType, setUnitType] = useState([]);


  // Hàm để lưu dữ liệu nhập vào từ các component con
  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData
    }));
  };

  useEffect(() => {
    console.log(formData)
  }, formData)

  const updateUnitType = (newData) => {
    setUnitType(...newData);
    console.log(unitType)
  };


  const handleNext = async () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      const isResortCreated = await handleCreateResort();
      if (isResortCreated) {
        setStep(3);
      }
     
      setStep(3)
    } 
  };

  

  const handleCreateUnitType = async () => {
    try {
      let response = await createResortUnitType(unitType);
      if (response.status === 200) {
        console.log(response);
        dispatch(setResortId(null));
        return response.status
      }
    } catch (error) {
      throw error
    }
  }

  const handleCreateResort = async () => {
    try {
      let response = await createResortByTSC(formData);
      if (response.status === 200) {
        console.log(response.data);
        dispatch(setResortId(response.data.id));  // Dispatch action to save resortId in Redux
        return true;
      }
    } catch (error) {
      console.error("Failed to create resort:", error);
    }
    return false; // Return false if resort creation fails
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="w-full p-10 bg-white">

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
