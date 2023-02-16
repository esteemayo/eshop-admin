import styled from 'styled-components';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

const FeaturedItem = ({ type }) => {
  let data;

  switch (type) {
    case 'revenue':
      data = {
        title: 'Revenue',
        money: '',
        rate: '',
        icon: (
          <ArrowDownward
            style={{
              fontSize: '1.4rem',
              marginLeft: '0.5rem',
              color: 'red',
            }}
          />
        ),
      };
      break;

    case 'sales':
      data = {
        title: 'Sales',
        money: '4,415',
        rate: '-1.4',
        icon: (
          <ArrowDownward
            style={{
              fontSize: '1.4rem',
              marginLeft: '0.5rem',
              color: 'red',
            }}
          />
        ),
      };
      break;

    case 'cost':
      data = {
        title: 'Cost',
        money: '2,415',
        rate: '2.4',
        icon: (
          <ArrowUpward
            style={{
              fontSize: '1.4rem',
              marginLeft: '0.5rem',
              color: 'green',
            }}
          />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <Container>
      <Title>Sales</Title>
      <FeaturedMoneyContainer>
        <FeaturedMoney>$4,415</FeaturedMoney>
        <FeaturedMoneyRate>
          %-1.4{' '}
          <ArrowDownward
            style={{
              fontSize: '1.4rem',
              marginLeft: '0.5rem',
              color: 'red',
            }}
          />{' '}
        </FeaturedMoneyRate>
      </FeaturedMoneyContainer>
      <FeaturedSub>Compared to last month</FeaturedSub>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  font-size: 1.6rem;
  font-weight: 300;
  margin: 0 2rem;
  padding: 3rem;
  border-radius: 1rem;
  cursor: pointer;
  -webkit-box-shadow: ${({ theme }) => theme.box};
  -moz-box-shadow: ${({ theme }) => theme.box};
  box-shadow: ${({ theme }) => theme.box};
`;

const Title = styled.span`
  font-size: 2rem;
  color: ${({ theme }) => theme.textSoft};
`;

const FeaturedMoneyContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
`;

const FeaturedMoney = styled.span`
  font-size: 3rem;
  font-weight: 600;
`;

const FeaturedMoneyRate = styled.span`
  display: flex;
  align-items: center;
  margin-left: 2rem;
`;

const FeaturedSub = styled.span`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textSoft};
`;

export default FeaturedItem;
