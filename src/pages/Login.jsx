import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useLocation, useNavigate } from 'react-router-dom';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';

import Spinner from 'components/Spinner';
import { loginUser, reset } from 'redux/user/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isLoading, isSuccess, isError } =
    useSelector((state) => state.user);

  const usernameRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const userData = {
      username,
      password,
    };

    dispatch(loginUser({ credentials: userData, toast }));

    const origin = location.state?.from?.pathname || '/';
    currentUser && isSuccess && navigate(origin);
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    return () => dispatch(reset());
  }, [dispatch]);

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormInput
              type='text'
              name='username'
              placeholder='Username'
              ref={usernameRef}
              required
            />
            <FormLabel>Username</FormLabel>
            <FaceOutlinedIcon className='username__icon' />
          </FormGroup>
          <FormGroup>
            <FormInput
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              ref={passwordRef}
              required
            />
            <FormLabel>Password</FormLabel>
            {showPassword ? (
              <VisibilityOff
                className='password__icon'
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Visibility
                className='password__icon'
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </FormGroup>
          {isError && <ErrorMessage>{isError}</ErrorMessage>}
          <Button disabled={isLoading}>
            Login {isLoading && <Spinner />}
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  padding: 2rem;
  background-color: ${({ theme }) => theme.bg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 2rem;
`;

const Form = styled.form``;

const FormGroup = styled.div`
  position: relative;

  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }

  svg {
    color: ${({ theme }) => theme.textIcon};
  }
`;

const FormLabel = styled.label`
  margin-left: 2rem;
  margin-top: 0.7rem;
  font-weight: 600;
  font-size: 1.3rem;
`;

const FormInput = styled.input`
  display: block;
  border: none;
  width: 40rem;
  padding: 1rem 2rem;
  border-bottom: 3px solid transparent;
  background-color: ${({ theme }) => theme.bgInput};
  color: #999;
  border-radius: 3px;
  -webkit-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  -moz-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  caret-color: ${({ theme }) => theme.crInput};
  transition: all 0.5s ease;

  &:focus {
    outline: none;
    border-bottom: 3px solid #008080;
    -webkit-box-shadow: 0 0.5rem 1.5rem rgba(00, 00, 00, 0.075);
    -moz-box-shadow: 0 0.5rem 1.5rem rgba(00, 00, 00, 0.075);
    box-shadow: 0 0.5rem 1.5rem rgba(00, 00, 00, 0.075);
  }

  &:focus:invalid {
    border-bottom: 3px solid #ff7730;
  }

  &::-webkit-input-placeholder {
    color: #bbb;
  }

  &:placeholder-shown + ${FormLabel} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(4rem);
  }
`;

const Button = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.bgBtnAdd};
  color: ${({ theme }) => theme.textAdd};
  border-radius: 5px;
  font-size: 1.4rem;
  margin-top: 2rem;
  outline-color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    opacity: 0.7;
    letter-spacing: 3px;
    transform: translateY(-3px);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: #ff0000;
  font-weight: 400;
  font-size: 1.4rem;
`;

export default Login;
