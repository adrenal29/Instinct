import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { VStack, Heading, Text, Flex, Box, Container } from "@chakra-ui/react";
import BidCard from './BidCard';

function BidsListingPage() {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const bidsRef = firebase.database().ref(`bids`);
    bidsRef.on('value', (snapshot) => {
      const bidsList = [];
      snapshot.forEach((bidSnapshot) => {
        const bid = bidSnapshot.val();
        bid.id = bidSnapshot.key;
        bidsList.push(bid);
      });
      setBids(bidsList);
    });
    return () => {
      bidsRef.off();
    };
  }, []);

  return (
    <Box backgroundColor="gray.100" minHeight="100vh">
      <Container maxW="container.lg" py={6}>
        <VStack spacing={8} alignItems="start">
          <Heading>Bids Listing Page</Heading>
          {bids.length === 0 ? (
            <Text>No bids submitted yet.</Text>
          ) : (
            <Flex flexWrap="wrap" width="100%">
              {bids.map((bid) => (
                <BidCard key={bid.id} bid={bid} />
              ))}
            </Flex>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

export default BidsListingPage;