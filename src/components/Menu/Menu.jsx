import { useEffect, useState } from 'react';
import { AppBar, Button, Container, Toolbar } from '@mui/material';

export default function Menu({ }) {
  const [scrollY, setScrollY] = useState(0);
  const appBarStyle = {
    backgroundColor: scrollY > 100 ? '#121212' : 'rgb(0,0,0,0.6)',
    transition: 'background-color 0.3s ease-in-out',
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.addEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <AppBar sx={appBarStyle} position="sticky">
      <Toolbar>
        <Container maxWidth="md" sx={{ padding: '0rem !important' }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
