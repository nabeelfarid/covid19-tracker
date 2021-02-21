import { Tooltip, AppBar, Box, Card, CardContent, FormControl, FormHelperText, Grid, IconButton, MenuItem, Select, Toolbar, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup'
import GitHubIcon from '@material-ui/icons/GitHub';
import SettingsIcon from '@material-ui/icons/Settings';
import styles from './App.module.css'
import { Bar, Doughnut, Line } from 'react-chartjs-2';

const CovidSummaryStats = ({ stats }) => {


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
    axios.get('https://disease.sh/v3/covid-19/countries')
      .then((res) => {
        setCountries(res.data.map(obj => obj.country))
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

const Charts = ({ stats }) => {

  const data = {
    datasets: [{
      data: [stats.infected, stats.recovered, stats.deaths],
      backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
      borderColor: ['rgba(0, 0, 255, 0.6)', 'rgba(0, 255, 0, 0.6)', 'rgba(255, 0, 0, 0.6)'],
      hoverBackgroundColor: ['rgba(0, 0, 255, 0.7)', 'rgba(0, 255, 0, 0.7)', 'rgba(255, 0, 0, 0.7)'],
      hoverBorderColor: ['rgba(0, 0, 255, 0.8)', 'rgba(0, 255, 0, 0.8)', 'rgba(255, 0, 0, 0.8)'],
    }],
    labels: ['Infected', 'Recovered', 'Deaths']
  }

  const options = {
    legend: {
      display: false
    }

  }

  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {

    let url = `https://disease.sh/v3/covid-19/historical/${stats.country ? stats.country : 'all'}?lastdays=365`
    console.log('url', url)
    axios.get(url)
      .then((res) => {
        const resData = stats.country ? res.data.timeline : res.data;
        console.log('resData', resData)
        let data = Object.entries(resData.cases).map(
          ([key, value]) => {
            return {
              date: new Date(key),
              infected: Number(value),
              recovered: Number(resData.recovered[key]),
              deaths: Number(resData.deaths[key])
            }
          })
        console.log('daily data', data)

        setDailyData(data)
      })
  }, [stats.country])


  return (
    <Box m={2}>
      <Grid container spacing={4} alignItems="center" justify="center">
        <Grid item md={1} ></Grid>
        <Grid item md={5}>
          <Bar data={data} options={options} />
        </Grid>
        <Grid item md={5}>
          <Doughnut data={data} options={options} />
        </Grid>
        <Grid item md={1}></Grid>
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
  )
}


const App = () => {

  const [country, setCountry] = useState('');

  const [stats, setStats] = useState({
    country: '',
    infected: 0,
    recovered: 0,
    deaths: 0,
    lastUpdate: new Date()
  })

  useEffect(() => {
    console.log('summary country:', country)
    axios.get(
      country ?
        `https://disease.sh/v3/covid-19/countries/${country}` :
        'https://disease.sh/v3/covid-19/all'
    )
      .then((res) => {
        console.log(res)
        setStats({
          country: res.data.country,
          infected: Number(res.data.cases),
          recovered: Number(res.data.recovered),
          deaths: Number(res.data.deaths),
          lastUpdate: new Date(res.data.updated)
        })
      })
  }, [country])

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
              <IconButton color="inherit" href="https://github.com/nabeelfarid/covid19-tracker" target="_blank" rel="noopener noreferrer">
                <GitHubIcon></GitHubIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Covid-19 API Source">
              <IconButton color="inherit" href="https://corona.lmao.ninja/" target="_blank" rel="noopener noreferrer">
                <SettingsIcon></SettingsIcon>
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>

      </AppBar>
      <Box m={2}>
        <Grid container spacing={4} alignItems="center" justify="center">
          <Grid item xs={12}>
            <CountryPicker country={country} selectedCountryHandler={selectedCountryHandler} />
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