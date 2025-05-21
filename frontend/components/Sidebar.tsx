import { Box } from "@radix-ui/themes";
import React, { useState } from "react";
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [forecastDays, setForecastDays] = useState<number | "">("");
  const [uploadMessage, setUploadMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const [outputOptions, setOutputOptions] = useState({
    chart: true,
    dataTable: false,
    metrics: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setUploadMessage(null);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setOutputOptions(prev => ({ ...prev, [name]: checked }));
  };

const handleForecastDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const val = e.target.value;
  if (val === "") {
    setForecastDays("");
    return;
  }
  const num = parseInt(val, 10);
  if (num >= 1 && num <= 7) {
    setForecastDays(num);
  }
};


  const validateInputs = () => {
    if (!selectedFile) {
      setUploadMessage({ type: 'error', text: "Please select a CSV file before submitting." });
      return false;
    }
    if (!forecastDays) {
      setUploadMessage({ type: 'error', text: "Please enter number of forecast days (1-7)." });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    const formData = new FormData();
    formData.append("file", selectedFile as Blob);
    formData.append("forecastDays", forecastDays.toString());
    formData.append("outputOptions", JSON.stringify(outputOptions));
    formData.append("epochsPerDay", JSON.stringify(Array(forecastDays).fill(20)));
    formData.append("featureColumns", JSON.stringify(['Rainfall, mm.', 'S.3', 'S.4B', 'S.42', 'S.14']));

  console.log(forecastDays);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json(); 
        setUploadResult(data);
        console.log("Data: ",data);
        
        setUploadMessage({ type: 'success', text: "File and data uploaded successfully!" });
      } else {
        const errorText = await response.text();
        setUploadMessage({ type: 'error', text: `Upload failed: ${errorText}` });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadMessage({ type: 'error', text: "Error uploading data." });
    }
  };

  return (
    <div>
      {/* UPLOAD SECTION */}
      <Box className={styles.upload}>
        <h2 className={styles.sectionTitle}>UPLOAD</h2>
        <div className={styles.uploadText}>
          <label htmlFor="file_input" className={styles.fileLabel}>
            Select CSV File
          </label>
          <input
            type="file"
            id="file_input"
            accept=".csv"
            className="fileInput"
            onChange={handleFileChange}
          />
          {uploadMessage && (
            <p
              style={{
                color: uploadMessage.type === 'error' ? "red" : "green",
                marginTop: 5,
              }}
            >
              {uploadMessage.text}
            </p>
          )}
        </div>
      </Box>

      {/* SETTINGS SECTION */}
      <Box className={styles.setting}>
        <div>
          <h3 className={styles.sectionSubtitle}>Forecast Days</h3>
          <input
            type="number"
            min={1}
            max={7}
            placeholder="Enter number of days"
            className={styles.forecastInput}
            value={forecastDays}
            onChange={handleForecastDaysChange}
          />
        </div>

        <div className={styles.checkboxGroup}>
          <h3 className={styles.sectionSubtitle}>Select Output</h3>
          <label>
            <input
              type="checkbox"
              name="chart"
              checked={outputOptions.chart}
              onChange={handleCheckboxChange}
            /> Chart
          </label>
          <label>
            <input
              type="checkbox"
              name="dataTable"
              checked={outputOptions.dataTable}
              onChange={handleCheckboxChange}
            /> Data Table
          </label>
          <label>
            <input
              type="checkbox"
              name="metrics"
              checked={outputOptions.metrics}
              onChange={handleCheckboxChange}
            /> Metrics (R, RMSE, NSE)
          </label>
        </div>
      </Box>

      {/* SUBMIT BUTTON */}
      <Box className={styles.submitBox}>
        <button
          className={styles.submitButton}
          onClick={handleSubmit}
          style={{ cursor: "pointer" }}
        >
          Submit
        </button>
      </Box>
    </div>
  );
};

export default Sidebar;
