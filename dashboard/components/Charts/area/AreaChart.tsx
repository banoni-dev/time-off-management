import { useEffect, useState } from 'react';
import { AreaChart, Card, Title } from "@tremor/react";
import axios from 'axios';
import { basicUrl } from '@/utils/backend';
import { getUserIdFromToken } from '@/utils/user';

const valueFormatter = function (number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

const Area = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch chart data from backend API
    const token = localStorage.getItem('token') || '';
    const id = getUserIdFromToken(token);
    fetchChartDataFromBackend(id);
    console.log('chartData:', chartData);

  }, []);

  const fetchChartDataFromBackend = async (id) => {
    try {
      // Fetch data from backend API
      const response = await axios.get(`${basicUrl}user/stats/${id}`);
      setChartData(response.data.chartdata.reverse());
      console.log('response.data:', response.data.chartdata.revrese());
      return response.data;
    } catch (error) {
      console.error('Error fetching chart data:', error);
      return [];
    }

  };

  return (
    <Card>
      <Title>Newsletter revenue over time (USD)</Title>
      <AreaChart
        className="mt-4 h-72"
        data={chartData}
        index="date"
        categories={["All the Timeoffs", "Approved Timeoffs"]}
        colors={["indigo", "cyan"]}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
};

export default Area;