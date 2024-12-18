import axiosConfig from "../../util/axiosCustomize/axiosConfig"

const subcribeToken = async (token, topic) => {
  try {
  
    const response = await axiosConfig.post(
      `notification/staff/subscribe-token`,
      null, 
      {
        params: {
          token, 
          topic, 
        }
      }
    );
    return response;
  } catch (error) {
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
    return response;
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

const getNotificationByTopic = async (topic, pageNo, pageSize) => {
  try {
    const response = await axiosConfig.get(`notification/topic`, {
      params: {
        topic,
        pageSize,
        pageNo
      }
    })
    return response;
  } catch (error) {
    console.error("Error geting notification: ", error)
  }
}

const markReadById = async (notiId) => {
  try {
    const response = await axiosConfig.post(`notification/mark-read/${notiId}`, {
    })
    return response
  } catch (error) {
    console.error("Error")
  }
}

const markReadByTopic = async (topic) => {
  try {
    const response = await axiosConfig.post(`notification/mark-read/all/topic`, {}, {
      params: {
        topic
      }
    })
    return response
  } catch (error) {
    console.error("Error")
  }
}

export {
  subcribeToken,
  getNotificationTopic,
  getNotificationByTopic,
  markReadById,
  markReadByTopic
}