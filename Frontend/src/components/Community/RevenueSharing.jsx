// RevenueSharing.js
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
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

const StyledListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const RevenueSharing = () => {
  const revenueData = [
    { investor: 'Investor 1', share: 30 },
    { investor: 'Investor 2', share: 20 },
    { investor: 'Investor 3', share: 50 },
  ];

  return (
    <StyledPaper elevation={3}>
      <StyledTypography variant="h6" component="h2">
        Revenue Sharing
      </StyledTypography>
      <List>
        {revenueData.map((item, index) => (
          <StyledListItem key={index} disableGutters divider>
            <ListItemText
              primary={`${item.investor}: ${item.share}% share`}
            />
          </StyledListItem>
        ))}
      </List>
    </StyledPaper>
  );
};

export default RevenueSharing;
