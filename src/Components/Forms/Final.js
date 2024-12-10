import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const Final = ({ values }) => {
  // Destructuring the object from values
  const { firstName, lastName, age, email } = values;

  return (
    <Box mt={10} display="flex" justifyContent="center">
      <Card variant="outlined" sx={{ maxWidth: 500, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Final Details
          </Typography>

          <Typography variant="body1">
            <strong>First Name:</strong> {firstName}
          </Typography>

          <Typography variant="body1">
            <strong>Last Name:</strong> {lastName}
          </Typography>

          <Typography variant="body1">
            <strong>Age:</strong> {age}
          </Typography>

          <Typography variant="body1">
            <strong>Email:</strong> {email}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Final;
