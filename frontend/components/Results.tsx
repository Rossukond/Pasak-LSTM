import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from "recharts";
import DataTable from './DataTable';

interface ResultsProps {
  forecastResult: any;
  onExport: () => void;
}


const Results: React.FC<ResultsProps> = ({ forecastResult, onExport }) => {
  const day = 1; // สมมุติว่าแสดงเฉพาะวันที่ 1
  const trainData = forecastResult?.train_results?.[day] ?? [];
  const testData = forecastResult?.test_results?.[day] ?? [];

  // รวมข้อมูลเพื่อใช้กับ LineChart
  const chartData = [...trainData.map((d: any) => ({
    date: d.date,
    Train_Actual: d["Inflow, cms+1"],
    Train_Pred: d["Pred Inflow, cms+1"]
  })), ...testData.map((d: any) => ({
    date: d.date,
    Test_Actual: d["Inflow, cms+1"],
    Test_Pred: d["Pred Inflow, cms+1"]
  }))];

  // ดึง Metrics มาแสดงในตาราง
  const metrics = forecastResult?.all_results?.find((d: any) => d.day === day);

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

      {/* Chart */}
      <div style={{ height: 300, marginBottom: 20 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Train_Actual" stroke="#8884d8" dot={false} />
            <Line type="monotone" dataKey="Train_Pred" stroke="#82ca9d" dot={false} />
            <Line type="monotone" dataKey="Test_Actual" stroke="#ffa500" dot={false} />
            <Line type="monotone" dataKey="Test_Pred" stroke="#ff0000" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics */}
      <h3>Metrics</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th></th>
            <th>NSE</th>
            <th>R</th>
            <th>RMSE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Train</td>
            <td>{metrics?.train?.NSE?.toFixed(2)}</td>
            <td>{metrics?.train?.R?.toFixed(2)}</td>
            <td>{metrics?.train?.RMSE?.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Test</td>
            <td>{metrics?.test?.NSE?.toFixed(2)}</td>
            <td>{metrics?.test?.R?.toFixed(2)}</td>
            <td>{metrics?.test?.RMSE?.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Data Table */}
      <div style={{ maxHeight: 300, overflowY: "auto", border: "1px solid #ccc", marginTop: 20 }}>
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
