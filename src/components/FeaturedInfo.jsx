import styled from 'styled-components';
import FeaturedItem from './FeaturedItem';

const FeaturedInfo = () => {
  return (
    <Container>
      <FeaturedItem type='revenue' />
      <FeaturedItem type='sales' />
      <FeaturedItem type='cost' />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

export default FeaturedInfo;
