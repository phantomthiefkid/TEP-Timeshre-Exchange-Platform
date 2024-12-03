import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../../components/Navbar/navigation";
import Footer from "../../components/Footer/footer";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";

const policy = () => {
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPolicy = async () => {
    try {
      const response = await axios.get(
        "https://unwind.id.vn/api/public/policy/general"
      );
      setPolicyData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  
  useEffect(() => {
    getPolicy();
  }, []);
  if (loading) {
    return <SpinnerWaiting />;
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto p-6">
          {/* Title Section */}
          <h1 className="text-4xl font-semibold text-center text-gray-700 ml-10 mt-10">
            Chính sách quyền riêng tư
          </h1>

          {/* Content Section */}
          <div className="p-8 bg-white shadow-lg rounded-2xl mt-8 mb-8">
            {policyData && policyData.length > 0 ? (
              policyData.map((policy, index) => (
                <div key={index} className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">{policy.title}</h2>
                  <p className="text-md text-gray-600 leading-relaxed">{policy.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Hiện tại chưa có chính sách quyền riêng tư</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default policy;
