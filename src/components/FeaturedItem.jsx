import styled from 'styled-components';
import axios from 'axios';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';

import { getIncome } from 'services/orderService';

const FeaturedItem = ({ type }) => {
  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState(0);

  let data;

  useEffect(() => {
      const { token, cancel } = axios.CancelToken.source();
      try {
        const { data } = await getIncome(token);
        setIncome(data.income);
        setPercentage(
          (data.income[1]?.total / (data.income[0]?.total + data.income[1]?.total)) *
          100
        );
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else {
          // TODO: handle error
          console.log(err);
        }
      }

      return () => cancel();
    })();
  }, []);

  switch (type) {
    case 'revenue':
      data = {
        title: 'Revenue',
        money: income[1]?.total,
        rate: Math.floor(percentage),
        icon: (
          percentage < 0 ? (
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
          )
        ),
      };
      break;

    case 'sales':
      data = {
        title: 'Sales',
        money: '4415',
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
        money: '2415',
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
      <Title>{data.title}</Title>
      <FeaturedMoneyContainer>
        <FeaturedMoney>
          <NumericFormat
            value={data.money}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </FeaturedMoney>
        <FeaturedMoneyRate>
          %{data.rate}{' '}
          {data.icon}{' '}
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
