import React, { useState } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { FiTrendingUp, FiBarChart, FiPieChart, FiActivity, FiExternalLink } from 'react-icons/fi';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #007BFF, #0056B3, #003D7A);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    
    @media (max-width: 768px) {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
  }
`;

const Title = styled.h3`
  color: #007BFF;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const DetailsButton = styled.button`
  background: linear-gradient(135deg, #007BFF 0%, #0056B3 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #0066CC 0%, #004799 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  background: #f1f5f9;
  padding: 0.375rem;
  border-radius: 12px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.375rem;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const Tab = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.8rem;
  }
  
  ${props => props.active ? `
    background: linear-gradient(135deg, #007BFF 0%, #0056B3 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    border-radius: 8px;
    transform: translateY(-1px);
  ` : `
    background: transparent;
    color: #64748b;
    
    &:hover {
      background: rgba(0, 123, 255, 0.1);
      color: #007BFF;
      border-radius: 8px;
    }
  `}
`;

const ChartContainer = styled.div`
  height: 280px;
  margin: 1rem 0;
  flex: 1;
  min-height: 250px;
  
  @media (max-width: 768px) {
    height: 240px;
    min-height: 200px;
  }
  
  @media (max-width: 480px) {
    height: 200px;
    min-height: 180px;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
`;

const MetricCard = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 123, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const MetricValue = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: #007BFF;
  margin-bottom: 0.375rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const MetricLabel = styled.div`
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const MetricChange = styled.div`
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-weight: 600;
  ${props => props.positive ? 'color: #10b981;' : 'color: #ef4444;'}
`;


// Enhanced data with quarterly performance
const quarterlyData = [
  { quarter: 'Q1 FY25', revenue: 18500, profit: 1350, margin: 7.3 },
  { quarter: 'Q2 FY25', revenue: 19800, profit: 1520, margin: 7.7 },
  { quarter: 'Q3 FY25', revenue: 21200, profit: 1680, margin: 7.9 },
  { quarter: 'Q4 FY25', revenue: 23800, profit: 2100, margin: 8.8 }
];

const segmentData = [
  { name: 'General Insurance', value: 45, color: '#007BFF' },
  { name: 'Life Insurance', value: 35, color: '#0056B3' },
  { name: 'Lending', value: 20, color: '#003D7A' }
];

const stockPerformanceData = [
  { month: 'Jul 24', price: 1580, volume: 2.1 },
  { month: 'Aug 24', price: 1625, volume: 2.3 },
  { month: 'Sep 24', price: 1890, volume: 3.1 },
  { month: 'Oct 24', price: 1875, volume: 2.8 },
  { month: 'Nov 24', price: 1615, volume: 3.5 },
  { month: 'Dec 24', price: 1640, volume: 2.9 },
  { month: 'Jan 25', price: 1700, volume: 3.2 },
  { month: 'Feb 25', price: 1850, volume: 3.8 },
  { month: 'Mar 25', price: 1945, volume: 4.2 },
  { month: 'Apr 25', price: 2050, volume: 4.5 },
  { month: 'May 25', price: 2025, volume: 4.1 },
  { month: 'Jun 25', price: 2010, volume: 3.9 }
];

function ComprehensiveAnalytics({ onShowDetails }) {
  const [activeTab, setActiveTab] = useState('performance');

  const renderPerformanceChart = () => (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={quarterlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="quarter" tick={{ fontSize: 12 }} stroke="#64748b" />
          <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
          <Tooltip 
            formatter={(value, name) => [
              name === 'revenue' ? `₹${value} Cr` : name === 'profit' ? `₹${value} Cr` : `${value}%`,
              name === 'revenue' ? 'Revenue' : name === 'profit' ? 'Profit' : 'Margin'
            ]}
            labelStyle={{ color: '#374151' }}
          />
          <Bar dataKey="revenue" fill="#007BFF" name="revenue" radius={[4, 4, 0, 0]} />
          <Bar dataKey="profit" fill="#10b981" name="profit" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );

  const renderSegmentChart = () => (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={segmentData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {segmentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );

  const renderStockChart = () => (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={stockPerformanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#64748b" />
          <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
          <Tooltip 
            formatter={(value, name) => [
              name === 'price' ? `₹${value}` : `${value}M`,
              name === 'price' ? 'Stock Price' : 'Volume'
            ]}
            labelStyle={{ color: '#374151' }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#007BFF" 
            strokeWidth={3}
            dot={{ fill: '#007BFF', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );

  const getMetrics = () => {
    switch(activeTab) {
      case 'performance':
        return [
          { label: 'FY25 Revenue', value: '₹83.3K Cr', change: '+15.2%', positive: true },
          { label: 'Net Profit', value: '₹6.65K Cr', change: '+18.5%', positive: true },
          { label: 'ROE', value: '21.2%', change: '+2.1%', positive: true },
          { label: 'Growth Rate', value: '19%', change: '+7%', positive: true }
        ];
      case 'segments':
        return [
          { label: 'General Ins', value: '45%', change: '+2%', positive: true },
          { label: 'Life Insurance', value: '35%', change: '-1%', positive: false },
          { label: 'Lending', value: '20%', change: '+3%', positive: true },
          { label: 'Digital Rev', value: '25%', change: '+8%', positive: true }
        ];
      case 'stock':
        return [
          { label: 'Current Price', value: '₹2,010', change: '+27.2%', positive: true },
          { label: '52W High', value: '₹2,105', change: 'ATH', positive: true },
          { label: 'Market Cap', value: '₹3.2L Cr', change: '+29%', positive: true },
          { label: 'P/E Ratio', value: '18.5x', change: '-0.5x', positive: true }
        ];
      default:
        return [];
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <Title>
          <FiBarChart />
          Comprehensive Analytics
        </Title>
        {onShowDetails && (
          <DetailsButton onClick={onShowDetails}>
            <FiExternalLink />
            View Details
          </DetailsButton>
        )}
      </HeaderContainer>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'performance'} 
          onClick={() => setActiveTab('performance')}
        >
          <FiActivity style={{ marginRight: '0.5rem' }} />
          Performance
        </Tab>
        <Tab 
          active={activeTab === 'segments'} 
          onClick={() => setActiveTab('segments')}
        >
          <FiPieChart style={{ marginRight: '0.5rem' }} />
          Segments
        </Tab>
        <Tab 
          active={activeTab === 'stock'} 
          onClick={() => setActiveTab('stock')}
        >
          <FiTrendingUp style={{ marginRight: '0.5rem' }} />
          Stock
        </Tab>
      </TabContainer>

      {activeTab === 'performance' && renderPerformanceChart()}
      {activeTab === 'segments' && renderSegmentChart()}
      {activeTab === 'stock' && renderStockChart()}

      <MetricsGrid>
        {getMetrics().map((metric, index) => (
          <MetricCard key={index}>
            <MetricValue>{metric.value}</MetricValue>
            <MetricLabel>{metric.label}</MetricLabel>
            <MetricChange positive={metric.positive}>
              {metric.positive ? '↗ ' : '↘ '}{metric.change}
            </MetricChange>
          </MetricCard>
        ))}
      </MetricsGrid>
    </Container>
  );
}

export default ComprehensiveAnalytics;
