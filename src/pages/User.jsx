import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MailOutline, PermIdentity, Publish } from '@material-ui/icons';

import { phone } from 'responsive';
import defaultAvatar from 'img/avatar.png';
import { editUser, fetchUser } from 'redux/user/userSlice';

const initialState = {
  name: '',
  role: '',
  email: '',
  username: '',
};

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userId = pathname.split('/')[2];
  const { user, isLoading } = useSelector((state) => state.user);

  const [inputs, setInputs] = useState(initialState);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updUser = {
      ...inputs,
    };

    dispatch(editUser({ userId, updUser, navigate, toast }));
  };

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setInputs({
      name: user?.name,
      role: user?.role,
      email: user?.email,
      username: user?.username,
    });
  }, [user]);

  return (
    <Container>
      <TitleContainer>
        <Title>Edit user</Title>
        <Link to='/new-user' className='user__link'>
          <Button>Create</Button>
        </Link>
      </TitleContainer>
      <UserContainer>
        <ShowUser>
          <Top>
            <Image src={user?.img ?? defaultAvatar} alt='' />
            <TopTitle>
              <ShowUserUsername>{user?.name}</ShowUserUsername>
            </TopTitle>
          </Top>
          <Bottom>
            <UserTitle>Account details</UserTitle>
            <UserInfo>
              <PermIdentity style={{ fontSize: '1.6rem' }} />
              <UserInfoTitle>{user?.username}</UserInfoTitle>
            </UserInfo>
            <UserTitle>Contact details</UserTitle>
            <UserInfo>
              <MailOutline style={{ fontSize: '1.6rem' }} />
              <UserInfoTitle>{user?.email}</UserInfoTitle>
            </UserInfo>
          </Bottom>
        </ShowUser>
        <UpdateUser>
          <UpdateUserTitle>Edit</UpdateUserTitle>
          <Form onSubmit={handleSubmit}>
            <Left>
              <FormGroup>
                <FormInput
                  type='text'
                  name='username'
                  value={inputs.username}
                  placeholder={user?.username}
                  onChange={handleChange}
                  required
                />
                <FormLabel>Username</FormLabel>
              </FormGroup>
              <FormGroup>
                <FormInput
                  type='text'
                  name='name'
                  value={inputs.name}
                  placeholder={user?.name}
                  onChange={handleChange}
                  required
                />
                <FormLabel>Full Name</FormLabel>
              </FormGroup>
              <FormGroup>
                <FormInput
                  type='email'
                  name='email'
                  value={inputs.email}
                  placeholder={user?.email}
                  onChange={handleChange}
                  required
                />
                <FormLabel>Email</FormLabel>
              </FormGroup>
              <FormGroup>
                <FormInput
                  type='text'
                  name='role'
                  value={inputs.role}
                  placeholder={user?.role}
                  onChange={handleChange}
                  required
                />
                <FormLabel>Role</FormLabel>
              </FormGroup>
            </Left>
            <Right>
              <Upload>
                <UpdateUserImage src={user?.img} alt='' />
                <FormLabel htmlFor='file'>
                  <Publish style={{ fontSize: '2rem', cursor: 'pointer' }} />
                </FormLabel>
                <FormInput
                  type='file'
                  id='file'
                  style={{ display: 'none' }}
                />
              </Upload>
              <FormButton disabled={isLoading}>Update</FormButton>
            </Right>
          </Form>
        </UpdateUser>
      </UserContainer>
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  padding: 2rem;
  background-color: ${({ theme }) => theme.bg};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
  font-size: 1.5rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.textSoft};
`;

const Button = styled.button`
  border: none;
  display: block;
  text-transform: capitalize;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.bgBtnAdd};
  color: ${({ theme }) => theme.textAdd};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    transform: translateY(-3px);
  }

  &:focus {
    outline: none;
  }
`;

const UserContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  font-size: 1.5rem;

  ${phone({ flexDirection: 'column' })}
`;

const ShowUser = styled.div`
  flex: 1;
  padding: 2rem;
  -webkit-box-shadow: ${({ theme }) => theme.box};
  -moz-box-shadow: ${({ theme }) => theme.box};
  box-shadow: ${({ theme }) => theme.box};

  ${phone({ marginBottom: '3rem' })}
`;

const Top = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: block;
  object-fit: cover;
`;

const TopTitle = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  margin-left: 2rem;
`;

const ShowUserUsername = styled.span`
  font-weight: 600;
`;

const Bottom = styled.div`
  margin-top: 2rem;
`;

const UserTitle = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: capitalize;
  color: rgb(175, 170, 170);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  color: #444;
  font-weight: 500;

  ${phone({ padding: '0.8rem 0' })}
`;

const UserInfoTitle = styled.span`
  margin-left: 1rem;
`;

const UpdateUser = styled.div`
  flex: 2;
  margin-left: 2rem;
  padding: 2rem;
  -webkit-box-shadow: ${({ theme }) => theme.box};
  -moz-box-shadow: ${({ theme }) => theme.box};
  box-shadow: ${({ theme }) => theme.box};

  ${phone({ marginLeft: 0 })}
`;

const UpdateUserTitle = styled.span`
  font-size: 2.4rem;
  font-weight: 600;
  text-transform: capitalize;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  ${phone({ flexDirection: 'column' })}
`;

const Left = styled.div``;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const FormLabel = styled.label`
  color: #999;
  font-size: 1.4rem;
  margin-left: 2rem;
  margin-top: 0.7rem;
`;

const FormInput = styled.input`
  border: none;
  display: block;
  font-size: 1.5rem;
  font-family: inherit;
  background-color: ${({ theme }) => theme.bgInput};
  color: #999;
  padding: 1.5rem 2rem;
  width: 40rem;
  border-radius: 4px;
  border-bottom: 3px solid #bbb;
  caret-color: #00008b;
  transition: all 0.5s ease;

  ${phone({
  width: '100%',
  padding: '1rem 2rem',
  borderBottom: '2px solid #bbb',
})}

  @media only screen and (max-width: 23.44em) {
    width: 27rem;
  }

  &:focus {
    outline: none;
    border-bottom: 3px solid #008080;
    -webkit-box-shadow: ${({ theme }) => theme.box};
    -moz-box-shadow: ${({ theme }) => theme.box};
    box-shadow: ${({ theme }) => theme.box};

    ${phone({ borderBottom: '2px solod #008080' })}
  }

  &:focus:invalid {
    border-bottom: 3px solid #ffb952;

    ${phone({ borderBottom: '2px solid #ffb952' })}
  }

  &::-webkit-input-placeholder {
    color: #bbb;
  }

  &:placeholder-shown + ${FormLabel} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4rem);
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Upload = styled.div`
  display: flex;
  align-items: center;

  ${phone({ justifyContent: 'space-between' })}
`;

const UpdateUserImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  display: inline-block;
  object-fit: cover;
  margin-right: 2rem;

  ${phone({
  width: '8rem',
  height: '8rem',
  marginRight: '1rem',
})}
`;

const FormButton = styled.button`
  border: none;
  display: block;
  padding: 0.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: capitalize;
  background-color: #00008b;
  color: var(--color-white);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s ease;

  ${phone({ marginTop: '3rem' })}

  &:hover {
    letter-spacing: 2px;
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default User;
