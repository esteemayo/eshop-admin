import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

import { getIncome } from 'services/orderService';

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState(0);

  const fetchIncome = async () => {
    try {
      const { data } = await getIncome();
      setIncome(data.income);
      setPercentage(
        (data.income[1].total / (data.income[0].total + data.income[1].total)) *
        100
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <Container>
      <FeaturedItem>
        <Title>Revenue</Title>
        <FeaturedMoneyContainer>
          <FeaturedMoney>${income[1]?.total}</FeaturedMoney>
          <FeaturedMoneyRate>
            %{Math.floor(percentage)}{' '}
            {percentage < 0 ? (
              <ArrowDownward
                style={{
                  fontSize: '1.4rem',
                  marginLeft: '0.5rem',
                  color: 'red',
                }}
              />
            ) : (
              <ArrowUpward
                style={{
                  fontSize: '1.4rem',
                  marginLeft: '0.5rem',
                  color: 'green',
                }}
              />
            )}
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
      <FeaturedItem>
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
      </FeaturedItem>
      <FeaturedItem>
        <Title>Cost</Title>
        <FeaturedMoneyContainer>
          <FeaturedMoney>$2,415</FeaturedMoney>
          <FeaturedMoneyRate>
            %2.4{' '}
            <ArrowUpward
              style={{
                fontSize: '1.4rem',
                marginLeft: '0.5rem',
                color: 'green',
              }}
            />{' '}
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FeaturedItem = styled.div`
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

export default FeaturedInfo;
