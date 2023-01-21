import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthRoute from 'utils/AuthRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import {
  Error,
  Home,
  Login,
  NewProduct,
  NewUser,
  Product,
  ProductList,
  SharedLayout,
  User,
  UserList,
} from 'pages/index';

function App() {
  return (
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
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
