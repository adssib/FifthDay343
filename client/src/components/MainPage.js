import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import '../styles/MainPage.css';

const MainPage = () => {
  return (
    <Box
      className="main-page"
      sx={{
        position: 'relative',
        backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <Box className="background-overlay" sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }} />

      <Container className="content-container" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography className="main-title" variant="h2" color="white" align="center">
          Fast On Track
        </Typography>

        <Box className="button-container" sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
          <Button
            className="delivery-request-button"
            variant="contained"
            color="primary"
            component={Link}
            to="/create-request"
            sx={{ padding: '10px 20px' }}
          >
            Delivery <br></br>Request
          </Button>
          <Button
            className="track-button"
            variant="contained"
            color="secondary"
            component={Link}
            to="/track-package"
            sx={{ padding: '10px 20px' }}
          >
            Track
          </Button>
          <Button
            className="review-button"
            variant="contained"
            color="info"
            component={Link}
            to="/submit-review"
            sx={{ padding: '10px 20px' }}
          >
            Review
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default MainPage;
