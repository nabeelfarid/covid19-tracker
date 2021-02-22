import { Box, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styles from './Charts.module.css';
import { Bar, Doughnut } from 'react-chartjs-2';
import CovidApi from '../CovidApi'
import { DailyStatsChart } from './DailyStatsChart';

export const Charts = ({ stats }) => {

  const data = {
    datasets: [{
      data: [stats.infected, stats.recovered, stats.deaths],
      backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
      borderColor: ['rgba(0, 0, 255, 0.6)', 'rgba(0, 255, 0, 0.6)', 'rgba(255, 0, 0, 0.6)'],
      hoverBackgroundColor: ['rgba(0, 0, 255, 0.7)', 'rgba(0, 255, 0, 0.7)', 'rgba(255, 0, 0, 0.7)'],
      hoverBorderColor: ['rgba(0, 0, 255, 0.8)', 'rgba(0, 255, 0, 0.8)', 'rgba(255, 0, 0, 0.8)'],
    }],
    labels: ['Infected', 'Recovered', 'Deaths']
  };

  const options = {
    legend: {
      display: false
    }
  };

  const [dailyStats, setDailyStats] = useState([]);

  useEffect(() => {

    const GetDailyStats = async () => {
      let res = await CovidApi.GetDailyStats(stats.country);
      setDailyStats(res);
    }
    GetDailyStats();


  }, [stats.country]);


  return (
    <Box my={2} className={styles.chartContainer}>
      <Grid container spacing={4} alignItems="center" justify="center">

        <Grid item xs={12} md={6}>
          <Bar data={data} options={options} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Doughnut data={data} options={options} />
        </Grid>

        <Grid item xs={12} md={10}>
          <DailyStatsChart stats={stats} dailyStats={dailyStats}/>
        </Grid>
      </Grid>
    </Box>
  );
};


