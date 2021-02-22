import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import CountUp from 'react-countup';
import styles from './CovidSummaryStats.module.css';

export const CovidSummaryStats = ({ stats }) => {


  return (

    <Grid container spacing={2} alignItems="center" justify="center">
      <Grid item xs={12} sm={4} md={3}>
        <Card className={styles.infected}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5" gutterBottom>
              <CountUp start={0} end={stats.infected} duration={3} separator=',' />
            </Typography>
            <Typography color="textSecondary" variant="subtitle2">
              {stats.lastUpdate.toDateString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <Card className={styles.recovered}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5" gutterBottom>
              <CountUp start={0} end={stats.recovered} duration={3} separator=',' />
            </Typography>
            <Typography color="textSecondary" variant="subtitle2">
              {stats.lastUpdate.toDateString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <Card className={styles.deaths}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5" gutterBottom>
              <CountUp start={0} end={stats.deaths} duration={3} separator=',' />
            </Typography>
            <Typography color="textSecondary" variant="subtitle2">
              {stats.lastUpdate.toDateString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
