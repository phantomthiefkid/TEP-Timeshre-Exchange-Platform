import React, { useState } from "react";
import CreateResortBasic from "./createResortBasic";
import CreateResortAmenity from "./createResortAmenity";
import CreateUnitType from "./CreateUnitType";
import {
  createResortByTSC,
  createResortUnitType,
} from "../../../service/tsCompanyService/tsCompanyAPI";
import { useDispatch } from "react-redux";
import { setResortId } from "../../../redux/ResortSlice/Resort";
import { useNavigate } from "react-router-dom";
const CreateResort = () => {
  const [step, setStep] = useState(1); // Quản lý bước hiện tại
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    resortName: "",
    logo: "",
    minPrice: 0,
    maxPrice: 0,
    address: "",
    description: "",
    resortAmenityList: [], // Dữ liệu tiện ích
  });

  const [unitType, setUnitType] = useState({
    resortId: 0,
    title: "", // Initial value as a placeholder
    area: "", // Initial value as a placeholder
    bathrooms: 0,
    bedrooms: 0,
    bedsFull: 0,
    bedsKing: 0,
    bedsSofa: 0,
    bedsMurphy: 0,
    bedsQueen: 0,
    bedsTwin: 0,
    buildingsOption: "", // Initial value as a placeholder
    price: 0,
    description: "", // Initial value as a placeholder
    kitchen: "", // Initial value as a placeholder
    photos: "", // Initial value as a placeholder
    sleeps: 0,
    view: "", // Initial value as a placeholder
    unitTypeAmenitiesDTOS: [
      {
        name: "", // Initial value as a placeholder
        type: "", // Initial value as a placeholder
      },
    ],
  });

  // Hàm để lưu dữ liệu nhập vào từ các component con
  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
    console.log(formData, "parent");
  };

  const updateUnitType = (newData) => {
    setUnitType((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };
  // console.log(unitType, "unitType parent");

  const handleNext = async () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      const isResortCreated = await handleCreateResort();
      if (isResortCreated) {
        setStep(3);
      }
    } else if (step === 3) {
      const status = await handleCreateUnitType();
      if (status === 200) {
        navigate("/timesharecompany/resortmanagementtsc");
      }
      console.log(unitType);
    }
  };

  const handleCreateUnitType = async () => {
    try {
      let response = await createResortUnitType(unitType);
      if (response.status === 200) {
        console.log(response);
        dispatch(setResortId(null));
        return response.status;
      }
    } catch (error) {
      throw error;
    }
  };

  const handleCreateResort = async () => {
    try {
      let response = await createResortByTSC(formData);
      if (response.status === 200) {
        console.log(response.data);
        dispatch(setResortId(response.data.id)); // Dispatch action to save resortId in Redux
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
