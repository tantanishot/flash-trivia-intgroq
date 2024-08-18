import { SignUp } from "@clerk/nextjs";
import { Box, Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <Container maxWidth={false} disableGutters style={{background: '#0F0F0F'}}>
            <AppBar position="static" style={{background: '#040404'}}>
                <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                    <Link href="/" passHref>
                        Flash Trivia
                    </Link>
                </Typography>
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
                </Toolbar>
            </AppBar>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                backgroundColor="#0F0F0F"
                height="95vh"
            >
                <Typography variant="h4">Sign Up</Typography>
                <SignUp />
            </Box>
        </Container>
    )
}