import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

import Chart from 'components/Chart';
import { phone } from 'responsive';
import WidgetSm from 'components/WidgetSm';
import FeaturedInfo from 'components/FeaturedInfo';
import WidgetLg from 'components/WidgetLg';
import { getUserStats } from 'services/userService';

const Home = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();
    (async () => {
      try {
        const { data } = await getUserStats(token);
        data.stats.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], 'Active User': item.total },
          ]),
        );
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else {
          // TODO: handle error
          console.log(err);
        }
      }
    })();

    return () => cancel();
  }, [MONTHS]);

  return (
    <Container>
      <FeaturedInfo />
      <Chart
        grid
        data={userStats}
        dataKey='Active User'
        title='User Analytics'
      />
      <Widget>
        <WidgetSm />
        <WidgetLg />
      </Widget>
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  background-color: ${({ theme }) => theme.bg};
`;

const Widget = styled.div`
  display: flex;
  margin: 2rem;

  ${phone({ flexDirection: 'column' })}
`;

export default Home;
