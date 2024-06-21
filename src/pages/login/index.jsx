import { useEffect, useState } from "react";
import { Button, Card, CardContent, CardMedia, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    const userInput = document.querySelector('#userInput');
    userInput.focus();
  }, []);
  return (
    <div className='notFound'>
      <Card sx={{ width: 350 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="https://d296xu67oj0g2g.cloudfront.net/lm_cms/images/CMS/DEALS/0923BOSI/RLB_BOSIMILLASADICIONALES.png"
          title="green iguana"
        />
        <CardContent>
          <br></br>
          <TextField
            fullWidth
            id="userInput"
            size='small'
            type='text'
            //onChange={(event) => onChangeText(event)}
            //value={searchValue}
            variant='filled'
            label='User'
            color='secondary'
          /><br></br><br></br>
          <FormControl fullWidth size='small' color='secondary' variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
            <FilledInput
              id="passwordInput"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff/> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl><br></br><br></br>
          <Button color="secondary">Login</Button>
        </CardContent>
      </Card>
    </div>
  );
}
