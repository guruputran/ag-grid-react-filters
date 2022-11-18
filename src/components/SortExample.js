/** @format */

import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const SortExample = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      setRowData(data);
    };

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));

    var defaultSortModel = [
      {
        colId: "country",
        sort: "asc",
        sortIndex: 0,
      },
      {
        colId: "athlete",
        sort: "asc",
        sortIndex: 1,
      },
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        id="myGrid"
        style={{
          height: "100%",
          width: "100%",
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          defaultColDef={{
            width: 170,
            sortable: true,
          }}
          multiSortKey={"ctrl"}
          onGridReady={onGridReady}
          rowData={rowData}
        >
          <AgGridColumn field="athlete" />
          <AgGridColumn field="age" width={100} />
          <AgGridColumn field="country" />
          <AgGridColumn field="year" width={100} />
          <AgGridColumn field="date" />
          <AgGridColumn field="sport" />
          <AgGridColumn field="gold" />
          <AgGridColumn field="silver" />
          <AgGridColumn field="bronze" />
          <AgGridColumn field="total" />
        </AgGridReact>
      </div>
    </div>
  );
};

export default SortExample;
