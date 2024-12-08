import axiosConfig from "../../util/axiosCustomize/axiosConfig"

const subcribeToken = async (token, topic) => {
    try {
      // Gửi params thông qua URL, đồng thời gửi token trong header
      const response = await axiosConfig.post(
        `notification/staff/subscribe-token`, 
        null, // Không cần body vì params sẽ được gửi qua URL
        {
          params: {
            token, // Gửi token như một tham số trong URL
            topic, // Gửi topic vào URL dưới dạng params
          }
        }
      );
      return response;
    } catch (error) {
      console.error("Subscription failed:", error);
      return error.response ? error.response : error;
    }
  };

const getNotificationTopic = async (topic, title, body) => {
    try {
        
        const response = await axiosConfig.get(`notification/send-notification/topic`, {
            params: {
                topic,
                title,
                body,
            },
        });
        console.log(response)
        return response;
    } catch (error) {
        console.error("Error sending notification:", error);
    }
};

export {
    subcribeToken,
    getNotificationTopic
}