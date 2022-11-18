/** @format */

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("-");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

function Dates() {
  const gridRef = useRef();
  // const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  // const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const searchRef = useRef(null);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000, date: "09-11-2022" },
    { make: "Ford", model: "Mondeo", price: 32000, date: "11-11-2022" },
    { make: "Porsche", model: "Boxter", price: 72000, date: "10-11-2022" },
    { make: "Mers", model: "Mers", price: 92000, date: "12-11-2022" },
  ];

  const columns = [
    {
      headerName: "Make",
      field: "make",
      filter: "agDateColumnFilter",
    },
    {
      headerName: "Price",
      field: "price",
      filter: "agDateColumnFilter",
    },
    {
      headerName: "Model",
      field: "model",
      filter: "agDateColumnFilter",
    },
    {
      headerName: "Date",
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
    },
  ];
  const defColumnDefs = { flex: 1, sortable: true, suppressMenu: true };

  const onGridReady = (params) => {
    setGridApi(params);
    setGridColumnApi(params.columnApi);
  };
  const getFilterType = () => {
    if (startDate !== "" && endDate !== "") return "inRange";
    else if (startDate !== "") return "equals";
    else if (endDate !== "") return "equals";
  };
  const resetMe = () => {
    setStartDate("");
    setEndDate("");
    searchRef.current.value = "";
    onFilterTextBoxChanged();
  };
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);
  useEffect(() => {
    if (gridApi) {
      if (startDate !== "" && endDate !== "" && startDate > endDate) {
        alert("Start Date should be before End Date");
        setEndDate("");
      } else {
        var dateFilterComponent = gridApi.api.getFilterInstance("date");
        dateFilterComponent.setModel({
          type: getFilterType(),
          dateFrom: startDate ? startDate : endDate,
          dateTo: endDate,
        });
        gridApi.api.onFilterChanged();
      }
    }
  }, [startDate, endDate]);
  return (
    <div className="App">
      <div className="example-header">
        <input
          type="text"
          id="filter-text-box"
          placeholder="Search..."
          onInput={onFilterTextBoxChanged}
          ref={searchRef}
        />
      </div>
      <h2 align="center">Ag Grid with React</h2>
      <p align="center">Date Range Filtering </p>
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <span>
          From :{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          To :
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button className="btn btn-primary btn-sm m-2" onClick={resetMe}>
            Reset
          </button>
        </span>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defColumnDefs}
          onGridReady={onGridReady}
          cacheQuickFilter={true}
        />
      </div>
    </div>
  );
}

export default Dates;
