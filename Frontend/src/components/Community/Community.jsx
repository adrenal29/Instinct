import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SolarPlantInvestment from './SolarPlantInvestment';
import VotingSection from './VotingSection';
import RevenueSharing from './RevenueSharing';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/system';
import NewCommunityCreation from './NewCommunityCreation';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const CommunitySection = () => {
  const [viewExisting, setViewExisting] = useState(true);

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <FormControlLabel
              control={
                <Switch
                  checked={viewExisting}
                  onChange={() => setViewExisting(!viewExisting)}
                  color="primary"
                />
              }
              label={viewExisting ? 'View Existing' : 'Create New'}
            />
            {viewExisting ? (
              <>
                <SolarPlantInvestment />
                <VotingSection />
                <RevenueSharing />
              </>
            ) : (
                <>
                <NewCommunityCreation/>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setViewExisting(true)}
              >
                View Existing Community
              </Button>
              
              </>
            )}
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CommunitySection;
