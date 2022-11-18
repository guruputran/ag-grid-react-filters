/** @format */

import React, { useCallback, useMemo, useRef, useState } from "react";
import rawData from "./data.js";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const getMedalString = function ({ gold, silver, bronze }) {
  const goldStr = gold > 0 ? `Gold: ${gold} ` : "";
  const silverStr = silver > 0 ? `Silver: ${silver} ` : "";
  const bronzeStr = bronze > 0 ? `Bronze: ${bronze}` : "";
  return goldStr + silverStr + bronzeStr;
};

const MedalRenderer = function (params) {
  return getMedalString(params.value);
};

const Globals = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(rawData);
  const [columnDefs, setColumnDefs] = useState([
    // simple column, easy to understand
    { field: "name" },
    // the grid works with embedded fields
    { headerName: "Age", field: "person.age" },
    // or use value getter, all works with quick filter
    { headerName: "Country", valueGetter: "data.person.country" },
    // or use the object value, so value passed around is an object
    {
      headerName: "Results",
      field: "medals",
      cellRenderer: MedalRenderer,
      // this is needed to avoid toString=[object,object] result with objects
      getQuickFilterText: (params) => {
        return getMedalString(params.value);
      },
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      //   editable: true,
    };
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <input
            type="text"
            id="filter-text-box"
            placeholder="Search..."
            onInput={onFilterTextBoxChanged}
          />
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            cacheQuickFilter={true}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default Globals;
