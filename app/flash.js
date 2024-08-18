'use client'
import { Box, CssBaseline, Grid, Paper, ThemeProvider, Typography, Stack, TextField, Button, Container, AppBar, Toolbar } from '@mui/material'
import { getStripe } from '@/utils/get-stripe'
import Head from 'next/head'
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs'

export default function Home() {
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

      <Stack 
        direction="column"
        width="100vw"
        height="100vh"
        backgroundColor='#0F0F0F'
      >
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
              <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                      <Typography variant="h3">Front</Typography>
                    </div>
                    <div class="flip-card-back">
                      <Typography variant="h3">Back</Typography>
                    </div>  
                  </div>
              </div>
              <Box borderRadius= "15px" p={2} height="15vh" width="40vw" backgroundColor="#040404" boxShadow="0px 0px 15px #4A4A4A" alignContent="center">
                <Stack
                  direction="row" height="100%" justifyContent="space-between">
                    <Stack
                      direction="column" height="100%" width="80%"
                    >
                      <Typography fontFamily="monospace" variant="h6">Type answer below:</Typography>
                      <Box borderRadius="15px" backgroundColor="#BFBFBF" height="52%" width="100%">
                        <TextField fullWidth InputProps={{style : {borderRadius: "15px"}}}></TextField>
                      </Box>
                    </Stack>
                  
                  <Button variant="filled" sx={{backgroundColor: 'orange', border: '2px solid DarkOrange', boxShadow: '0px 0px 5px DarkOrange'}}>GO</Button>
                </Stack>
              </Box>
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
              <Stack
                width="100%"
                height="90%"
                direction="column"
              >
                <Box border="2px solid #040404" borderRadius="15px" fullWidth height="100%"/>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <TextField fullWidth sx={{border: '2px solid black', borderRadius: '15px'}} InputProps={{style : {borderRadius: "12px"}}}></TextField>
                <Button variant="filled" sx={{backgroundColor: 'orange', border: '2px solid DarkOrange', boxShadow: '0px 0px 5px DarkOrange'}}>Send</Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
