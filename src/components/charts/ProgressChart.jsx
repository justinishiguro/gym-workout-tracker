import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './ProgressChart.css';

export default function ProgressChart({ data, metric, unit = 'kg' }) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-empty card">
        <p className="text-muted">No data yet. Log workouts with this exercise to see progress.</p>
      </div>
    );
  }

  const yLabel = metric === 'maxWeight' ? `Max Weight (${unit})` : `Total Volume (${unit})`;

  return (
    <div className="chart-wrap card">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
            tickLine={false}
            axisLine={false}
            label={{
              value: yLabel,
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              style: { fontSize: 10, fill: 'var(--color-text-muted)' },
            }}
            width={70}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 6,
              color: 'var(--color-text)',
              fontSize: 13,
            }}
            formatter={(val) => [`${val} ${unit}`, metric === 'maxWeight' ? 'Max Weight' : 'Volume']}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-accent)"
            strokeWidth={2}
            dot={{ r: 4, fill: 'var(--color-accent)', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
