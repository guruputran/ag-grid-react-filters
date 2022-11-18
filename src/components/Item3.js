/** @format */

import React, { useState } from "react";
import "antd/dist/antd.css";
import { DatePicker } from "antd";
import moment from "moment";

export default function Item3() {
  const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState(["", ""]);
  function resetMe() {
    setDateRange(["", ""]);
  }
  return (
    <div
      style={{
        display: "block",
        width: 700,
        padding: 30,
      }}
    >
      <h4>ReactJS Ant-Design DatePicker Component</h4>
      <>
        <DatePicker onChange={(date) => console.log(date._d)} />
        <RangePicker
          value={dateRange}
          format={"DD-MMM-YYYY"}
          onChange={(range) => {
            console.log(range);
            setDateRange(range);
          }}
        />
        <button type="button" className="btn btn-default" onClick={resetMe}>
          ResetMe
        </button>
      </>
    </div>
  );
}
