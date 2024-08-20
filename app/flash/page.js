'use client'
import { useState } from 'react';
import { Box, CssBaseline, Grid, Typography, Stack, TextField, Button, Container, AppBar, Toolbar } from '@mui/material';
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs';
import Head from 'next/head';

var score = 0

export default function Home() {
  // State for managing flashcards and navigation
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const currentFlashcard = flashcards[currentCardIndex] || { front: 'Front', back: 'Back' };

  //user input for getting right answer 
  const [userAnswer, setUserAnswer] = useState('');
  

  //to control if incorrect or wrong box 
  const [boxVisible, setBoxVisible] = useState(false);
  const [boxPosition, setBoxPosition] = useState({ top: '50%', left: '50%' });

  const [isCorrect, setIsCorrect] = useState(null);  // null means no answer yet
  
  const handleSend = async () => {
    if (!chatInput) return;

    try {
      
      const response = await fetch('/api/generate-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: chatInput }), 
      });

      const data = await response.json();

     
      if (data && data.length > 0) {
        setFlashcards(data);  
        setCurrentCardIndex(0);  
        setIsCorrect(null);  // Reset
        setBoxVisible(false);  // Hide the feedback box 
      }

    } catch (error) {
      console.error('Error generating flashcards:', error);
    }

    setChatInput('');  
  };

 
  const handleNext = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex < flashcards.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

 
  const handlePrevious = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  //submits and checks if string of back card == 
  const handleAnswerSubmit = () => {
       //i made it  all lowercase so theres no small details when checking
       const useAnswer = userAnswer.trim().toLowerCase();
       const correctAnswer = currentFlashcard.back.trim().toLowerCase();
    console.log(`User Answer: ${useAnswer}, Correct Answer: ${correctAnswer}`);
 

    // Check if the user's answer matches the back of the flashcard
    if (useAnswer === correctAnswer) {
      setIsCorrect(true);  // Answer is correct
      score += 1;
    } else {
      setIsCorrect(false);  // Answer is incorrect
    }

    setBoxPosition({ top: '10px', left: '50%', transform: 'translateX(-50%)' });  // Position at the top center
    setBoxVisible(true);  // Show feedback box

    handleNext();

    // Clear the answer input after submission
    setUserAnswer('');

    //to make it dissapear again
    setTimeout(() => {
      setBoxVisible(false);  // Hide the feedback box after 3 seconds
    }, 3000);
  };

//frontend css
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
        direction="row"
        width="100vw"
        height="100vh"
        sx={{ overflow: 'hidden' }}
        backgroundColor='#0F0F0F'
      >


  
  <Grid container sx={{ height: '100%', width: '100%' }} alignItems="stretch">
    
    {/* Left grid with flashcards */}
    <Grid
      item
      xs={false}
      sm={9}
      sx={{
        backgroundColor: '#0F0F0F',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Flashcard content */}
      <Stack direction="column" alignItems="center" justifyContent="center" height="100%">
        <div className="flip-card" id="card" style={{ marginBottom: '30px' }}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <Box display="flex" justifyContent="center" alignItems="center" height="100%" textAlign="center" p={2}>
                <Typography variant="h3">{currentFlashcard.front}</Typography>
              </Box>
            </div>
            <div className="flip-card-back">
              <Box display="flex" justifyContent="center" alignItems="center" height="100%" textAlign="center" p={2}>
                <Typography variant="h3">{currentFlashcard.back}</Typography>
              </Box>
            </div>
          </div>
        </div>
        
      {/*Answer buttong*/}
        <Box borderRadius= "15px" p={2} height="15vh" width="40vw" backgroundColor="#040404" boxShadow="0px 0px 15px #4A4A4A" alignContent="center" style={{ marginBottom: '30px' }}>
                <Stack
                  direction="row" height="100%" justifyContent="space-between" spacing={5} >
                    <Stack
                      direction="column" height="100%" width="80%"
                    >
                      <Typography fontFamily="monospace" variant="h6">Type answer below:</Typography>
                      <Box borderRadius="15px" backgroundColor="#BFBFBF" height="52%" width="100%">
                        <TextField  value={userAnswer}  // Bind input to userAnswer state
    onChange={(e) => setUserAnswer(e.target.value)} fullWidth InputProps={{style : {borderRadius: "15px"}}}></TextField>
                      </Box>
                    </Stack>
                  
                  <Button variant="filled" onClick={handleAnswerSubmit} sx={{backgroundColor: 'orange', border: '2px solid DarkOrange', boxShadow: '0px 0px 5px DarkOrange'}}>GO</Button>
                </Stack>
              </Box>

        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              backgroundColor: '#333333',
              borderRadius: '10px',
              padding: '10px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Button onClick={handlePrevious} disabled={currentCardIndex === 0}>Previous</Button>
            <Button onClick={handleNext} disabled={currentCardIndex === flashcards.length - 1}>Next</Button>
          </Box>
        </Stack>
      </Stack>
    </Grid>
    
    {/* Right grid (Chat/Creation area) */}
    <Grid
      item
      xs={false}
      //moving right box a little bit inward
      sm={3}
      sx={{
        marginLeft: '-40px', 
        marginTop: '20vh',
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#FFDBBB',
        borderRadius: '16px',
        boxShadow: '0px 0px 20px #5F5F5F',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '50vh',
      }}
    >
      <Stack direction="column" width="100%" spacing={1}>
        {/* Chat Input Area */}
        <Typography variant="h6" color="black">Enter theme:</Typography>
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
            Create
          </Button>
        </Stack>

        <Typography variant="h6" color="black">Score:</Typography>
        <Box fullWidth height="auto" textAlign="center">
          <Typography variant="h6" color="black">{score}</Typography>
        </Box>
      </Stack>
    </Grid>
  </Grid>

   {/* Random Feedback Box */}
   {boxVisible && (
          <Box
            sx={{
              position: 'absolute',
              top: boxPosition.top,
              left: boxPosition.left,
              backgroundColor: isCorrect ? 'green' : 'red',
              color: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
              transition: 'top 0.5s ease, left 0.5s ease',  // Smooth movement
            }}
          >
            {isCorrect ? 'Correct!' : 'Incorrect!'}
          </Box>
        )}
</Stack>
</Container>
  );
}
