'use client'
import { useState } from 'react';
import { Box, CssBaseline, Grid, Paper, ThemeProvider, Typography, Stack, TextField, Button, Container, AppBar, Toolbar } from '@mui/material';
import { getStripe } from '@/utils/get-stripe';
import Head from 'next/head';
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateFlashcards = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }
      
      const data = await response.json();
      setFlashcards(data.flashcards);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Head>
        <title>Flash Trivia</title>
        <meta name="Description" content="Test your knowledge with flashcards!" />
      </Head>

      <AppBar position="static" style={{background: '#040404'}}>
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>Flash Trivia</Typography>
          <SignedOut>
            <Button sx={{color: '#FFFFFF', backgroundColor: '#0F0F0F'}}>Login</Button>
            <Button sx={{color: 'orange', backgroundColor: '#0F0F0F'}}>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Stack direction="column" width="100vw" height="100vh" backgroundColor='#0F0F0F'>
        <Grid container component="main" alignContent="center" sx={{ height: '100vh', width: '100vw'}}>
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
              {/* Topic Input and Generate Button */}
              <Box p={2}>
                <TextField
                  label="Enter a topic for flashcards"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  fullWidth
                  sx={{ backgroundColor: '#BFBFBF', borderRadius: '15px' }}
                />
                <Button
                  onClick={handleGenerateFlashcards}
                  variant="filled"
                  sx={{ marginTop: 2, backgroundColor: 'orange', border: '2px solid DarkOrange', boxShadow: '0px 0px 5px DarkOrange' }}
                >
                  Generate Flashcards
                </Button>
              </Box>

              {/* Display Flashcards */}
              {loading && <Typography variant="h5">Loading flashcards...</Typography>}
              {error && <Typography variant="h5" color="error">{error}</Typography>}
              {flashcards.length > 0 && flashcards.map((card, index) => (
                <div key={index} className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <Typography variant="h3">{card.front}</Typography>
                    </div>
                    <div className="flip-card-back">
                      <Typography variant="h3">{card.back}</Typography>
                    </div>
                  </div>
                </div>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
