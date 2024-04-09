'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';






const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
         <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
      
          <Item>Film Findr</Item>
        </Grid>
      
        <Grid item md={12} >
          <Item> <nav className="bar">
      <a href="http://localhost:3000">Home </a>


      <a href="/">About </a>

      <a href="/">Add Film </a>

      <a href="http://localhost:3000/login">Login </a>

      <a href="/">Register </a>

      <a href="/">Contact </a>

    </nav>
    </Item>
        </Grid>        
      
      </Grid>
    </Box>
  );
}