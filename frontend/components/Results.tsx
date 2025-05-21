import React from "react";
import DataTable from './DataTable';

interface ResultsProps {
  forecastResult: any;
  onExport: () => void;
}

const forecastResult = {
  columns: ["Date", "Actual", "Inflow+1", "Inflow+2"],
  data: [
    { Date: "2025-01-01", Actual: 100, "Inflow+1": 110, "Inflow+2": 120 },
    { Date: "2025-01-02", Actual: 105, "Inflow+1": 115, "Inflow+2": 125 },
  ],
};


const Results: React.FC<ResultsProps> = ({ forecastResult, onExport }) => {
  return (
    <div
      style={{
        flexBasis: "70%",
        padding: 20,
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <h2>Results</h2>
      <div
        style={{
          height: 300,
          border: "1px solid #ccc",
          marginBottom: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#999",
        }}
      >
        [Graph Placeholder]
      </div>
      <div
        style={{
          maxHeight: 300,
          overflowY: "auto",
          border: "1px solid #ccc",
        }}
      >
        {forecastResult && forecastResult.columns && forecastResult.data ? (
          <DataTable columns={forecastResult.columns} data={forecastResult.data} />
        ) : (
          <p style={{ padding: 10 }}>No result data available</p>
        )}
      </div>
      <button
        onClick={onExport}
        style={{ marginTop: 20 }}
        disabled={!forecastResult}
      >
        Export Result
      </button>
    </div>
  );
};

export default Results;
