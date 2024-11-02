import axios from "axios";

export const fetchBookings = async (startDate: string, endDate: string) => {
  try {
    const response = await axios.get(
      `https://backend-apexchart.onrender.com/api/bookings?startDate=${startDate}&endDate=${endDate}`
    );
    if (response.data.success) {
      console.log(response.data.data);
      return response.data;
    } else {
      return console.error(response);
    }
  } catch (error) {
    console.error(error);
  }
};
