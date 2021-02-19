import { Tooltip, AppBar, Box, Card, CardContent, FormControl, FormHelperText, Grid, IconButton, MenuItem, Select, Toolbar, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup'
import GitHubIcon from '@material-ui/icons/GitHub';
import SettingsIcon from '@material-ui/icons/Settings';
import styles from './App.module.css'

const CovidSummaryStats = ({ country }) => {
  const [stats, setStats] = useState({
    infected: 0,
    recovered: 0,
    deaths: 0,
    lastUpdate: new Date()
  })

  useEffect(() => {
    // https://covid19.mathdro.id/api/countries
    console.log('summary country:', country)
    axios.get(
      country ?
        `https://covid19.mathdro.id/api/countries/${country}` :
        'https://covid19.mathdro.id/api/'
    )
      .then((res) => {
        // console.log(res)
        setStats({
          infected: Number(res.data.confirmed.value),
          recovered: Number(res.data.recovered.value),
          deaths: Number(res.data.deaths.value),
          lastUpdate: new Date(res.data.lastUpdate)
        })
      })
  }, [country])

  return (

    <Grid container spacing={2} justify="center">
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
      <Grid item item xs={12} sm={4} md={3}>
        <Card className={styles.recovered}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5" gutterBottom>
              <CountUp start={0} end={stats.recovered} duration={3} separator=',' />
            </Typography>
            <Typography color="textSecondary" variant="subtitle2" >
              {stats.lastUpdate.toDateString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item item xs={12} sm={4} md={3}>
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
}

const CountryPicker = ({ country, selectedCountryHandler }) => {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios.get('https://covid19.mathdro.id/api/countries')
      .then((res) => {
        setCountries(res.data.countries.map(country => country.name))
      })
  }, [])

  return (
    <Box display="flex" alignItems="center" justifyContent="center" padding={1}>
      <FormControl className={styles.countryPicker}>
        <Select
          variant="outlined"
          value={country}
          displayEmpty
          onChange={(e) => { selectedCountryHandler(e.target.value) }}>

          <MenuItem key={""} value={""}><em>-- Global Stats --</em></MenuItem>
          {
            countries.map(country =>
              <MenuItem key={country} value={country}>{country}</MenuItem>
            )
          }
        </Select>
        <FormHelperText>Select a country to see its stats</FormHelperText>
      </FormControl>
    </Box>
  )
}

const Charts = ({ country }) => {
  return (
    <></>
  )
}


const App = () => {

  const [country, setCountry] = useState('');

  const selectedCountryHandler = (selectedCountry) => {
    setCountry(selectedCountry)
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">COVID-19 Tracker</Typography>
          <div style={{ marginLeft: "auto" }}>
            <Tooltip title="Github Source">
              <IconButton color="inherit" href="https://covid19.mathdro.id/api/" target="_blank" rel="noopener noreferrer">
                <GitHubIcon></GitHubIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Covid-19 API Source">
              <IconButton color="inherit" href="https://covid19.mathdro.id/api/" target="_blank" rel="noopener noreferrer">
                <SettingsIcon></SettingsIcon>
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>

      </AppBar>
      <Box m={2}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12}></Grid>

          <Grid item xs={12}>
            <CovidSummaryStats country={country} />
          </Grid>
          <Grid item>
            <CountryPicker country={country} selectedCountryHandler={selectedCountryHandler} />
          </Grid>
          <Grid item>
            <Charts country={country} />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default App