import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  ArrowDropDown,
  Language,
  NotificationsNone,
  Settings,
} from '@material-ui/icons';

import { logout } from 'redux/user/userSlice';

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { darkMode } = useSelector((state) => state.darkMode);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Container>
      <Wrapper>
        <TopLeft>
          <Logo>Dashboard</Logo>
        </TopLeft>
        <TopRight>
          <IconContainer>
            <Mode>{darkMode ? 'light' : 'dark'} mode</Mode>
          </IconContainer>
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
          <Image
            src={currentUser?.img || 'assets/user-default.jpg'}
            alt=''
          />
          <Profile>
            <ArrowDropDown className='icon' />
            <Options>
              <Item onClick={handleLogout}>Logout</Item>
            </Options>
          </Profile>
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

const Mode = styled.span`
  text-transform: uppercase;
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

const Options = styled.div`
  display: none;
  background-color: #0b0b0b;
  color: var(--color-white);
  border-radius: 0.5rem;
`;

const Profile = styled.div`
  &:hover ${Options} {
    display: flex;
    flex-direction: column;
    position: absolute;
  }
`;

const Item = styled.span`
  text-transform: capitalize;
  padding: 1rem;
  font-size: 1.3rem;
  cursor: pointer;
`;

export default Topbar;
