import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios";

const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.user_details,
    });
    // console.log('response', response);
    // console.log('response-data', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserDetails;
