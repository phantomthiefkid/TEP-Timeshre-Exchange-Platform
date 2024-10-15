import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../../components/Navbar/navigation";
import Footer from "../../components/Footer/footer";

const policy = () => {
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPolicy = async () => {
    try {
      const response = await axios.get(
        "http://35.247.160.131/api/public/policy/general"
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

  return (
    <>
      <Navigation />
      <div className="min-h-screen">
        <h1 className="text-4xl font-bold text-left ml-10 mt-10">
          Chính sách quyền riêng tư
        </h1>
        <div className="p-6 bg-white shadow-md rounded-lg m-10">
          {policyData && policyData.length > 0 ? (
            policyData.map((policy, index) => (
              <div key={index}>
                <h2 className="text-2xl font-bold mb-4">{policy.title}</h2>
                <p className="text-lg text-gray-800">{policy.description}</p>
              </div>
            ))
          ) : (
            <p>Hiện tại chưa có chính sách quyền riêng tư</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default policy;
