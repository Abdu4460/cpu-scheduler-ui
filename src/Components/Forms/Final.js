import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Card, CardContent, Typography, Box } from "@mui/material";

const Final = ({ values }) => {
  const [responseData, setResponseData] = useState({
    "results": {},
    "statistics": {}
  });
  const hasFetched = useRef(false); // Ref to track API call status
  const { algorithmName, priority, quantum, tasks } = values;

  const sendDataToApi = async () => {
    try {
      const payload = {
        algorithmName,
        priority,
        quantum,
        tasks,
      };

      console.log("Sending data to API:", payload);

      const response = await axios.post("http://localhost:8080/submit-tasks", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponseData(response.data);
      console.log("API Response:", response.data);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error sending data to API:", error);
      alert("Failed to submit data.");
    }
  };

  useEffect(() => {
    sendDataToApi();
  }, []);

  return (
    <Box mt={10} display="flex" justifyContent="center">
      <Card variant="outlined" sx={{ maxWidth: 500, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Final Details
          </Typography>

          <Typography variant="body1">
            <strong>Algorithm Name:</strong> {algorithmName}
          </Typography>

          <Typography variant="body1">
            <strong>Priority:</strong> {priority ? "Ascending" : "Descending"}
          </Typography>

          <Typography variant="body1">
            <strong>Quantum:</strong> {quantum}
          </Typography>

          <Typography variant="body1">
            <strong>Tasks:</strong>
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>
                  <strong>Name:</strong> {task.name}, <strong>Priority Level:</strong>{" "}
                  {task.priorityLevel}, <strong>Burst:</strong> {task.burst},{" "}
                  <strong>Arrival Time:</strong> {task.arrivalTime}
                </li>
              ))}
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Final;
