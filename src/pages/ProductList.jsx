import { useEffect } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DeleteOutline } from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';

import { productColumns } from 'data';
import { fetchProducts, removeProduct, reset } from 'redux/products/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { darkMode } = useSelector((state) => state.darkMode);

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you wanted to delete this product?'))
      dispatch(removeProduct({ productId, toast }))
  };

  useEffect(() => {
    dispatch(fetchProducts());
    return () => dispatch(reset());
  }, [dispatch]);

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.row._id}`} className='product__link'>
              <EditButton>Edit</EditButton>
            </Link>
            <DeleteOutline
              onClick={() => handleDelete(params.row._id)}
              style={{ fontSize: '2rem', cursor: 'pointer' }}
              className={darkMode ? 'delete__dark' : 'delete__light'}
            />
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <DataGrid
        rows={products}
        columns={productColumns.concat(actionColumn)}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        style={{ fontSize: '1.5rem' }}
        className={darkMode && 'data__grid'}
      />
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  padding: 2rem;
  background-color: ${({ theme }) => theme.bg};
`;

const EditButton = styled.button`
  border: none;
  display: block;
  padding: 0.5rem 1rem;
  text-transform: capitalize;
  background-color: ${({ theme }) => theme.btnEdit};
  color: ${({ theme }) => theme.textEdit};
  border-radius: 10rem;
  cursor: pointer;
  margin-right: 1rem;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: translateX(3px);
  }

  &:focus {
    outline: none;
  }
`;

export default ProductList;
