import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
}));

const SolarPlantInvestment = () => {
  const [investmentAmount, setInvestmentAmount] = useState('');

  const handleInvestment = () => {
    // Placeholder for API call to handle investment
    console.log('Investment amount:', investmentAmount);
  };

  return (
    <StyledPaper elevation={3}>
      <StyledTypography variant="h6" component="h2">
        Invest in Solar Plant
      </StyledTypography>
      <StyledTextField
        label="Investment Amount"
        variant="outlined"
        value={investmentAmount}
        onChange={(e) => setInvestmentAmount(e.target.value)}
        fullWidth
      />
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleInvestment}
        fullWidth
      >
        Invest Now
      </StyledButton>
    </StyledPaper>
  );
};

export default SolarPlantInvestment;
