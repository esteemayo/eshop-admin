import styled from 'styled-components';

const Spinner = ({ size }) => {
  return (
    <Container size={size}></Container>
  );
};

const Container = styled.div`
  width: ${({ size }) => size === 'sm' && '2rem'};
  width: ${({ size }) => size === 'md' && '5rem'};
  width: ${({ size }) => size === 'lg' && '10rem'};
  height: ${({ size }) => size === 'sm' && '2rem'};
  height: ${({ size }) => size === 'md' && '5rem'};
  height: ${({ size }) => size === 'lg' && '10rem'};
`

export default Spinner;
