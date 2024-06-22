import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, IconButton, Container, Grid, FormControl, InputLabel, FilledInput, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const ProductList = ({ products, updateProduct, deleteProduct }) => {
  const { control, setValue } = useForm();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    products.forEach((product, index) => {
      setValue(`products[${index}].name`, product.name);
      setValue(`products[${index}].price`, product.price);
    });
  }, [products, setValue]);

  useEffect(() => {
    calculateTotal();
  }, [products]);

	const calculateTotal = () => {
		const sum = products.reduce((acc, product) => acc + parseFloat(product.price || 0), 0);
		setTotal(sum);
	};

  const handleNameChange = (index, value) => {
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updatedProduct = { ...products[index], name: capitalizeFirstLetter(value) };
    updateProduct(index, updatedProduct);
  };

  const handlePriceChange = (index, value) => {
    if (!isNaN(parseFloat(value)) || value === '') {
      const updatedProduct = { ...products[index], price: value };
      updateProduct(index, updatedProduct);
    }
  };

  const handlePriceBlur = (index, value) => {
    let formattedValue = parseFloat(value);
    if (isNaN(formattedValue) || formattedValue === 0) {
      formattedValue = 0.00;
    }
    formattedValue = formattedValue.toFixed(2);
    setValue(`products[${index}].price`, formattedValue);
    const updatedProduct = { ...products[index], price: formattedValue };
    updateProduct(index, updatedProduct);
  };

  const handlePriceKeyDown = (e) => {
    const char = String.fromCharCode(e.keyCode || e.which);
    const regex = /^[0-9\b.]*$/;
    if (!regex.test(char) && ![8, 46, 37, 39].includes(e.keyCode)) { // Allow backspace, delete, left arrow, right arrow
      e.preventDefault();
    }
  };

  return (
    <Container maxWidth='md' sx={{ marginTop: '2rem' }}>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={12} key={product.id} sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Name */}
            <Grid item xs={5} md={5.5}>
              <Controller
                name={`products[${index}].name`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Name'
                    variant='filled'
                    color='secondary'
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    onBlur={(e) => {
                      const value = e.target.value.trim();
                      if (value === '') {
                        setValue(`products[${index}].name`, product.name);
                      }
                    }}
                  />
                )}
              />
            </Grid>
            {/* Price */}
            <Grid item xs={5} md={5.5} sx={{ paddingLeft: '1rem', paddingRight: '2rem' }}>
              <FormControl fullWidth variant="filled">
                <InputLabel color='secondary' htmlFor={`filled-adornment-price-${index}`}>Price</InputLabel>
                <Controller
                  name={`products[${index}].price`}
                  control={control}
                  render={({ field }) => (
                    <FilledInput
                      {...field}
                      color='secondary'
                      id={`filled-adornment-price-${index}`}
                      onChange={(e) => handlePriceChange(index, e.target.value)}
                      onFocus={(e) => e.target.value === "0.00" && setValue(`products[${index}].price`, "")}
                      onBlur={(e) => handlePriceBlur(index, e.target.value)}
                      onKeyDown={handlePriceKeyDown}
                      inputMode="decimal"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <IconButton
              sx={{
                backgroundColor: 'rgba(0,0,0,0.3)'
              }}
              color="secondary"
              size='large'
              onClick={() => deleteProduct(index)}
            >
              <ClearIcon />
            </IconButton>
          </Grid>
        ))}
				<Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
					<Grid item xs={5} md={5.5} />
					<Grid item xs={5} md={5.5} sx={{ paddingLeft: '1rem', paddingRight: '2rem' }}>
						<FormControl fullWidth variant="filled">
							<InputLabel sx={{ color: '#19857b' }} htmlFor="filled-adornment-total">Total</InputLabel>
							<FilledInput
								disabled
								color='secondary'
								id="filled-adornment-total"
								startAdornment={<InputAdornment position="start">${total.toFixed(2)}</InputAdornment>}
								value=''
							/>
						</FormControl>
					</Grid>
				</Grid>
      </Grid>
    </Container>
  );
};

export default ProductList;
