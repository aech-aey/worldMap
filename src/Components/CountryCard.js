import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './CountryCard.css'
export default function CountryCard(props) {
  console.log(props.isDarkMode)
  return (
    <Card sx={{ maxWidth: 345, width: 200 }}>
      <CardMedia
        component="img"
        alt={props.name}
        height="140"
        image={props.flagUrl}
      />

      <CardContent className={`${props.isDarkMode ? 'dark-card' : 'light-card'}`}>
        <Typography gutterBottom variant="h5" component="div" >
          {props.name}
        </Typography>
        <Typography variant="body2"  >
          {props.capital} | {props.population}
        </Typography>
      </CardContent>
    </Card>
  );
}