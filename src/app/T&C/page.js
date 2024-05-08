'use client'
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Paper, Typography, ThemeProvider, createTheme } from '@mui/material';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

// Define the theme using createTheme
const theme = createTheme({
    palette: {
        secondary: {
            main: '#4caf50',  // Example green color, adjust as needed
        },
    },
});

export default function TermsAndConditionsPage() {
    

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md">
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
                    <Paper elevation={3} sx={{ width: '100%', padding: 2 }}>
                        <Typography component="h1" variant="h5">
                            <p>TERMS AND CONDITIONS</p> 
                            These terms and conditions (the "Terms and Conditions") govern the use of localhost:3000 (the "Site"). This Site is owned and operated by Film Findr. This Site is a news or media website.
                            By using this Site, you indicate that you have read and understand these Terms and Conditions and agree to abide by them at all times.
                            THESE TERMS AND CONDITIONS CONTAIN A DISPUTE RESOLUTION CLAUSE THAT IMPACTS YOUR RIGHTS ABOUT HOW TO RESOLVE DISPUTES. PLEASE READ IT CAREFULLY.
                            Intellectual Property
                            All content published and made available on our Site is the property of Film Findr and the Site's creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our Site.
                            User Contributions
                            Users may post the following information on our Site: Photos; Videos; and Public comments.
                            By posting publicly on our Site, you agree not to act illegally or violate these Terms and Conditions.
                           <p>Accounts</p> 
                            When you create an account on our Site, you agree to the following:
                            1. You are solely responsible for your account and the security and privacy of your account, including passwords or sensitive information attached to that account; and
                            2. All personal information you provide to us through your account is up to date, accurate, and truthful and that you will update your personal information if it changes.
                            We reserve the right to suspend or terminate your account if you are using our Site illegally or if you violate these Terms and Conditions.
                            Limitation of Liability
                            Film Findr and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the Site.
                            <p>Indemnity</p> 
                            Except where prohibited by law, by using this Site you indemnify and hold harmless Film Findr and our directors, officers, agents, employees, subsidiaries, and affiliates from any actions, claims, losses, damages, liabilities and expenses including legal fees arising out of your use of our Site or your violation of these Terms and Conditions.
                           <p>Applicable Law</p> 
                            These Terms and Conditions are governed by the laws of Ireland.
                            <p>Dispute Resolution</p> 
                            Subject to any exceptions specified in these Terms and Conditions, if you and Film Findr are unable to resolve any dispute through informal discussion, then you and Film Findr agree to submit the issue first before a non-binding mediator and to an arbitrator in the event that mediation fails. The decision of the arbitrator will be final and binding. Any mediator or arbitrator must be a neutral party acceptable to both you and Film Findr. The costs of any mediation or arbitration will be shared equally between you and Film Findr.
                            Notwithstanding any other provision in these Terms and Conditions, you and Film Findr agree that you both retain the right to bring an action in small claims court and to bring an action for injunctive relief or intellectual property infringement.
                            <p>Severability</p> 
                            If at any time any of the provisions set forth in these Terms and Conditions are found to be inconsistent or invalid under applicable laws, those provisions will be deemed void and will be removed from these Terms and Conditions. All other provisions will not be affected by the removal and the rest of these Terms and Conditions will still be considered valid.
                            <p>Changes</p> 
                            These Terms and Conditions may be amended from time to time in order to maintain compliance with the law and to reflect any changes to the way we operate our Site and the way we expect users to behave on our Site. We will notify users by email of changes to these Terms and Conditions or post a notice on our Site.
                            <p>Contact Details</p> 
                            Please contact us if you have any questions or concerns. Our contact details are as follows:
                            <p>Phone number: 085 2413816,</p> <p>Email: stevenakmelu2960@gmail.com </p><p>Address: 2 Tullyhall avenue, Lucan, Co Dublin</p> 
                           
                            You can also contact us through the feedback form available on our Site.
                            <p>©2002-2024 LawDepot.com®</p>
                            <p>Effective Date: 10th day of May, 2024</p>
                        </Typography>

                        </Paper>
                        <Typography variant="h7" color="textSecondary" align="center">
                        Back to <Link href="http://localhost:3000">Home</Link>.
                        </Typography>

                </Box>
            </Container>
        </ThemeProvider>
    );
}
