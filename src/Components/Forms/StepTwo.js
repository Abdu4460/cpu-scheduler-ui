import React from "react";
import { Card, TextField, Button, Box, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Form validation schema using Yup
const validationSchema = Yup.object({
  age: Yup.number()
    .typeError("Age must be a number")
    .required("This is a required field")
    .positive("Age must be positive")
    .integer("Age must be an integer"),
  email: Yup.string()
    .email("Invalid email format")
    .required("This is a required field"),
});

const StepTwo = ({ nextStep, handleFormData, prevStep, values }) => {
  // Function to handle form submission
  const onSubmit = (formValues) => {
    handleFormData("age")({ target: { value: formValues.age } });
    handleFormData("email")({ target: { value: formValues.email } });
    nextStep();
  };

  return (
    <Box mt={10} display="flex" justifyContent="center">
      <Card variant="outlined" sx={{ maxWidth: 500, p: 3 }}>
        <Typography variant="h5" mb={2}>
          Step Two
        </Typography>
        <Formik
          initialValues={{
            age: values.age || "",
            email: values.email || "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="age"
                  type="number"
                  label="Age"
                  fullWidth
                  error={touched.age && !!errors.age}
                  helperText={<ErrorMessage name="age" />}
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  fullWidth
                  error={touched.email && !!errors.email}
                  helperText={<ErrorMessage name="email" />}
                />
              </Box>
              <Box display="flex" justifyContent="space-between" mt={3}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={prevStep}
                >
                  Previous
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default StepTwo;