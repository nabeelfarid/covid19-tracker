import { Box, Grid } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './Charts.module.css';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

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

  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {

    let url = `https://disease.sh/v3/covid-19/historical/${stats.country ? stats.country : 'all'}?lastdays=365`;
    console.log('url', url);
    axios.get(url)
      .then((res) => {
        const resData = stats.country ? res.data.timeline : res.data;
        console.log('resData', resData);
        let data = Object.entries(resData.cases).map(
          ([key, value]) => {
            return {
              date: new Date(key),
              infected: Number(value),
              recovered: Number(resData.recovered[key]),
              deaths: Number(resData.deaths[key])
            };
          });
        console.log('daily data', data);

        setDailyData(data);
      });
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
          <Line
            data={{
              labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
              datasets: [{
                data: dailyData.map((data) => data.infected),
                label: 'Infected',
                borderColor: 'rgba(0, 0, 255, 0.5)',
                fill: false,
              }, {
                data: dailyData.map((data) => data.deaths),
                label: 'Deaths',
                borderColor: 'rgba(255, 0, 0, 0.5)',
                fill: false,
              }, {
                data: dailyData.map((data) => data.recovered),
                label: 'Recovered',
                borderColor: 'rgba(0, 255, 0, 0.5)',
                fill: false,
              },
              ],
            }}
            options={{
              title: {
                display: true,
                text: `Historical data over last year: ${stats.country ? stats.country : 'Worldwide'}`
              },
              legend: {
                display: false
              }
            }}></Line>
        </Grid>
      </Grid>
    </Box>
  );
};
