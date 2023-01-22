import styled from 'styled-components';
import { Link } from 'react-router-dom';

import notfoundImg from 'img/404.png';

const NotFound = () => {
  return (
    <Container>
      <Link to='/' className='notfound__link'>
        <Image src={notfoundImg} alt='' />
      </Link>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  padding: 2rem;
  font-size: 1.5rem;
  background-color: ${({ theme }) => theme.bg};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  display: inline-block;
  object-fit: cover;
`;

export default NotFound;
