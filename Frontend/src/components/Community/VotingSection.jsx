// VotingSection.js
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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

const StyledSelect = styled(Select)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
}));

const VotingSection = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleVote = () => {
    // Placeholder for API call to handle voting
    console.log('Selected option:', selectedOption);
  };

  return (
    <StyledPaper elevation={3}>
      <StyledTypography variant="h6" component="h2">
        Energy Selling Voting
      </StyledTypography>
      <StyledSelect
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <MenuItem value="">Select an option</MenuItem>
        <MenuItem value="option1">Yes</MenuItem>
        <MenuItem value="option2">NO</MenuItem>
      </StyledSelect>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleVote}
        disabled={!selectedOption}
      >
        Vote
      </StyledButton>
    </StyledPaper>
  );
};

export default VotingSection;
