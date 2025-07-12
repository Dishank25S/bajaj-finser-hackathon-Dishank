import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiBarChart2 } from 'react-icons/fi';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Title = styled.h3`
  color: #4f46e5;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ChartContainer = styled.div`
  height: 250px;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    height: 200px;
  }
  
  @media (max-width: 480px) {
    height: 180px;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const StatItem = styled.div`
  background: #f8fafc;
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 480px) {
    padding: 0.6rem;
  }
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #4f46e5;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.25rem;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

// Sample data for the last 30 days (simulated recent performance)
const recentStockData = [
  { date: '2025-06-15', price: 1950 },
  { date: '2025-06-16', price: 1965 },
  { date: '2025-06-17', price: 1980 },
  { date: '2025-06-18', price: 1975 },
  { date: '2025-06-19', price: 1990 },
  { date: '2025-06-20', price: 2005 },
  { date: '2025-06-23', price: 2020 },
  { date: '2025-06-24', price: 2010 },
  { date: '2025-06-25', price: 2025 },
  { date: '2025-06-26', price: 2040 },
  { date: '2025-06-27', price: 2035 },
  { date: '2025-06-30', price: 2054 },
  { date: '2025-07-01', price: 2053 },
  { date: '2025-07-02', price: 2008 },
  { date: '2025-07-03', price: 1980 }
];

function StockChart() {
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    current: 0,
    change: 0,
    high: 0,
    low: 0
  });

  useEffect(() => {
    // Process data for chart
    const processedData = recentStockData.map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));
    
    setChartData(processedData);

    // Calculate stats
    const prices = recentStockData.map(item => item.price);
    const current = prices[prices.length - 1];
    const previous = prices[prices.length - 2];
    const change = ((current - previous) / previous * 100);
    const high = Math.max(...prices);
    const low = Math.min(...prices);

    setStats({
      current: current.toFixed(2),
      change: change.toFixed(2),
      high: high.toFixed(2),
      low: low.toFixed(2)
    });
  }, []);

  return (
    <Container>
      <Title>
        <FiBarChart2 />
        Recent Stock Performance
      </Title>
      
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              stroke="#64748b"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#64748b"
              domain={['dataMin - 20', 'dataMax + 20']}
            />
            <Tooltip 
              formatter={(value) => [`₹${value}`, 'Price']}
              labelStyle={{ color: '#374151' }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#4f46e5" 
              strokeWidth={2}
              dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <StatsContainer>
        <StatItem>
          <StatValue>₹{stats.current}</StatValue>
          <StatLabel>Current Price</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue style={{ color: stats.change >= 0 ? '#10b981' : '#ef4444' }}>
            {stats.change >= 0 ? '+' : ''}{stats.change}%
          </StatValue>
          <StatLabel>Daily Change</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>₹{stats.high}</StatValue>
          <StatLabel>30D High</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>₹{stats.low}</StatValue>
          <StatLabel>30D Low</StatLabel>
        </StatItem>
      </StatsContainer>
    </Container>
  );
}

export default StockChart;
