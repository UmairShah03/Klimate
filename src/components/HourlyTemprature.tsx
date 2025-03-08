import type { ForecastData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

const formattedDate = format(new Date(), "yyyy-MM-dd");
console.log(formattedDate); // Example output: 202

interface HourlyTempratureProps {
  data: ForecastData;
}

const HourlyTemprature = ({ data }: HourlyTempratureProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temprature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[200px]">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={chartData}>
              <XAxis
                dataKey={"time"}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background p-2 rounded-lg shadow-sm border">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="uppercase text-[0.70rem] text-muted-foreground">
                              Temprature
                            </span>
                            <span className="font-bold">
                              {payload[0].value}°
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="uppercase text-[0.70rem] text-muted-foreground">
                              Feels Like
                            </span>
                            <span className="font-bold">
                              {payload[1].value}°
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                stroke="#2563eb"
                dataKey={"temp"}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                stroke="#64748b"
                dataKey={"feels_like"}
                strokeWidth={2}
                dot={false}
                strokeDasharray={"5 5"}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
export default HourlyTemprature;
