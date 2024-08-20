'use client'
import { Box, CssBaseline, Grid, Paper, ThemeProvider, Typography, Stack, TextField, Button, Container, AppBar, Toolbar, Divider } from '@mui/material'
import { getStripe } from '@/utils/get-stripe'
import Head from 'next/head'
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Home() {
  return (
    <Container maxWidth={false} disableGutters>
      <Head>
        <title>Flash Trivia</title>
        <meta name="Description" content="Test your knowledge with flashcards!" />
      </Head>

      <AppBar position="static" style={{background: '#040404'}}>
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            <Link href="/" passHref>
              Flash Trivia
            </Link>
          </Typography>
          <SignedOut>
            <Button sx={{color: '#FFFFFF', backgroundColor: '#0F0F0F'}}>
                <Link href="/sign-in" passHref>
                    Login
                </Link>
            </Button>
            <Button sx={{color: 'orange', backgroundColor: '#0F0F0F'}}>
                <Link href="/sign-up" passHref>
                    Sign Up
                </Link>
            </Button>
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
        justifyContent="center"
        alignItems="center"
      >
        <Box
          width="75%"
          alignItems="center">
          <Divider m={2} orientation="horizontal" sx={{bgcolor: '#7F7F7F'}} variant="center"/>
        </Box>
        
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={4}
        >
          <Typography variant="h2"><strong>Flash Trivia</strong></Typography>
          <Typography variant="h5" p={4}>Hone your knowledge in any topic with our innovative flash card service!</Typography>
          <SignedIn>
            <Button variant="filled" href="/flash" sx={{backgroundColor: 'orange', border: '2px solid DarkOrange', boxShadow: '0px 0px 5px DarkOrange'}}>Quiz Yourself</Button>
          </SignedIn>
          <SignedOut>
            <Button variant="filled" href="/sign-up" sx={{backgroundColor: 'orange', border: '2px solid DarkOrange', boxShadow: '0px 0px 5px DarkOrange'}}>Get Started</Button>
          </SignedOut>
        </Box>

        <Box
          width="75%"
          alignItems="center">
          <Divider m={2} orientation="horizontal" sx={{bgcolor: '#7F7F7F'}} variant="center"/>
        </Box>
        
      </Stack>
    </Container>
  );
}
