import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export const sendMessage = async (message) => {
  try {
    const response = await api.post('/chat', { message });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.error || 'Failed to send message');
  }
};

export const getStockStats = async (startDate, endDate) => {
  try {
    const response = await api.get('/stock-price/stats', {
      params: { startDate, endDate }
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.error || 'Failed to get stock stats');
  }
};

export const compareStockPeriods = async (period1Start, period1End, period2Start, period2End) => {
  try {
    const response = await api.get('/stock-price/compare', {
      params: { period1Start, period1End, period2Start, period2End }
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.error || 'Failed to compare stock periods');
  }
};

export default api;
