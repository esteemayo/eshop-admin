import axios from 'axios';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { getIncome } from 'services/orderService';

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState(0);

  const fetchIncome = async () => {
    try {
      const { token } = axios.CancelToken.source();
      const { data } = await getIncome(token);
      setIncome(data.income);
      setPercentage(
        (data.income[1].total / (data.income[0].total + data.income[1].total)) *
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
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <Container>
      {/*  */}
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
