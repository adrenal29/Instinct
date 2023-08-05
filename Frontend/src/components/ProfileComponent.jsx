import React from 'react';
import {
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Grow,
  Button,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const dummyData = {
  carbonRating: 75,
  nftData: [
    {
      id: 1,
      title: 'Solar Energy',
      imageUrl: 'https://picsum.photos/300/200?theme=energy',
      description: 'A beautiful depiction of solar energy generation.',
      price: 50,
    },
    {
      id: 2,
      title: 'Wind Turbine',
      imageUrl: 'https://picsum.photos/300/200?theme=energy',
      description: 'An artistic representation of a wind turbine in action.',
      price: 60,
    },
    // Add more NFT data as needed
  ],
  greenEnergyData: [
    { month: 'Jan', generation: 120 },
    { month: 'Feb', generation: 140 },
    { month: 'Mar', generation: 180 },
    { month: 'Apr', generation: 200 },
    { month: 'May', generation: 250 },
    { month: 'Jun', generation: 300 },
    // Add more data points for other months
  ],
};

const ProfileComponent = () => {
    const renderNFTCards = (nftData) => {
        return (
          <div style={{ display: 'flex', overflowX: 'scroll' }}>
            {nftData.map((nft) => (
              <Grow key={nft.id} in={true} style={{ transformOrigin: '0 0 0' }}>
                <Card style={{ margin: '0 8px' }}>
                  <CardMedia
                    component="img"
                    alt={nft.title}
                    height="140"
                    image={nft.imageUrl}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {nft.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {nft.description}
                    </Typography>
                    <Typography variant="h6" component="div">
                      Price: ${nft.price}
                    </Typography>
                    <Button variant="contained" color="primary">
                      Buy
                    </Button>
                    <Button variant="outlined" color="primary" style={{ marginLeft: '8px' }}>
                      Sell
                    </Button>
                  </CardContent>
                </Card>
              </Grow>
            ))}
          </div>
        );
      };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">NFTs Collected</Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {renderNFTCards(dummyData.nftData)}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Green Energy Generation</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dummyData.greenEnergyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="generation" stroke="#00C49F" name="Green Energy Generation" />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileComponent;
