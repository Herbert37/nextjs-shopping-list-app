import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// MUI
import { Box, Button, Container, Grid, IconButton, Modal, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

export default function ProductForm({ addProducts, clearProducts }) {
  const { register, handleSubmit, reset } = useForm();
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (data) => {
    if(data?.products){
      const products = data.products.trim().split('\n').map((name, index) => ({
        id: Date.now() + index,
        name,
        price: 0.00
      }));
      addProducts(products);
      reset();
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container maxWidth='md'>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={10} md={11} spacing={2}>
            <br></br>
            <TextField
              sx={{
                backgroundColor: 'rgb(0,0,0,0.6)'
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
          <Grid item xs={2} md={1} spacing={2}>
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
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={modalStyle}>
            <Container sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <InfoIcon color="error" sx={{ fontSize: 40 }} />
              <br></br>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              Hey!
              </Typography>
              <Typography id="modal-modal-description">
              Are you sure you want to clear the list?
              </Typography>
              <br></br>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Button sx={{marginRight: '1rem'}} color="error" onClick={() => { clearProducts(); handleCloseModal(); }}>Clear list</Button>
                <Button color="secondary" onClick={handleCloseModal}>Cancel</Button>
              </Box>
            </Container>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}
