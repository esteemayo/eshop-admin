import { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers, removeUser } from 'redux/user/userSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you wanted to delete this user'))
      dispatch(removeUser(userId));
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    {
      field: 'user',
      headerName: 'User',
      width: 200,
      renderCell: (params) => {
        return (
          <UserListUser>
            <Image src={params.row.img} />
            {params.row.username}
          </UserListUser>
        );
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/${params.row._id}`} className='user__link'>
              <EditButton>Edit</EditButton>
            </Link>
            <DeleteOutline
              onClick={() => handleDelete(params.row.id)}
              style={{
                fontSize: '2rem',
                color: '#ff0000',
                cursor: 'pointer',
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        style={{ fontSize: '1.5rem' }}
      />
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
`;

const UserListUser = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  display: block;
  object-fit: cover;
  margin-right: 1rem;
`;

const EditButton = styled.button`
  border: none;
  display: block;
  padding: 0.5rem 1rem;
  text-transform: capitalize;
  background-color: #3bb077;
  color: var(--color-white);
  border-radius: 10rem;
  cursor: pointer;
  margin-right: 1rem;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: translateX(-3px);
  }

  &:focus {
    outline: none;
  }
`;

export default UserList;
