import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Line, AreaChart } from 'recharts'
import { useMemo } from 'react';
import { useTheme } from '@mui/material';

const Row1 = () => {
  const palette = useTheme().palette;
    const { data } = useGetKpisQuery();
    const revenueExpenses = useMemo(() => {
      return (
        data &&
        data[0].monthlyData.map(({month, revenue, expenses}) => {
          return {
            name: month.substring(0, 3),
            revenue: revenue,
            expenses: expenses,
          }
        })
      );
    }, [data]);
  return (
    <>
    <DashboardBox bgcolor="#fff" gridArea="a">
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area 
          type="monotone" 
          dataKey="revenue" 
          stroke={palette.primary.main}
          fillOpacity={1}
          fill="url(#colorRevenue)"
           />
           </AreaChart>
          <Line 
          type="monotone" 
          dataKey="uv" 
          stroke="#82ca9d" />
      </ResponsiveContainer>
    </DashboardBox>
    <DashboardBox bgcolor="#fff" gridArea="b"></DashboardBox>
    <DashboardBox bgcolor="#fff" gridArea="c"></DashboardBox>
    </>
  )
}

export default Row1