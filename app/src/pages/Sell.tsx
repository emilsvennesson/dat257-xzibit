import React from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  Grow,
  TextField,
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import BookInformation from '../components/BookInformation';

const steps = ['Find your book', 'Check information', 'Specify condition'];
/**
 * Selling page, in this window the user is able to upload a book to the selling page
 * @returns Sell page
 */
export default function Sell() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const checkInformationWindow = (
    <Box
      bgcolor="white"
      borderRadius={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={2}
    >
      <Stack direction="row" alignItems="left" width="100%">
        <Button
          variant="contained"
          disabled={activeStep !== 1}
          onClick={() => handleBack()}
        >
          {'<-'}
        </Button>
        <Typography
          textAlign="center"
          variant="h5"
          fontWeight="bold"
          flexGrow={5}
        >
          Is this information correct
        </Typography>
      </Stack>
      <BookInformation
        name="Mattematisk statistik"
        edition="4th"
        year="1992"
        ISBN="11111222223333"
        course="Mattematisk statistik och descret mattematik"
      />
      <Stack direction="row" spacing={2}>
        <Button disabled={activeStep !== 1} variant="contained" size="large">
          Redigera
        </Button>
        <Button
          disabled={activeStep !== 1}
          variant="contained"
          size="large"
          onClick={() => {
            handleNext();
          }}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  );

  const startedWindow = (
    <Stack
      bgcolor="white"
      direction="column"
      alignItems="center"
      width="400px"
      padding={2}
      borderRadius={2}
      spacing={2}
    >
      <Stack direction="row" width="100%" alignContent="left">
        <Button
          variant="contained"
          disabled={activeStep !== 2}
          onClick={() => handleBack()}
        >
          {'<-'}
        </Button>
        <Typography textAlign="center" variant="h5" flexGrow={2}>
          Condition
        </Typography>
        <Box flexGrow={1} />
      </Stack>

      <FormControlLabel label="Torn" control={<Checkbox />} />
      <FormControlLabel label="Good" control={<Checkbox />} />
      <FormControlLabel label="Mint" control={<Checkbox />} />
      <TextField label="describe the quality" />
      <Button variant="contained" size="large" onClick={() => handleNext()}>
        Finish
      </Button>
    </Stack>
  );

  return (
    <Stack padding="2%" bgcolor="#C4C4C4" direction="column" spacing={2}>
      {/** Title */}
      <Box bgcolor="white" borderRadius="8px" padding={5} flexGrow={3}>
        <Typography variant="h3" margin="30px">
          Sell your book
        </Typography>
        <Typography variant="h6" margin="20px">
          If you want to publish an add for your book there are three steps you
          need to go trough. First you need to fill out the ISBN number in order
          for us to know wich book you want to sell
        </Typography>
      </Box>
      <Box bgcolor="white" padding={2} borderRadius={2}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            return (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      {/** Wizard */}
      <Stack direction="row" width="100%" spacing={1}>
        {/** Search ISBN */}
        <Stack
          flexGrow={4}
          bgcolor="white"
          alignItems="center"
          spacing={5}
          padding={2}
          paddingTop={5}
          borderRadius={2}
        >
          <Typography variant="h2">Get started</Typography>
          <TextField disabled={activeStep !== 0} label="ISBN-number" />
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              handleNext();
            }}
            disabled={activeStep !== 0}
          >
            {'Get started ->'}
          </Button>
        </Stack>

        {/** Check information */}
        <Grow in={activeStep > 0}>{checkInformationWindow}</Grow>

        {/** Set quality */}
        <Grow in={activeStep > 1}>{startedWindow}</Grow>
      </Stack>
    </Stack>
  );
}
