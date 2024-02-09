import { useGetKpisQuery } from '@/state/api';
import { useMemo, useState } from 'react';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useTheme } from '@mui/material';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import regression, { DataPoint } from 'regression';

const Predictions = () => {
    const { palette } = useTheme();
    const [isPredictions, setIsPredictions] = useState(false);
    const { data: kpiData } = useGetKpisQuery();

    const formattedData = useMemo(() => {
        if(!kpiData) return [];
        const monthData = kpiData[0].monthlyData;

        const formatted: Array<DataPoint> = monthData.map((item, i) => {
            const { revenue } = item;
            return [i, revenue]
        }
    );
    const regressionLine = regression.linear(formatted);

    return monthData.map(({ month, revenue}, i: number) => {
        return {
            name: month,
            "Actual Revenue": revenue,
            "Regression Line": regressionLine.points[i][1],
            "Predicted revenue": regressionLine.predict(i + 12)[1]
        }
    })
    }, [kpiData])

  return (
  <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
    <FlexBetween m="1rem 2.5rem" gap="0.3rem">
        <Box>
            <Typography variant="h3">
                Revenue and Predictions
            </Typography>
            <Typography variant="h6">
            Charted revenue and predicted revenue bases on a simple linear regression model.
            </Typography>
        </Box>
        <Button 
        onClick={() => setIsPredictions(!isPredictions)}
            sx={{
                color: palette.grey[900],
                backgroundColor: palette.grey[700],
                boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.4)"
            }}
                >
                    Show Predicted Revenue for Next Year
        </Button>
    </FlexBetween>
    <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{
              top: 20,
              right: 75,
              left: 20,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}>
                <Label value="Months" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis
            domain={[12000, 26000]}
              tickLine={false}
              axisLine={{ strokeWidth: "0"}}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            >
                <Label value="Revenue in USD" angle={-90} position="insideLeft" style={{ textAnchor: "middle" }} />
            </YAxis>
            <Tooltip />
            <Legend
              verticalAlign="top"
            />
            <Line
              type="monotone"
              dataKey="Actual Revenue"
              stroke={palette.primary.main}
              strokeWith={0}
              dot={{ strokeWith: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Regression Line"
              stroke="#8884d8"
              dot={false}
            />
            {isPredictions && (
                 <Line
                 type="monotone"
                 dataKey="Predicted Revenue"
                 stroke={palette.secondary[500]}
               />
            )}
          </LineChart>
        </ResponsiveContainer>
  </DashboardBox>
  )
};

export default Predictions;