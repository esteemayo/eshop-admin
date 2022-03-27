import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import { Language, NotificationsNone, Settings } from '@material-ui/icons';

const Topbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <TopLeft>
          <Logo>Dashboard</Logo>
        </TopLeft>
        <TopRight>
          {currentUser && (
            <>
              <IconContainer>
                <NotificationsNone style={{ fontSize: '2rem' }} />
                <TopIconBadge>2</TopIconBadge>
              </IconContainer>
              <IconContainer>
                <Language style={{ fontSize: '2rem' }} />
                <TopIconBadge>2</TopIconBadge>
              </IconContainer>
              <IconContainer>
                <Settings style={{ fontSize: '2rem' }} />
              </IconContainer>
              <Image src={currentUser?.img} alt={currentUser?.username} />
            </>
          )}
          <List>
            {!currentUser && (
              <ListItem>
                <Link to='/login'>
                  <PersonIcon style={{ fontSize: '2rem' }} /> Login
                </Link>
              </ListItem>
            )}
          </List>
        </TopRight>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 5rem;
  background-color: var(--color-white);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TopLeft = styled.div``;

const Logo = styled.div`
  font-size: 3rem;
  font-weight: bold;
  font-family: 'Great Vibes', cursive;
  color: #00008b;
  cursor: pointer;
`;

const TopRight = styled.span`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 1rem;
  color: #555;
`;

const TopIconBadge = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: -0.5rem;
  right: 0;
  background-color: #ff0000;
  color: var(--color-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const Image = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: block;
  object-fit: cover;
  cursor: pointer;
`;

const List = styled.ul`
  list-style: none;
  color: #555;
  margin-right: 1rem;
`;

const ListItem = styled.li`
  font-size: 1.8rem;
  font-weight: 300;

  a:link,
  a:visited {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }
`;

export default Topbar;
