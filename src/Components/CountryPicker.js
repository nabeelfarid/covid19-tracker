import { Box, FormControl, FormHelperText, MenuItem, Select } from '@material-ui/core';
import CovidApi from '../CovidApi';
import React, { useEffect, useState } from 'react';
import styles from './CountryPicker.module.css';

export const CountryPicker = ({ country, selectedCountryHandler }) => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    // axios.get('https://disease.sh/v3/covid-19/countries')
    //   .then((res) => {
    //     setCountries(res.data.map(obj => obj.country))
    //   })
    // CovidApi.GetCountries()
    // .then((res) => {
    //       setCountries(res)
    //     })
    const getCountries = async () => {
      let res = await CovidApi.GetCountries();
      setCountries(res);
    };

    getCountries();

  }, []);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" marginTop={2}>
      <FormControl className={styles.countryPicker}>
        <Select
          variant="outlined"
          value={country}
          displayEmpty
          onChange={(e) => { selectedCountryHandler(e.target.value); }}>

          <MenuItem key={''} value={''}><em>-- Global Stats --</em></MenuItem>
          {countries.map(country => <MenuItem key={country} value={country}>{country}</MenuItem>
          )}
        </Select>
        <FormHelperText>Select a country to see its stats</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default CountryPicker;