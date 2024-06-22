import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IconButton, Container, Grid, FormControl, InputLabel, FilledInput, InputAdornment } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PriceIcon from '@mui/icons-material/Paid';
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
    if (/^\d*\.?\d*$/.test(value)) {
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
    if (e.key === '.' && e.target.value.includes('.')) {
      e.preventDefault();
    }
    const regex = /^[0-9.]$/;
    if (!regex.test(e.key) && ![8, 46, 37, 39].includes(e.keyCode)) {
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
              <FormControl fullWidth variant="filled">
                <InputLabel color='secondary' htmlFor={`filled-adornment-name-${index}`}>Name</InputLabel>
                <Controller
                  name={`products[${index}].name`}
                  control={control}
                  render={({ field }) => (
                    <FilledInput
                      {...field}
                      color='secondary'
                      id={`filled-adornment-name-${index}`}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      onBlur={(e) => {
                        const value = e.target.value.trim();
                        if (value === '') {
                          setValue(`products[${index}].name`, product.name);
                        }
                      }}
                      startAdornment={<InputAdornment position="start"><LocalMallIcon sx={{ width: '1rem' }} /></InputAdornment>}
                    />
                  )}
                />
              </FormControl>
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
                      type="text"
                      color='secondary'
                      id={`filled-adornment-price-${index}`}
                      onChange={(e) => handlePriceChange(index, e.target.value)}
                      onFocus={(e) => e.target.value === "0.00" && setValue(`products[${index}].price`, "")}
                      onBlur={(e) => handlePriceBlur(index, e.target.value)}
                      onKeyDown={handlePriceKeyDown}
                      inputMode="numeric"
                      startAdornment={<InputAdornment position="start"><PriceIcon sx={{ width: '1rem' }} /></InputAdornment>}
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
                startAdornment={<InputAdornment position="start"><PriceIcon sx={{ mr: '8px', width: '1rem', color: '#19857b' }} />{total.toFixed(2)}</InputAdornment>}
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
