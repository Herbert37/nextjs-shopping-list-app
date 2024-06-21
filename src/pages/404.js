import { Grid, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

export default function Custom404() {
  return (
    <Grid container spacing={2} minHeight={160}>
      <div className='notFound'>
        <h1>404 error</h1>
        <Grid xs display='flex' justifyContent='center' alignItems='center'>
          <Link href={'/'}>
            <IconButton aria-label='search' size='large' color='secondary'>
              <HomeIcon />
            </IconButton>
          </Link>
        </Grid>
      </div>
    </Grid>
  );
}
