import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableRow,
  List,
  ListItem,
} from "@mui/material";
import _ from "lodash";

const Final = ({ values }) => {
  const [responseData, setResponseData] = useState({
    results: [],
    statistics: {},
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

      const response = await axios.post(
        "http://localhost:8080/submit-tasks",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponseData(response.data);
      console.log("API Response:", response.data);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error sending data to API:", error);
      alert("Failed to submit data.");
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      sendDataToApi();
    }
  }, []);

  return (
    <Box mt={10} display="flex" justifyContent="center">
      <Card variant="outlined" sx={{ maxWidth: 500, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Task Execution Table
          </Typography>
          {/* Tasks */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Task Name</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Burst</TableCell>
                  {algorithmName === "RR" ? (
                    <TableCell>Quantum Duration</TableCell>
                  ) : null}
                  <TableCell>Time Elapsed</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {responseData.results.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell>{task.taskName}</TableCell>
                    <TableCell>{task.priority}</TableCell>
                    <TableCell>{task.burst}</TableCell>
                    {algorithmName === "RR" ? (
                      <TableCell>{task.duration}</TableCell>
                    ) : null}
                    <TableCell>{task.timeElapsed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography sx={{ marginTop: '30px' }}>Statistics for the {algorithmName} Scheduler</Typography>
          <List sx={{ listStyleType: "disc" }}>
            {Object.entries(responseData.statistics).map(
              ([key, value], index) => (
                <ListItem key={index} style={{ display: "list-item" }}>
                  <strong>{_.startCase(key)}</strong>:{" "}
                  {Math.round(value * 100) / 100}ms
                </ListItem>
              )
            )}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Final;
