import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthRoute from 'utils/AuthRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import { darkTheme, lightTheme } from 'utils/Theme';
import {
  Home,
  Login,
  NewProduct,
  NewUser,
  NotFound,
  Product,
  ProductList,
  SharedLayout,
  User,
  UserList,
} from 'pages/index';

function App() {
  const { darkMode } = useSelector((state) => state.darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Routes>
          <Route
            path='/login'
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path='/' element={<SharedLayout />}>
            <Route
              index
              element={
                <AuthRoute>
                  <Home />
                </AuthRoute>
              }
            />
            <Route
              path='users'
              element={
                <AuthRoute>
                  <UserList />
                </AuthRoute>
              }
            />
            <Route
              path='user/:id'
              element={
                <AuthRoute>
                  <User />
                </AuthRoute>
              }
            />
            <Route
              path='new-user'
              element={
                <AuthRoute>
                  <NewUser />
                </AuthRoute>
              }
            />
            <Route
              path='products'
              element={
                <AuthRoute>
                  <ProductList />
                </AuthRoute>
              }
            />
            <Route
              path='product/:id'
              element={
                <AuthRoute>
                  <Product />
                </AuthRoute>
              }
            />
            <Route
              path='new-product'
              element={
                <AuthRoute>
                  <NewProduct />
                </AuthRoute>
              }
            />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
