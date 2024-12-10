import React from "react";
import { Card, TextField, Button, Box, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Form validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required("This is a required field"),
  lastName: Yup.string().required("This is a required field"),
});

const StepOne = ({ nextStep, values, handleFormData }) => {
  // Function to handle form submission
  const onSubmit = (formValues) => {
    handleFormData("firstName")({ target: { value: formValues.firstName } });
    handleFormData("lastName")({ target: { value: formValues.lastName } });
    nextStep();
  };

  return (
    <Box mt={10} display="flex" justifyContent="center">
      <Card variant="outlined" sx={{ maxWidth: 500, p: 3 }}>
        <Typography variant="h5" mb={2}>
          Step One
        </Typography>
        <Formik
          initialValues={{
            firstName: values.firstName || "",
            lastName: values.lastName || "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="firstName"
                  label="First Name"
                  fullWidth
                  error={touched.firstName && !!errors.firstName}
                  helperText={<ErrorMessage name="firstName" />}
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  error={touched.lastName && !!errors.lastName}
                  helperText={<ErrorMessage name="lastName" />}
                />
              </Box>
              <Box textAlign="right">
                <Button type="submit" variant="contained" color="primary">
                  Continue
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default StepOne;