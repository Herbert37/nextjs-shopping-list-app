import React, { lazy, useEffect, useState } from 'react';
const Menu = lazy(() => import('src/components/Menu/Menu'));
const ProductForm = lazy(() => import('src/components/ProductForm/ProductForm'));
const ProductList = lazy(() => import('src/components/ProductList/ProductList'));
const ClearProductsModal = lazy(() => import('src/components/ClearProductsModal/ClearProductsModal'));

export default function Home() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const addProducts = (newProducts) => {
    const updatedProducts = [...products, ...newProducts];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const updateProduct = (index, updatedProduct) => {
    const updatedProducts = products.map((product, i) => i === index ? updatedProduct : product);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const clearProducts = () => {
    setProducts([]);
    localStorage.removeItem('products');
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Menu />
      <ProductForm
        backgroundImage={
          'https://d296xu67oj0g2g.cloudfront.net/lm_cms/images/CMS/OVERVIEW%20BANNERS/0624/AA_HB.png'
        }
        title={'Shopping List'}
        addProducts={addProducts}
        handleShowModal={handleShowModal}
      />
      <ProductList 
        products={products}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
      />
      <ClearProductsModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        clearProducts={clearProducts}
      />
    </>
  );
}
