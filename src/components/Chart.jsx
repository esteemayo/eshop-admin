import styled from 'styled-components';
import {
  LineChart,
  Line,
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
        <LineChart data={data}>
          <XAxis dataKey='name' stroke='#5550bd' />
          <Line type='monotone' dataKey={dataKey} stroke='#5550bd' />
          <Tooltip />
          {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray='5 5' />}
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem;
  padding: 2rem;
  -webkit-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
`;

const Title = styled.h3`
  text-transform: capitalize;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export default Chart;
