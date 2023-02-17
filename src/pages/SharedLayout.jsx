import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';

import Topbar from 'components/Topbar';
import Sidebar from 'components/Sidebar';

import 'react-toastify/dist/ReactToastify.css';

const SharedLayout = () => {
  return (
    <>
      <Topbar />
      <ToastContainer style={{ fontSize: '1.4rem' }} />
      <Container>
        <Sidebar />
        <Outlet />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
`;

export default SharedLayout;
