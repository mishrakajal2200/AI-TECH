import React from "react";
import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function LineGraph({ data }) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="label" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
