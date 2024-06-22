import { Box, Button, Container, Modal, Typography } from '@mui/material';
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

export default function ClearProductsModal({ showModal, handleCloseModal, clearProducts }) {

  return (
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
  );
}
