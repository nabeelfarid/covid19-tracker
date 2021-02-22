import { Box, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CountryPicker } from './Components/CountryPicker';
import { CovidSummaryStats } from './Components/CovidSummaryStats';
import { Charts } from './Components/Charts';
import { AppHeaderBar } from './Components/AppHeaderBar';
import CovidApi from './CovidApi';

const App = () => {

  const [stats, setStats] = useState({
    country: '',
    infected: 0,
    recovered: 0,
    deaths: 0,
    lastUpdate: new Date()
  })

  useEffect(() => {

    const getStats = async () => {
      const res = await CovidApi.GetStats(stats.country);
      setStats(res)
    }

    getStats();

  }, [stats.country])

  const selectedCountryHandler = (selectedCountry) => {
    setStats(currentStats => {
      return {
        ...currentStats,
        country: selectedCountry
      }
    })
  }

  return (
    <>
      <AppHeaderBar />
      <Box m={2}>
        <Grid container spacing={4} alignItems="center" justify="center">
          <Grid item xs={12}>
            <CountryPicker country={stats.country} selectedCountryHandler={selectedCountryHandler} />
          </Grid>
          <Grid item xs={12}>
            <CovidSummaryStats stats={stats} />
          </Grid>
          <Grid item xs={12}>
            <Charts stats={stats} />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default App


