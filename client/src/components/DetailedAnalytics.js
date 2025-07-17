import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, RadialBarChart, RadialBar } from 'recharts';
import { FiX, FiTrendingUp, FiBarChart, FiPieChart, FiActivity, FiDollarSign, FiUsers, FiTarget, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 24px;
  max-width: 95vw;
  max-height: 95vh;
  width: 1200px;
  overflow-y: auto;
  box-shadow: 
    0 40px 80px rgba(0, 0, 0, 0.15),
    0 20px 40px rgba(0, 123, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(30px);
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from { 
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to { 
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
`;

const ModalHeader = styled.div`
  background: linear-gradient(135deg, #007BFF 0%, #0056B3 100%);
  color: white;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 0;
  }
  
  h2 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const MetricCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  }
`;

const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const MetricTitle = styled.h4`
  margin: 0;
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
`;

const MetricIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${props => props.gradient || 'linear-gradient(135deg, #007BFF 0%, #0056B3 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #007BFF;
  margin-bottom: 0.5rem;
  font-family: 'Inter', sans-serif;
`;

const MetricChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.positive ? '#10b981' : '#ef4444'};
`;

const ChartContainer = styled.div`
  height: 300px;
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  padding: 1rem;
`;

const SectionTitle = styled.h3`
  color: #007BFF;
  margin: 2rem 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DetailTable = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  margin-top: 1rem;
`;

const TableHeader = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 1rem 1.5rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  font-weight: 600;
  color: #374151;
  font-family: 'Inter', sans-serif;
  
  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
    font-size: 0.9rem;
  }
`;

const TableRow = styled.div`
  padding: 1rem 1.5rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 123, 255, 0.05);
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
    font-size: 0.9rem;
  }
`;

// Enhanced data
const detailedMetrics = [
  {
    title: 'Total Revenue',
    value: '₹83,300 Cr',
    change: '+15.2%',
    positive: true,
    icon: <FiDollarSign />,
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  },
  {
    title: 'Net Profit',
    value: '₹6,650 Cr',
    change: '+18.5%',
    positive: true,
    icon: <FiTrendingUp />,
    gradient: 'linear-gradient(135deg, #007BFF 0%, #0056B3 100%)'
  },
  {
    title: 'Customer Base',
    value: '8.2 Cr',
    change: '+12.3%',
    positive: true,
    icon: <FiUsers />,
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
  },
  {
    title: 'Market Share',
    value: '21.5%',
    change: '+2.1%',
    positive: true,
    icon: <FiTarget />,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  }
];

const quarterlyPerformance = [
  { quarter: 'Q1 FY24', revenue: 16200, profit: 1150, customers: 7.8, marketShare: 19.2 },
  { quarter: 'Q2 FY24', revenue: 17800, profit: 1280, customers: 7.9, marketShare: 19.8 },
  { quarter: 'Q3 FY24', revenue: 19200, profit: 1420, customers: 8.0, marketShare: 20.2 },
  { quarter: 'Q4 FY24', revenue: 20100, profit: 1580, customers: 8.1, marketShare: 20.8 },
  { quarter: 'Q1 FY25', revenue: 18500, profit: 1350, customers: 8.15, marketShare: 21.0 },
  { quarter: 'Q2 FY25', revenue: 19800, profit: 1520, customers: 8.2, marketShare: 21.5 }
];

const segmentBreakdown = [
  { segment: 'General Insurance', revenue: 37485, growth: 15.2, margin: 8.2, customers: 3.7 },
  { segment: 'Life Insurance', revenue: 29155, growth: 12.8, margin: 7.8, customers: 2.9 },
  { segment: 'Lending Business', revenue: 16660, growth: 18.5, margin: 6.5, customers: 1.6 }
];

function DetailedAnalytics({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <h2>Detailed Financial Analytics</h2>
          <CloseButton onClick={onClose}>
            <FiX />
          </CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <GridContainer>
            {detailedMetrics.map((metric, index) => (
              <MetricCard key={index}>
                <MetricHeader>
                  <MetricTitle>{metric.title}</MetricTitle>
                  <MetricIcon gradient={metric.gradient}>
                    {metric.icon}
                  </MetricIcon>
                </MetricHeader>
                <MetricValue>{metric.value}</MetricValue>
                <MetricChange positive={metric.positive}>
                  {metric.positive ? <FiArrowUp /> : <FiArrowDown />}
                  {metric.change}
                </MetricChange>
              </MetricCard>
            ))}
          </GridContainer>

          <SectionTitle>
            <FiBarChart />
            Quarterly Performance Trends
          </SectionTitle>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={quarterlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="quarter" tick={{ fontSize: 12 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `₹${value} Cr` : 
                    name === 'profit' ? `₹${value} Cr` : 
                    name === 'customers' ? `${value} Cr` : `${value}%`,
                    name === 'revenue' ? 'Revenue' : 
                    name === 'profit' ? 'Profit' : 
                    name === 'customers' ? 'Customers' : 'Market Share'
                  ]}
                  labelStyle={{ color: '#374151' }}
                />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#007BFF" fill="#007BFF" fillOpacity={0.3} />
                <Area type="monotone" dataKey="profit" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          <SectionTitle>
            <FiPieChart />
            Business Segment Breakdown
          </SectionTitle>
          <DetailTable>
            <TableHeader>
              <div>Segment</div>
              <div>Revenue (₹ Cr)</div>
              <div>Growth %</div>
              <div>Customers (Cr)</div>
            </TableHeader>
            {segmentBreakdown.map((segment, index) => (
              <TableRow key={index}>
                <div style={{ fontWeight: '600', color: '#374151' }}>{segment.segment}</div>
                <div style={{ color: '#007BFF', fontWeight: '600' }}>₹{segment.revenue.toLocaleString()}</div>
                <div style={{ color: segment.growth > 15 ? '#10b981' : '#f59e0b', fontWeight: '600' }}>
                  +{segment.growth}%
                </div>
                <div style={{ color: '#6b7280' }}>{segment.customers} Cr</div>
              </TableRow>
            ))}
          </DetailTable>

          <SectionTitle>
            <FiActivity />
            Key Performance Indicators
          </SectionTitle>
          <GridContainer>
            <MetricCard>
              <MetricHeader>
                <MetricTitle>Return on Equity (ROE)</MetricTitle>
                <MetricIcon gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)">
                  <FiTarget />
                </MetricIcon>
              </MetricHeader>
              <MetricValue>21.2%</MetricValue>
              <MetricChange positive={true}>
                <FiArrowUp />
                +2.1% YoY
              </MetricChange>
            </MetricCard>
            
            <MetricCard>
              <MetricHeader>
                <MetricTitle>Asset Quality (NPA)</MetricTitle>
                <MetricIcon gradient="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)">
                  <FiActivity />
                </MetricIcon>
              </MetricHeader>
              <MetricValue>2.1%</MetricValue>
              <MetricChange positive={true}>
                <FiArrowDown />
                -0.3% improvement
              </MetricChange>
            </MetricCard>
            
            <MetricCard>
              <MetricHeader>
                <MetricTitle>Cost-to-Income Ratio</MetricTitle>
                <MetricIcon gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)">
                  <FiBarChart />
                </MetricIcon>
              </MetricHeader>
              <MetricValue>45.2%</MetricValue>
              <MetricChange positive={true}>
                <FiArrowDown />
                -1.8% optimized
              </MetricChange>
            </MetricCard>
          </GridContainer>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
}

export default DetailedAnalytics;
