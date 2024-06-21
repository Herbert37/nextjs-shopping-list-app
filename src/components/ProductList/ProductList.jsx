import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, IconButton, Box, Typography, Container, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = ({ products, updateProduct, deleteProduct }) => {
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: { products }
  });

  useEffect(() => {
    products && products.forEach((product, index) => {
      setValue(`products[${index}].name`, product.name);
      setValue(`products[${index}].price`, product.price);
    });
  }, [products, setValue]);

  return (
    <Container maxWidth='md' sx={{ marginTop: '2rem' }}>
      <Grid container>
        {products && products.map((product, index) => (
          <Box key={product.id} component="form" sx={{ display: 'flex', alignItems: 'center', mb: 2 }} onSubmit={handleSubmit((data) => updateProduct(index, data.products[index]))}>
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
                  onFocus={(e) => e.target.value === "0.00" && setValue(`products[${index}].price`, "")}
                  onBlur={(e) => {
                    const value = e.target.value.trim();
                    if (value === '' || isNaN(parseFloat(value))) {
                      setValue(`products[${index}].price`, "0.00");
                    }
                  }}
                />
              )}
            />
            <IconButton color="secondary" onClick={() => deleteProduct(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Grid item xs={10} md={11}>
          {products && <Typography variant="h6">Total: ${products.reduce((sum, product) => sum + parseFloat(product.price), 0).toFixed(2)}</Typography>}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductList;
