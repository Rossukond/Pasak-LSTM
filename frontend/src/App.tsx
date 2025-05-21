import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Results from "../components/Results";
import { Box } from "@radix-ui/themes";


const App = () => {
  return (
    <Box 	py="8"
	style={{ backgroundColor: "var(--gray-a2)", borderRadius: "var(--radius-3)" }}>
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div
        style={{
          background: "#0072c6",
          padding: "1rem",
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "bold",
          flexShrink: 0,
        }}
      >
        Water Volume Forecasting
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Sidebar */}
        <div
          style={{
            width: "30%",
            backgroundColor: "#f5f5f5",
            padding: "1rem",
            boxShadow: "inset -1px 0px 0px #ccc",
            overflowY: "auto",
          }}
        >
          <Sidebar />
        </div>

        {/* Main Output */}
        <div
          style={{
            width: "70%",
            padding: "2rem",
            overflowY: "auto",
            backgroundColor: "#fafafa",
          }}
        >
          <h2 style={{ textAlign: "center", fontWeight: "bold" }}>OUTPUT</h2>
          <Results/>
        </div>
      </div>
    </div>
    </Box>
  );
};

export default App;
