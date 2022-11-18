/** @format */

import React from "react";

import { Table, Input } from "antd";
const { Search } = Input;
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
  },
];

function Item5() {
  const [filterInput, setFilterInput] = React.useState("");
  const filterData = () => {
    if (filterInput === "") return data;

    if (isNaN(filterInput)) {
      return data.filter(({ name }) => name.includes(filterInput));
    }
    return data.filter(({ age }) => age === +filterInput);
  };

  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        size="large"
        onSearch={setFilterInput}
      />
      <br />
      <br /> <br />
      <Table columns={columns} dataSource={filterData()} />
    </div>
  );
}
export default Item5;
