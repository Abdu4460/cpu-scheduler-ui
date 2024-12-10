import "./App.css";
import { Container, Grid2, Box } from "@mui/material";
import { useState } from "react";
import StepOne from "./Components/Forms/StepOne";
import StepTwo from "./Components/Forms/StepTwo";
import Final from "./Components/Forms/Final";

function App() {
  // State for steps
  const [step, setStep] = useState(1);

  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
  });

  // Function to go to the next step
  const nextStep = () => setStep(step + 1);

  // Function to go to the previous step
  const prevStep = () => setStep(step - 1);

  // Handling form input data
  const handleInputData = (input) => (e) => {
    const { value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  // Render form steps with Material-UI layout
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Box mt={5}>
          <Grid2 container justifyContent="center">
            <Grid2 item xs={12}>
              {step === 1 && (
                <StepOne
                  nextStep={nextStep}
                  handleFormData={handleInputData}
                  values={formData}
                />
              )}

              {step === 2 && (
                <StepTwo
                  nextStep={nextStep}
                  prevStep={prevStep}
                  handleFormData={handleInputData}
                  values={formData}
                />
              )}

              {step === 3 && <Final values={formData} />}
            </Grid2>
          </Grid2>
        </Box>
      </Container>
    </div>
  );
}

export default App;