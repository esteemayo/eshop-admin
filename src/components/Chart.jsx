import styled from 'styled-components';
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Chart = ({ title, data, dataKey, grid }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <ResponsiveContainer width='100%' aspect={4 / 1}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='total' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='name' stroke='gray' />
          {grid && (
            <CartesianGrid
              stroke='#8884d8'
              strokeDasharray='3 3'
              className='chart-grid'
            />
          )}
          <Tooltip />
          <Area
            type='monotone'
            dataKey={dataKey}
            stroke='#8884d8'
            fillOpacity={1}
            fill='url(#total)'
          />
          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem;
  padding: 2rem;
  -webkit-box-shadow: ${({ theme }) => theme.box};
  -moz-box-shadow: ${({ theme }) => theme.box};
  box-shadow: ${({ theme }) => theme.box};
`;

const Title = styled.h3`
  text-transform: capitalize;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textSoft};
  margin-bottom: 2rem;
`;

export default Chart;
