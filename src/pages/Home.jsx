import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Chart from 'components/Chart';
import { phone } from 'responsive';
import WidgetSm from 'components/WidgetSm';
import FeaturedInfo from 'components/FeaturedInfo';
import WidgetLg from 'components/WidgetLg';
import { getUserStats } from 'services/userService';
import axios from 'axios';

const Home = () => {
  const [userStats, setUserStats] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

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

  const fetchUserStats = useCallback(async () => {
    try {
      const { data } = await getUserStats();
      data.stats.map((item) =>
        setUserStats((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], 'Active User': item.total },
        ])
      );
    } catch (err) {
      console.log(err);
    }
  }, [MONTHS]);

  useEffect(() => {
    fetchUserStats();
  }, [fetchUserStats]);

  if (!currentUser) {
    return null;
  }

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
