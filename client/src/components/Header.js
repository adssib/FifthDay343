import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    backgroundColor: '#1A202C',
                    boxShadow: 3
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h4"
                            sx={{
                                background: 'linear-gradient(135deg, #fbd200 30%, #f9a800 70%)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                                fontWeight: 'bold',
                                fontFamily: 'Roboto',
                                transition: 'text-shadow 0.3s ease',
                                '&:hover': {
                                    textShadow: '0 0 8px rgba(249, 168, 0, 0.1), 0 0 15px rgba(249, 168, 0, 0.3), 0 0 10px rgba(249, 168, 0, 0.3)',
                                }
                            }}
                        >
                            Blue Bolt
                        </Typography>
                    </Link>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 3
                        }}
                    >
                        <Button
                            component={Link}
                            to="/create-request"
                            sx={{
                                color: 'white',
                                textTransform: 'uppercase',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                backgroundColor: '#4c8bf5',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#0066cc',
                                },
                            }}
                        >
                            Delivery Request
                        </Button>
                        <Button
                            component={Link}
                            to="/track-package"
                            sx={{
                                color: 'white',
                                textTransform: 'uppercase',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                backgroundColor: '#FBBF24',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#f9a800',
                                },
                            }}
                        >
                            Track
                        </Button>

                        <Button
                            component={Link}
                            to="/submit-review"
                            sx={{
                                color: 'white',
                                textTransform: 'uppercase',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                backgroundColor: '#26a69a', // teal color for Review button
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#00796b', // darken when hover
                                },
                            }}
                        >
                            Review
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;
