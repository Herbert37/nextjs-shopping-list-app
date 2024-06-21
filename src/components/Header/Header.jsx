import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ProductForm from '@/src/components/ProductForm/ProductForm';

export default function Header({ backgroundImage, title, subtitle, description }) {
  return (
    <Box
      sx={{
        position: 'relative',
        lineHeight: '0rem',
        marginTop: '-4rem'
      }}
    >
      <Box
        component="img"
        sx={{
          height: { xs: 373, md: 400 },
          width: '100%',
          maxHeight: { xs: 373, md: 400 },
          maxWidth: '100%',
          objectFit: 'cover',
        }}
        src={backgroundImage}
      />
      {/* Overlay layer */}
      <div className={'headerContainer'}>
        <Container maxWidth="md">
          <Grid
            container
            spacing={2}
            sx={{
              paddingBottom: '2rem',
            }}
          >
            <Grid item xs={12}>
              <Typography variant="h2" color={'text.primary'} gutterBottom>
                {title}
              </Typography>
              <Typography fontSize="1.7rem" color={'text.primary'} gutterBottom>
                {subtitle}
              </Typography>
              <Typography fontSize="1rem" color={'text.primary'} gutterBottom>
                {description}
              </Typography>
            </Grid>
            <ProductForm />
          </Grid>
        </Container>
      </div>
    </Box>
  );
}
