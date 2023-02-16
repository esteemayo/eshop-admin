import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visibility } from '@material-ui/icons';

import { phone } from 'responsive';
import defaultAvatar from 'img/avatar.png';
import { getUsers } from 'services/userService';
import axios from 'axios';

const WidgetSm = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { token } = axios.CancelToken.source();
        const {
          data: { users },
        } = await getUsers(token);

        setUsers(users);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else {
          // TODO: handle error
          console.log(err);
        }
      }
    })();
  }, []);

  return (
    <Container>
      <Title>Latest users</Title>
      <List>
        {users?.map((user) => {
          const { _id: id, img, username } = user;
          return (
            <ListItem key={id}>
              <Image src={img || defaultAvatar} alt='' />
              <UserContainer>
                <UserName>{username}</UserName>
              </UserContainer>
              <Button onClick={() => navigate(`/user/${id}`)}>
                <Visibility
                  style={{ fontSize: '1.6rem', marginRight: '0.5rem' }}
                />
                Display
              </Button>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  padding: 2rem;
  margin-right: 2rem;
  -webkit-box-shadow: ${({ theme }) => theme.box};
  -moz-box-shadow: ${({ theme }) => theme.box};
  box-shadow: ${({ theme }) => theme.box};

  ${phone({
  marginBottom: '1rem',
  marginRight: 0,
})}
`;

const Title = styled.span`
  text-transform: capitalize;
  font-size: 2.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textSoft};
`;

const List = styled.ul`
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 0;
  font-size: 1.5rem;
`;

const Image = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: block;
  object-fit: cover;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  text-transform: lowercase;
  font-weight: 550;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  text-transform: capitalize;
  font-size: 1.5rem;
  border-radius: 5px;
  padding: 0.7rem 1rem;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  outline-color: ${({ theme }) => theme.text};
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: translateX(-3px);
  }
`;

export default WidgetSm;
