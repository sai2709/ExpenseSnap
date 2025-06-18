import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ExpenseSummary } from '../types';
import { getCategoryById } from '../data/categories';

interface ExpenseSummaryChartProps {
  summary: ExpenseSummary;
}

const ExpenseSummaryChart: React.FC<ExpenseSummaryChartProps> = ({ summary }) => {
  const data = Object.entries(summary.categoryTotals).map(([categoryId, amount]) => {
    const category = getCategoryById(categoryId);
    return {
      name: category.name,
      value: amount,
      color: category.color,
    };
  });

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-500">
        <p className="text-sm">No data available for this period</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseSummaryChart;
