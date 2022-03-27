import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { phone, portrait, small } from 'responsive';

const Error = () => {
  return (
    <Container>
      <Title>404</Title>
      <Text>Oops, the page you are looking for can't be found!</Text>
      <Link to='/' className='notfound__link'>
        <HomePage>Return to homepage</HomePage>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  padding: 2rem;
  font-size: 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20rem;
  font-weight: 900;
  color: #00008b;
  margin-bottom: -5rem;
  text-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.2);

  ${portrait({ fontSize: '17rem' })}

  ${phone({ fontSize: '15rem' })}

  ${small({
    fontSize: '10rem',
    marginBottom: '0.5rem',
  })}
`;

const Text = styled.h2`
  font-size: 3rem;
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: 3px;

  ${portrait({
    fontSize: '2.7rem',
    letterSpacing: '1.5px',
    marginBottom: '1rem',
  })}

  ${phone({
    fontSize: '2.3rem',
    letterSpacing: '1px',
  })}
  
  ${small({
    fontSize: '2rem',
  })}
`;

const HomePage = styled.button`
  border: none;
  display: block;
  padding: 1rem 2rem;
  font-size: 1.35rem;
  text-transform: capitalize;
  background-color: transparent;
  color: #817ade;
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: translate(3px);
    -webkit-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.075);
    -moz-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.075);
    box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.075);

    @media only screen and (max-width: 56.25em), only screen and (hover: none) {
      transform: translate(3px);
    }
  }

  &:focus {
    outline: none;
  }
`;

export default Error;
