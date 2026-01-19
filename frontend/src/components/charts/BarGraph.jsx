import React from "react";
import {
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function BarGraph({ data }) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="label" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
