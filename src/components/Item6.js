/** @format */

import React, { useState } from "react";

import { Table } from "antd";

function Item5() {
  const [dataSource, setDataSource] = useState([
    { name: "John", age: 25, country: "USA" },
    { name: "Doe", age: 45, country: "Singapore" },
    { name: "Mary", age: 35, country: "India" },
    { name: "Chaplin", age: 23, country: "USA" },
    { name: "Danny", age: 61, country: "India" },
  ]);
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Age", dataIndex: "age" },
    { title: "Country", dataIndex: "country" },
  ];
  const data = [];
  return (
    <div>
      <Table columns={columns} dataSource={dataSource}></Table> ;
    </div>
  );
}
export default Item5;
