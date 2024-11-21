import React from "react";
import Navigation from "../../components/Navbar/navigation";
import Footer from "../../components/Footer/footer";

const aboutUs = () => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen">
        <div>
          <div className="relative">
            <img
              src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731986630878_aboutHeader.png"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-left text-white">
                <h1 className="text-4xl font-bold">Về Unwind</h1>
                <p className="mt-2">
                  Chào mừng bạn đến với Unwind, nơi biến giấc mơ kỳ nghỉ của bạn
                  thành hiện thực! Chúng tôi chuyên cung cấp dịch vụ cho thuê và
                  trao đổi timeshare, giúp bạn tận hưởng những kỳ nghỉ tuyệt vời
                  với sự linh hoạt và tiết kiệm chi phí.
                </p>
              </div>
            </div>
          </div>
          <section className="container mx-auto py-12 px-6">
            <div className="absolute inset-x-0 top-[30vh] p-40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg shadow-sm bg-white">
                  <h2 className="text-xl font-bold text-blue-600">Tầm nhìn</h2>
                  <p className="mt-2">
                    Chúng tôi hướng tới việc trở thành nền tảng hàng đầu trong
                    ngành cho thuê và trao đổi timeshare, giúp khách hàng trên
                    toàn thế giới dễ dàng tiếp cận và trải nghiệm những kỳ nghỉ
                    tuyệt vời.
                  </p>
                </div>
                <div className="p-4 border rounded-lg shadow-sm bg-white">
                  <h2 className="text-xl font-bold text-blue-600">Sứ mệnh</h2>
                  <p className="mt-2">
                    Sứ mệnh của chúng tôi là cung cấp dịch vụ cho thuê và trao
                    đổi timeshare chất lượng cao, đáp ứng nhu cầu đa dạng của
                    khách hàng với sự linh hoạt và sự hài lòng tối ưu.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-10 pb-20">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col justify-center">
                  <h1 className="text-2xl font-bold mb-4">Chúng tôi là ai?</h1>
                  <p className="text-gray-700">
                    Unwind được thành lập với sứ mệnh mang lại sự tiện lợi và
                    linh hoạt trong việc lựa chọn kỳ nghỉ của bạn. Chúng tôi
                    hiểu rằng mỗi người đều có những nhu cầu và mong muốn riêng
                    biệt khi đi du lịch, vì vậy chúng tôi đã xây dựng nền tảng
                    của mình để đáp ứng những nhu cầu đó một cách tối ưu.
                  </p>
                </div>
                <div className="flex justify-center items-center mt-10">
                  <img
                    src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731986631926_aboutLogo.png"
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-8">
                <div>
                  <img
                    src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731986632137_aboutService.png"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-center text-right">
                  <h1 className="text-2xl font-bold mb-4">
                    Dịch vụ của chúng tôi
                  </h1>
                  <p className="text-gray-700">
                    Chúng tôi cung cấp dịch vụ cho thuê và trao đổi timeshare,
                    giúp bạn tiết kiệm thời gian và chi phí khi tìm kiếm địa
                    điểm lưu trú lý tưởng. Với một mạng lưới các đối tác khách
                    sạn và khu nghỉ dưỡng hàng đầu, chúng tôi đảm bảo bạn có thể
                    tìm thấy những lựa chọn phong phú và đa dạng để phù hợp với
                    nhu cầu của bạn.
                  </p>
                </div>
              </div>
            </div>
            <hr className="mb-14" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <img
                  src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731986517362_service1.png"
                  className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">
                  Dịch vụ cho thuê timeshare
                </h3>
                <p>
                  Cho phép bạn thuê lại các kỳ nghỉ không sử dụng trong thời
                  gian nhất định, giúp bạn tiết kiệm chi phí mà vẫn tận hưởng sự
                  thoải mái và tiện nghi của những khu nghỉ dưỡng chất lượng
                  cao.
                </p>
              </div>
              <div>
                <img
                  src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731986518212_service2.png"
                  className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">
                  Dịch vụ trao đổi timeshare
                </h3>
                <p>
                  Cung cấp cơ hội để bạn đổi kỳ nghỉ của mình với những người
                  khác, mở rộng phạm vi lựa chọn và khám phá những điểm đến mới
                  mẻ trên toàn thế giới.
                </p>
              </div>
            </div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Nhân sự của chúng tôi</h3>
              <p>
                Nhân sự là yếu tố quan trọng nhất trong thành công của Unwind.
                Ngay từ những ngày đầu, chúng tôi đã tập trung vào việc xây dựng
                một môi trường làm việc khuyến khích sự hợp tác, nỗ lực và tìm
                kiếm niềm vui trong công việc. Chúng tôi đã đề ra các giá trị cơ
                bản như sự tôn trọng, công bằng và linh hoạt để định hình tiêu
                chuẩn ứng xử của Unwind. Những giá trị này vẫn tiếp tục được duy
                trì và phát triển khi chúng tôi đón nhận các thành viên mới và
                mở rộng mạng lưới toàn cầu, góp phần làm nên sức mạnh của đại
                gia đình Unwind.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-6">
                <div className="flex flex-col items-center mt-16">
                  <img src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731986518567_serviceLogo1.png" />
                  <h4 className="text-xl font-bold">Tôn trọng</h4>
                  <p className="text-gray-500 mt-3">
                    lẫn nhau trong môi trường đa dạng văn hóa của chúng tôi
                  </p>
                </div>
                <div className="flex flex-col items-center mt-16">
                  <img src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731986518779_serviceLogo2.png" />

                  <h4 className="text-xl font-bold">Trung thành</h4>
                  <p className="text-gray-500 mt-3">
                    với các đối tác lâu dài của chúng tôi
                  </p>
                </div>
                <div className="flex flex-col items-center mt-16">
                  <img src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731986518989_serviceLogo3.png" />

                  <h4 className="text-xl font-bold">Liêm chính và Công bằng</h4>
                  <p className="text-gray-500 mt-3">
                    trong mọi khía cạnh của hoạt động kinh doanh
                  </p>
                </div>
                <div className="flex flex-col items-center mt-10">
                  <img src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731986519197_serviceLogo4.png" />

                  <h4 className="text-xl font-bold">
                    Độ linh hoạt và Khả năng thích ứng
                  </h4>
                  <p className="text-gray-500 mt-3">
                    trong việc đáp ứng nhu cầu của khách hàng
                  </p>
                </div>
                <div className="flex flex-col items-center mt-10">
                  <img src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731986519406_serviceLogo5.png" />

                  <h4 className="text-xl font-bold">Đầu tư vào Nhân sự</h4>
                  <p className="text-gray-500 mt-3">
                    để không ngừng cải thiện nguồn lực có giá trị nhất của chúng
                    tôi
                  </p>
                </div>
                <div className="flex flex-col items-center mt-10">
                  <img src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731986519613_serviceLogo6.png" />

                  <h4 className="text-xl font-bold">Thoải mái</h4>
                  <p className="text-gray-500 mt-3">
                    khi làm việc trong vòng tay bạn bè
                  </p>
                </div>
              </div>
              <p className="mt-20">
                Chúng tôi là một đội ngũ đam mê và dày dạn kinh nghiệm, luôn coi
                trọng tinh thần hỗ trợ lẫn nhau không chỉ trong nội bộ mà còn
                với cộng đồng toàn cầu, đối tác và doanh nghiệp. Chúng tôi nỗ
                lực vượt qua mọi thách thức hiện tại để có cái nhìn toàn diện
                hơn, nhằm đáp ứng nhu cầu của khách hàng và mang đến những giải
                pháp khác biệt. Tinh thần sẵn sàng nhận trách nhiệm và linh hoạt
                trong công việc chính là yếu tố then chốt giúp Unwind thành công
                trong việc mở rộng kết nối với các đối tác và khách hàng.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default aboutUs;
