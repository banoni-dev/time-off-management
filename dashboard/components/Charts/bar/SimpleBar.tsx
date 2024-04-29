import { useEffect, useState } from 'react';
import { BarChart, Card, Subtitle, Title } from "@tremor/react";
import axios from 'axios';
import { basicUrl } from '@/utils/backend';
import { getUserIdFromToken } from '@/utils/user';

const valueFormatter = (number) => `${number}`;

const SimpleBar = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    const id = getUserIdFromToken(token);
    fetchChartDataFromBackend(id);
  }, []);

  const fetchChartDataFromBackend = async (id) => {
    try {
      const response = await axios.get(`${basicUrl}user/stats/${id}`);
      setChartData(response.data.chartdata.reverse());
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setChartData([]);
    }
  };

  return (
    <Card>
      <Title>Number of species threatened with extinction</Title>
      <Subtitle>
        The IUCN Red List has assessed only a small share of the total known species in the world.
      </Subtitle>
      <BarChart
        className="mt-6"
        data={chartData}
        index="date"
        categories={["All the Timeoffs", "Approved Timeoffs"]}
        colors={["blue", "green"]}
        valueFormatter={valueFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
};

export default SimpleBar;