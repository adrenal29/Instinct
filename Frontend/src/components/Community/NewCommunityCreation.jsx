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

const NewCommunityCreation = () => {
  const [communityName, setCommunityName] = useState('');
  const [numMembers, setNumMembers] = useState('');
  const [memberShares, setMemberShares] = useState('');

  const handleCreateCommunity = () => {
    // Placeholder for API call to create a new community
    console.log('Creating new community:', communityName);
    console.log('Number of members:', numMembers);
    console.log('Member shares:', memberShares);

    // Reset the input fields after creation
    setCommunityName('');
    setNumMembers('');
    setMemberShares('');
  };

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h6" component="h2">
        Create a New Community
      </Typography>
      <TextField
        label="Community Name"
        variant="outlined"
        value={communityName}
        onChange={(e) => setCommunityName(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Number of Members"
        variant="outlined"
        value={numMembers}
        onChange={(e) => setNumMembers(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Member Shares (%)"
        variant="outlined"
        value={memberShares}
        onChange={(e) => setMemberShares(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateCommunity}
        fullWidth
      >
        Create
      </Button>
    </StyledPaper>
  );
};

export default NewCommunityCreation;
