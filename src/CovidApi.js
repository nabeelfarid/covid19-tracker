import axios from 'axios';

const GetCountries = async () => {

    // Implementaion using JS Promises for handling async calls
    // return new Promise((resolve, reject) => {
    //     axios.get('https://disease.sh/v3/covid-19/countries')
    //         .then((res) => {
    //             let countries = res.data.map(obj => obj.country)
    //             console.log("api countries", countries);
    //             resolve(countries);
    //         })
    //         .catch(error=>{
    //             reject(error)
    //         })
    // })

    
    
    // Simpler Implementation using async await
    try {
        // original link 'https://disease.sh/v3/covid-19/countries
        // hoever the above link gets countries that doesn't have historical data
        // So using the other api link to only get the list of countries that has historical data available
        const res = await axios.get('https://disease.sh/v3/covid-19/historical?lastdays=1')
        let countries = res.data.map(obj => obj.country)
        //remove duplicate country names
        countries = [...new Set(countries)];
        return countries;
    } catch ({ error }) {
        return error
    }
}

const GetStats = async (country) => {

    const url = country ?
        `https://disease.sh/v3/covid-19/countries/${country}` :
        'https://disease.sh/v3/covid-19/all';
    try {
        let res = await axios.get(url)
        console.log("Stats", res)
        return {
            country: country,
            infected: Number(res.data.cases),
            recovered: Number(res.data.recovered),
            deaths: Number(res.data.deaths),
            lastUpdate: new Date(res.data.updated)
        };

    } catch (error) {
        return error
    }

}

const CovidApi = {
    GetCountries: GetCountries,
    GetStats: GetStats
};

export default CovidApi;