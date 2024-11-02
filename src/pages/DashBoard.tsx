import { useState } from "react";
import DateRangePicker from "../components/DateRangePicker";
import TimeSeriesChart from "../components/TimeSeriesChart";
import ColumnChart from "../components/ColoumnChart";
import SparklineChart from "../components/SparklineChart";
import { fetchBookings } from "../services/ApiSrvices";

const DashBoard = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [data, setData] = useState<[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      loadData(start, end);
    }
    console.log({ startDate, endDate });
  };

  const loadData = async (start: string, end: string) => {
    try {
      const responseData = await fetchBookings(start, end);
      console.log("Fetched Data:", responseData.data);
      setData(responseData.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-around items-center">
        <button
          className="flex justify-start mb-8 border-2 py-1 px-8 rounded-lg bg-[#3b444b] text-white hover:bg-white hover:border-[#3b444b] hover:text-[#3b444b]"
          onClick={() => setShow(!show)}
        >
          {show === true ? "filter" : "close filter"}
        </button>
        <DateRangePicker onDateChange={handleDateChange} show={show} />
      </div>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 ">
          <div className="bg-white shadow-lg rounded-lg p-4  hover:scale-110 hover:duration-500">
            <TimeSeriesChart data={data} />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 hover:scale-110 hover:duration-500">
            <ColumnChart data={data} />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 hover:scale-110 hover:duration-500">
            <SparklineChart
              data={data}
              type="adults"
              title="Total Adult Visitors"
            />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 hover:scale-110 hover:duration-500">
            <SparklineChart
              data={data}
              type="children"
              title="Total Children Visitors"
            />
          </div>
        </div>
      ) : (
        <p>Please select a date range to view data.</p>
      )}
    </div>
  );
};

export default DashBoard;
