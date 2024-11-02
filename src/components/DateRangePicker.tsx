import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Props = {
  onDateChange: (start: string, end: string) => void;
  show: boolean;
};

type RangeKeyDict = {
  selection: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
};

const DateRangePicker: React.FC<Props> = ({ onDateChange, show }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    setRange([ranges.selection]);
    onDateChange(
      startDate.toISOString().split("T")[0],
      endDate.toISOString().split("T")[0]
    );
  };

  return (
    <>
      {!show ? (
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 max-w-md ">
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={range}
            className="text-sm"
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DateRangePicker;
