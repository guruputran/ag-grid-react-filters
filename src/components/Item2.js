/** @format */

import { Button, Space, Table } from "antd";
import React, { useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
const data = [
  {
    key: "1",
    name: "Donkey Zebra",
    age: 31,
    country: "Malaysia",
    reg_date: "01-Nov-2022",
  },
  {
    key: "2",
    name: "Babloo Akash",
    age: 32,
    country: "Singapore",
    reg_date: "01-Oct-2022",
  },
  {
    key: "3",
    name: "Cindy Tom",
    age: 33,
    country: "Thailand",
    reg_date: "11-Nov-2022",
  },
  {
    key: "4",
    name: "Anoop Kumar",
    age: 34,
    country: "India",
    reg_date: "21-Oct-2022",
  },
];

const Item2 = () => {
  const { RangePicker } = DatePicker;
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [dateRange, setDateRange] = useState(["", ""]);
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setDateRange(["", ""]);
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      filters: [
        {
          text: "Singapore",
          value: "Singapore",
        },
        {
          text: "Malaysia",
          value: "Malaysia",
        },
      ],
      filteredValue: filteredInfo.country || null,
      onFilter: (value, record) => record.country.includes(value),
      sorter: (a, b) => a.country.localeCompare(b.country),
      sortOrder: sortedInfo.columnKey === "country" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Reg Date",
      dataIndex: "reg_date",
      key: "reg_date",
      sorter: {
        compare: (a, b) =>
          moment(a.reg_date, "DD-MMM-YYYY") - moment(b.reg_date, "DD-MMM-YYYY"),
      },
      sortOrder: sortedInfo.columnKey === "reg_date" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
  return (
    <>
      <Space direction="vertical" size={12}>
        <RangePicker
          value={dateRange}
          format={"DD-MMM-YYYY"}
          onChange={(range) => {
            console.log(range);
            setDateRange(range);
          }}
        />
      </Space>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={clearAll}>Reset</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        pagination={{
          defaultPageSize: 2,
          // showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />
    </>
  );
};
export default Item2;
