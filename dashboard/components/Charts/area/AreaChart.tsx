import { useEffect, useState } from 'react';
import { AreaChart, Card, Title } from "@tremor/react";
import axios from 'axios';
import { basicUrl } from '@/utils/backend';
import { getUserIdFromToken } from '@/utils/user';

const valueFormatter = function (number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

const Area = ({role}) => {
  const [chartData, setChartData] = useState([]);
  const [chartData2, setChartData2] = useState([]);

  useEffect(() => {
    // Fetch chart data from backend API
    const token = localStorage.getItem('token') || '';
    const id = getUserIdFromToken(token);
    fetchChartDataFromBackend(id);
    fetchChartDataFromBackend2();
    console.log('chartData:', chartData);

  }, []);



  


  const fetchChartDataFromBackend2 = async () => {
    try {
      // Fetch data from backend API
      const res2 = await axios.get(`${basicUrl}user/all-stats`);
      const chartdataArray = Object.keys(res2.data.chartdata).map(key => ({
          date: key,
          "All the Timeoffs": res2.data.chartdata[key]["All the Timeoffs"],
          "Approved Timeoffs": res2.data.chartdata[key]["Approved Timeoffs"]
      }));
      console.log('chartdataArray:', chartdataArray);
      setChartData2(chartdataArray.reverse());
    } catch (error) {
      console.error('Error fetching chart data:', error);
      return [];
    }

  };



  const fetchChartDataFromBackend = async (id) => {
    try {
      // Fetch data from backend API
      if (role == "employee"){
      const response = await axios.get(`${basicUrl}user/stats/${id}`);
      setChartData(response.data.chartdata.reverse());
      console.log('response.data:', response.data.chartdata.revrese());
      return response.data;
      }
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
        data={role == "employee" ? chartData : chartData2 }
        index="date"
        categories={["All the Timeoffs", "Approved Timeoffs"]}
        colors={["indigo", "cyan"]}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
};

export default Area;