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
  border: 3px solid #f5f5f5;
  border-top-color: #979797;
  border-radius: 50%;
  margin: auto;
  animation: rotate 0.6s linear infinite;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
