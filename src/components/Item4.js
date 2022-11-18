/** @format */

import React, { useState } from "react";
import rawData from "./data.js";
import { Table, Input } from "antd";

const baseColumns = [
  {
    title: "Name",
    dataIndex: "Name",
    key: "name",
  },
  {
    title: "Company",
    dataIndex: "Company",
    key: "company",
  },
  {
    title: "Email",
    dataIndex: "Email",
    key: "email",
  },
  {
    title: "City",
    dataIndex: "City",
    key: "city",
  },
  {
    title: "Salary",
    dataIndex: "Salary",
    key: "salary",
  },
  {
    title: "Enable",
    dataIndex: "Enable",
    key: "enable",
  },
  {
    title: "EnterDate",
    dataIndex: "EnterDate",
    key: "enterdate",
  },
  {
    title: "Personal",
    dataIndex: "Personal",
    key: "personal",
  },
];

const Item4 = () => {
  const [dataSource, setDataSource] = useState(rawData);
  const [value, setValue] = useState("");
  return (
    <div>
      <Input
        placeholder="Search Name"
        value={value}
        onChange={(e) => {
          const currValue = e.target.value;
          setValue(currValue);
          const filteredData = rawData.filter((entry) =>
            entry.includes(currValue)
          );
          setDataSource(filteredData);
        }}
      />
      <Table
        rowKey="Name"
        columns={baseColumns}
        dataSource={rawData}
        bordered
      />
    </div>
  );
};

export default Item4;
