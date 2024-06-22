import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, IconButton, Box, Typography, Container, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = ({ products, updateProduct, deleteProduct }) => {
  const { control, setValue } = useForm();

  useEffect(() => {
    products.forEach((product, index) => {
      setValue(`products[${index}].name`, product.name);
      setValue(`products[${index}].price`, product.price);
    });
  }, [products, setValue]);

  const handleNameChange = (index, value) => {
    const updatedProduct = { ...products[index], name: value };
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

  return (
    <Container maxWidth='md' sx={{ marginTop: '2rem' }}>
      <Grid container>
        {products.map((product, index) => (
          <Box key={product.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Controller
              name={`products[${index}].name`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant='filled'
                  color='secondary'
                  sx={{ mr: 2 }}
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
            <Controller
              name={`products[${index}].price`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  variant='filled'
                  color='secondary'
                  sx={{ mr: 2 }}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                  onFocus={(e) => e.target.value === "0.00" && setValue(`products[${index}].price`, "")}
                  onBlur={(e) => handlePriceBlur(index, e.target.value)}
                />
              )}
            />
            <IconButton color="secondary" onClick={() => deleteProduct(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Grid item xs={10} md={11}>
          <Typography variant="h6">
            Total: ${products.reduce((sum, product) => sum + parseFloat(product.price), 0).toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductList;
