import { useForm } from 'react-hook-form';
import { Box, Container, Grid, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductForm({ backgroundImage, title, addProducts, handleShowModal }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if(data?.products){
      const products = data.products.trim().split('\n').map((name, index) => ({
        id: Date.now() + index,
        name,
        price: '0.00'
      }));
      addProducts(products);
      reset();
    }
  };

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
        <Container maxWidth="md" component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            sx={{
              paddingBottom: '2rem',
            }}
          >
            <Grid item xs={12}>
              <Typography variant="h2" color={'text.primary'} gutterBottom>
                {title}
              </Typography>
            </Grid>
            {/* Form */}
            <Grid sx={{paddingRight: '2rem'}} item xs={10} md={11}>
              <br></br>
              <TextField
                sx={{
                  backgroundColor: 'rgb(0,0,0,0.6)',
                }}
                fullWidth
                id="filled-multiline-static"
                label="Type products"
                multiline
                rows={4}
                size='small'
                type='text'
                variant='filled'
                color='secondary'
                {...register('products')}
              />
            </Grid>
            <Grid sx={{marginTop: {xs:'0.5rem', md: '0'}}} item xs={2} md={1}>
              <br></br>
              <IconButton
                sx={{
                  backgroundColor: 'rgb(0,0,0,0.3)',
                  marginBottom: '1rem'
                }}
                type="submit"
                aria-label='search'
                size='large'
                color='secondary'
              >
                <AddIcon />
              </IconButton><br></br><br></br>
              <IconButton
                sx={{
                  backgroundColor: 'rgb(0,0,0,0.3)'
                }}
                onClick={handleShowModal}
                aria-label='search'
                size='large'
                color='secondary'
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Box>
  );
}
