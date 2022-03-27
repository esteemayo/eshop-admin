import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  Error,
  Home,
  Login,
  NewProduct,
  NewUser,
  Product,
  ProductList,
  User,
  UserList,
} from 'pages/index';
import Topbar from 'components/Topbar';
import Sidebar from 'components/Sidebar';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Router>
      {!currentUser && <Topbar />}
      <Routes>
        <Route path='/login' element={<Login />} />
        {!currentUser && <Route path='/' element={<Home />} />}
      </Routes>
      {currentUser?.role === 'admin' && (
        <>
          <Topbar />
          <ToastContainer />
          <Container>
            <Sidebar />
            <Routes>
              <Route path='/' index element={<Home />} />
              <Route path='users' element={<UserList />} />
              <Route path='user/:id' element={<User />} />
              <Route path='new-user' element={<NewUser />} />
              <Route path='products' element={<ProductList />} />
              <Route path='product/:id' element={<Product />} />
              <Route path='new-product' element={<NewProduct />} />
              <Route path='*' element={<Error />} />
            </Routes>
          </Container>
        </>
      )}
    </Router>
  );
}

const Container = styled.div`
  display: flex;
  margin-top: 1rem;
`;

export default App;
