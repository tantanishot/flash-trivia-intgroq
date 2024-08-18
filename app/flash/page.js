'use client'
import { useState } from 'react';
import { Box, CssBaseline, Grid, Typography, Stack, TextField, Button, Container, AppBar, Toolbar } from '@mui/material';
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs';
import Head from 'next/head';

export default function Home() {
  // State for managing flashcards and navigation
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [chatInput, setChatInput] = useState('');

  // Handle sending the topic to the API and getting flashcards
  const handleSend = async () => {
    if (!chatInput) return;

    try {
      // Send the input to your API to generate flashcards
      const response = await fetch('/api/generate-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: chatInput }), // The input from the user is the topic for the flashcards
      });

      const data = await response.json();

      // Assuming the API returns an array of flashcards
      if (data && data.length > 0) {
        setFlashcards(data);  // Store the flashcards
        setCurrentCardIndex(0);  // Reset to the first card
      }

    } catch (error) {
      console.error('Error generating flashcards:', error);
    }

    setChatInput('');  // Clear input field
  };

  // Navigate to the next flashcard
  const handleNext = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex < flashcards.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  // Navigate to the previous flashcard
  const handlePrevious = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  // Display the current flashcard
  const currentFlashcard = flashcards[currentCardIndex] || { front: 'Front', back: 'Back' };

  return (
    <Container maxWidth={false} disableGutters>
      <Head>
        <title>Flash Trivia</title>
        <meta name="Description" content="Test your knowledge with flashcards!" />
      </Head>

      <AppBar position="static" style={{ background: '#040404' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>Flash Trivia</Typography>
          <SignedOut>
            <Button sx={{ color: '#FFFFFF', backgroundColor: '#0F0F0F' }}>Login</Button>
            <Button sx={{ color: 'orange', backgroundColor: '#0F0F0F' }}>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Stack
        direction="column"
        width="100vw"
        height="100vh"
        backgroundColor='#0F0F0F'
      >
        <Grid container component="main" alignContent="center" sx={{ height: '100vh', width: '100vw' }}>
          <CssBaseline />
          <Grid
            item
            alignItems="center"
            justifyContent="center"
            alignContent="center"
            m="auto"
            xs={false}
            sm={9}
            sx={{
              backgroundSize: 'cover',
              backgroundPosition: 'left',
              backgroundColor: '#0F0F0F',
            }}
          >
            <Stack
              direction="column" width="100%" alignContent="center" alignItems="center" spacing={4}
            >
              {/* Flip Card Animation */}
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <Typography variant="h3">{currentFlashcard.front}</Typography>
                  </div>
                  <div className="flip-card-back">
                    <Typography variant="h3">{currentFlashcard.back}</Typography>
                  </div>
                </div>
              </div>
              <Stack direction="row" spacing={2}>
                <Button onClick={handlePrevious} disabled={currentCardIndex === 0}>Previous</Button>
                <Button onClick={handleNext} disabled={currentCardIndex === flashcards.length - 1}>Next</Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            item
            xs={false}
            sm={3}
            md={3}
            height="95%"
            elevation={6}
            square
            borderRadius="15px"
            backgroundColor='#FFFFFF'
            boxShadow="0px 0px 20px #5F5F5F"
          >
            <Stack
              direction="column"
              fullWidth
              height="100%"
              p={2}
              spacing={2}
              justifyContent="space-between"
            >
              {/* Chat Input Area */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <TextField
                  fullWidth
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  sx={{ border: '2px solid black', borderRadius: '15px' }}
                  InputProps={{ style: { borderRadius: '12px' } }}
                />
                <Button
                  onClick={handleSend}
                  variant="filled"
                  sx={{ backgroundColor: 'orange', border: '2px solid DarkOrange', boxShadow: '0px 0px 5px DarkOrange' }}
                >
                  Send
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
