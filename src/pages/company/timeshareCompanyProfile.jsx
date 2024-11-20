import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/footer";
import Navigation from "../../components/Navbar/navigation";
import { Link, useParams } from "react-router-dom";
import { getTimeshareCompanyDetail } from "../../service/public/resortService/resortAPI";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
import { HeartIcon, LocationMarkerIcon, StarIcon } from "@heroicons/react/solid";
const TimeshareCompanyProfile = () => {
    const { tsId } = useParams();
    const [companyDetail, setCompanyDetail] = useState(null);
    const [loading, setLoading] = useState(true);
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
            <p className="mt-2 w-full text-lg">{companyDetail && companyDetail.description}</p>
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
          {companyDetail && companyDetail.imageUrls &&
            companyDetail.imageUrls.map((item, index) => (
              <div
                key={index}
                className="relative rounded-lg shadow-md border border-gray-200"
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
        <Footer />
        </>
    )
}

export default TimeshareCompanyProfile