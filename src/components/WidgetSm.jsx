import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Visibility } from '@material-ui/icons';

import { phone } from 'responsive';
import { getUsers } from 'services/userService';

const WidgetSm = () => {
  const [users, setUsers] = useState();

  const fetchUsers = async () => {
    try {
      const {
        data: { users },
      } = await getUsers();

      setUsers(users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      <Title>New join members</Title>
      <List>
        {users?.map((user) => {
          const { _id: id, img, username } = user;
          return (
            <ListItem key={id}>
              <Image
                src={
                  img ||
                  'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
                }
                alt={username}
              />
              <UserContainer>
                <UserName>{username}</UserName>
              </UserContainer>
              <Button>
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
  -webkit-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);

  ${phone({
    marginBottom: '1rem',
    marginRight: 0,
  })}
`;

const Title = styled.span`
  text-transform: capitalize;
  font-size: 2.2rem;
  font-weight: 600;
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
  text-transform: capitalize;
  font-weight: 600;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  text-transform: capitalize;
  font-size: 1.5rem;
  border-radius: 5px;
  padding: 0.7rem 1rem;
  background-color: #eeeef7;
  color: #555;
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: translateX(-3px);
  }
`;

export default WidgetSm;
