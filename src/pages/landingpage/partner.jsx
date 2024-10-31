import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTimeshareCompany } from "../../service/public/resortService/resortAPI";
const Partner = () => {
  const [tsCompany, setTsCompany] = useState([]);

  useEffect(() => {
    const fetchTimeshareCompany = async () => {
      try {
        const data = await getAllTimeshareCompany();
        if (data.status === 200) {
          setTsCompany(data.data.content);
        }
      } catch (error) {
        console.error("Failed to fetch timeshare companies", error);
      }
    };

    fetchTimeshareCompany();
  }, []);

  return (
    <div className="py-14">
      <h1 className="text-center text-5xl font-semibold text-gray-700">
        Đối tác của Unwind
      </h1>
      <div className="mt-10 px-4 md:px-10">
        <div className="space-y-10">
          {/* Row 1 with 4 images, centered */}
          <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-4 max-w-6xl w-full">
              {tsCompany.slice(0, 8).map((item, index) => (
                <Link to={`/partner/${item.id}`} key={index}>
                  <img
                    src={item.logo}
                    alt={item.timeshareCompanyName}
                    className="w-[370px] h-[170px] object-contain border rounded-2xl shadow-xl"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
